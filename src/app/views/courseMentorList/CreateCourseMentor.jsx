import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { memo } from 'react';
import { useGetMentorListQuery, useMentorAssignSaveOrUpdateMutation, } from "../../../services/courseApi";
import { MdRemoveCircleOutline } from "react-icons/md";
import { useState } from 'react';
import Select from "react-select";
const CreateCourseMentor = ({ handleClose, paramValue,assData }) => {
    const [allRoutine, setAllRoutine] = useState([]);
    const [mentorAssignSaveOrUpdate, res] = useMentorAssignSaveOrUpdateMutation();
    const mentorRes=useGetMentorListQuery();
    const formik = useFormik({
        initialValues: {
            'course_id': paramValue,
            'mentor_id': '',
            'is_active': true
        },
        onSubmit: async (values, { resetForm }) => {
            let arr=[];
            allRoutine.map((item, index) => {
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
                const result = await mentorAssignSaveOrUpdate({mentorArr:mentor}).unwrap();
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

        if (allRoutine.find((item) => item.mentor_id?.id === formik.values.mentor_id?.id)) {
            toast.warn("Already Added");
            return;
        }

        if (assData.find((item) => item.mentor_id === formik.values.mentor_id?.id)) {
            toast.warn("This Mentor Already Assign For This Course");
            return;

        }

        setAllRoutine([...allRoutine, formik.values])
        formik.setFieldValue("mentor_id", "");
        formik.setFieldValue("is_active", true);
        formik.setFieldValue("course_id", paramValue);
        formik.setFieldValue("mentor_name", "");
        formik.setFieldValue("");

    }
    const handelDelete = (index) => {
        const newFaq = allRoutine.filter((item, i) => i !== index);
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
                                isSearchable={true}
                          isLoading={mentorRes.isLoading}
                                options={mentorRes.data?.data?.map((item) => ({
                                    value: item,
                                    label: `${item.name} (${item.email})`,
                                }))}
                                onChange={(value) => {
                                    formik.setFieldValue("mentor_id", value.value);
                                }}
                                value={mentorRes.data?.data?.find(
                                    (option) => option.value === formik.values.mentor_id
                                )}
                                name="mentor_id"
                            />
                        </div>
                    </div>
            
                    <div className="form-group col-3 mt-1 text-center">
                        <label className="col-12 col-form-label">Is Active</label>
                        <div className="col-12 ">
                            <div className="form-check form-switch ps-3  mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Active"
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
                            <button
                                type="button"
                                className="btn btn-success btn-sm"
                                onClick={handelAdd}
                            >
                                Add
                            </button>

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
                                {allRoutine?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
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
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handelDelete(index)}
                                            >
                                               <MdRemoveCircleOutline/> Remove
                                            </button>
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
