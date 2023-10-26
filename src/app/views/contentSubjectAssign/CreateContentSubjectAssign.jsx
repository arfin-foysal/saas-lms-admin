import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { memo } from 'react';
import { useGetMentorListQuery, useMentorAssignSaveOrUpdateMutation, } from "../../../services/courseApi";
import { useState } from 'react';
import Select from "react-select";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiSolidMinusCircle } from "react-icons/bi";
import { useContentSubjectAssignSaveOrUpdateMutation, useGetClassListQuery, useGetSubjectListByClassIdQuery } from "../../../services/contentApi";

const CreateContentSubjectAssign = ({ handleClose, paramValue, assData }) => {
    const [subject, setSubject] = useState([]);
    const [contentSubjectAssignSaveOrUpdate, res] = useContentSubjectAssignSaveOrUpdateMutation();
    const mentorRes = useGetMentorListQuery();

    const formik = useFormik({
        initialValues: {
            'content_id': paramValue,
            'class_level_id': '',
            'subject_id': '',
            'is_active': true
        },
        onSubmit: async (values, { resetForm }) => {
            let arr = [];
            subject.map((item, index) => {
                arr.push({
                    class_level_id: item.class_level_id?.id,
                    subject_id: item.subject_id?.id,
                    is_active: item.is_active,
                })
            })

            const data = {
                content_id: paramValue,
                subjectArr: arr
            }
            // const mentor = JSON.stringify(arr);
            resetForm();

            if (arr.length === 0) {
                toast.warn("Please Add Subject");
                return;
            }
     
            try {
                const result = await contentSubjectAssignSaveOrUpdate(data).unwrap();
                toast.success(result.message);
            } catch (error) {
                toast.warn(error.data.message);
            }
        },
    });
    const classRes = useGetClassListQuery();
    const subjectRes = useGetSubjectListByClassIdQuery(
        formik.values.class_level_id?.id
    );

    const handleChangeValue = (value) => {
        formik.setFieldValue("class_level_id", value);
        formik.setFieldValue("subject_id", "");

    };

    const handelAdd = () => {
        if (!formik.values.subject_id) {
            toast.warn("Please Select Subject");
            return;
        }

        // same class and subject Check
        if (subject.find((item) => item.subject_id?.id === formik.values.subject_id?.id && item.class_level_id?.id === formik.values.class_level_id?.id)) {
            toast.warn("Already Added");
            return;
        }

        if (assData.find((item) => item.subject_id === formik.values.subject_id?.id && item.class_level_id === formik.values.class_level_id?.id)) {
            toast.warn("This Mentor Already Assign For This Course");
            return;
        }


        setSubject([...subject, formik.values])
        formik.setFieldValue("subject_id", "");
        formik.setFieldValue("is_active", true);
        formik.setFieldValue("class_level_id", "");
        formik.setFieldValue("content_id", "");


    }
    const handelDelete = (index) => {
        const newSub = subject.filter((item, i) => i !== index);
        setSubject(newSub);
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
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Class <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <Select
                                isClearable
                                isSearchable={true}
                                isLoading={mentorRes.isLoading}
                                options={classRes.data?.data}
                                getOptionLabel={option => `${option.name}`}
                                getOptionValue={option => option.id}
                                onChange={(value) => {
                                    formik.setFieldValue("class_level_id", value);
                                    handleChangeValue(value);
                                }}
                                value={formik.values.class_level_id}
                                name="class_level_id"
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Subject <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <Select
                                isClearable
                                isSearchable={true}
                                isLoading={mentorRes.isLoading}
                                options={subjectRes?.data?.data}
                                getOptionLabel={option => `${option.name}`}
                                getOptionValue={option => option.id}
                                onChange={(value) => {
                                    formik.setFieldValue("subject_id", value);
                                }}
                                value={formik.values.subject_id}
                                name="subject_id"
                            />
                        </div>
                    </div>

                    <div className="form-group col-2 mt-1 text-center">
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

                    <div className="form-group col-2 my-1 text-center">
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
                                    <th>Class</th>
                                    <th>Subject</th>
                                    <th>Is Active</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subject?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.
                                            class_level_id?.name}</td>
                                        <td>{item?.subject_id?.name}</td>

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

export default memo(CreateContentSubjectAssign)
    ;
