import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { memo } from 'react';
import { useGetMentorListQuery, useMentorAssignSaveOrUpdateMutation, } from "../../../services/courseApi";
import { MdRemoveCircleOutline } from "react-icons/md";
import { useState } from 'react';
import Select from "react-select";
import { FiPlusCircle } from "react-icons/fi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiSolidMinusCircle } from "react-icons/bi";
const CreateCourseMentor = ({ handleClose, paramValue, assData }) => {
    const [all, setAllRoutine] = useState([]);
    const [mentorAssignSaveOrUpdate, res] = useMentorAssignSaveOrUpdateMutation();
    const mentorRes = useGetMentorListQuery();
    const formik = useFormik({
        initialValues: {
            'course_id': paramValue,
            'mentor_id': '',
            'is_active': true
        },
        onSubmit: async (values, { resetForm }) => {
            let arr = [];
            all.map((item, index) => {
                arr.push({
                    "mentor_id": item.mentor_id?.id,
                    "course_id": item.course_id,
                    "is_active": item.is_active
                })
            })
            const mentor = JSON.stringify(arr);
            resetForm();
            if (values.course_id == 0) {
                toast.warn("Please Select course");
                return;
            }
            try {
                const result = await mentorAssignSaveOrUpdate({ mentorArr: mentor }).unwrap();
                toast.success(result.message);
            } catch (error) {
                toast.warn(error.data.message);
            }
        },
    });

    const handelAdd = () => {
        if (!formik.values.mentor_id) {
            toast.warn("Please Select Mentor");
            return;
        }

        if (all.find((item) => item.mentor_id?.id === formik.values.mentor_id?.id)) {
            toast.warn("Already Added");
            return;
        }

        if (assData.find((item) => item.mentor_id === formik.values.mentor_id?.id)) {
            toast.warn("This Mentor Already Assign For This Course");
            return;

        }

        setAllRoutine([...all, formik.values])
        formik.setFieldValue("mentor_id", "");
        formik.setFieldValue("is_active", true);
        formik.setFieldValue("course_id", paramValue);
        formik.setFieldValue("mentor_name", "");
        formik.setFieldValue("");

    }
    const handelDelete = (index) => {
        const newFaq = all.filter((item, i) => i !== index);
        setAllRoutine(newFaq);
    }

    if (res.isSuccess) {
        handleClose();
    }

    return (
        <div>
            <form
                className="form-sample"
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
            >
                <div className="row">
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Mentor <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <Select
                                isClearable
                                isSearchable={true}
                                isLoading={mentorRes.isLoading}
                                options={mentorRes.data?.data}
                                getOptionLabel={option => `${option.name}(${option.email})`}
                                getOptionValue={option => option.id}
                                onChange={(value) => {
                                    formik.setFieldValue("mentor_id", value);
                                }}
                                value={formik.values.mentor_id}
                                name="mentor_id"
                            />
                        </div>
                    </div>

                    <div className="form-group col-3 mt-1 text-center">
                        <label className="col-12 col-form-label">Is Active</label>
                        <div className="col-12 ">
                            <div className="form-check form-switch ms-4  mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"

                                    name="is_active"
                                    onChange={formik.handleChange}
                                    value={formik.values.is_active}
                                    checked={formik.values.is_active}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-3 my-1 text-center">
                        <label className="col-12 col-form-label">Action</label>
                        <div className="col-12 mt-1">
                            <span
                                type="button"
                                onClick={handelAdd}
                            >
                                 <BsFillPlusCircleFill size={20}
                                    color="green"
                                />
                            </span>

                        </div>
                    </div>

                    <div className="my-4">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Mentor</th>
                                    <th>Is Active</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {all?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.mentor_id?.name}</td>
                                        <td>{item.is_active ?
                                            <span className="badge text-bg-success">
                                                Active
                                            </span> :
                                            <span className="badge text-bg-danger">
                                                Inactive
                                            </span>

                                        }</td>
                                        <td>
                                            <span
                                                type="button"
                                                onClick={() => handelDelete(index)}
                                            >
                                                <BiSolidMinusCircle color="red" size={24} /> 
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>

                </div>
                <Modal.Footer>
                    <button type="button" className="btn btn-dark me-2 btn-sm" onClick={handleClose}>
                        Close
                    </button>

                    <button type="submit" className="btn btn-success btn-sm">
                        Submit
                    </button>

                </Modal.Footer>
            </form>
        </div>
    );
};

export default memo(CreateCourseMentor)
    ;
