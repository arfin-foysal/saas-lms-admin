import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { memo } from 'react';
import { useGetCourseListForMappingQuery, useGetMentorByCourseIdQuery, useGetMentorListQuery, useGetStudentListQuery, useGetStudentParticipantListByCourseIdQuery, useMentorAssignSaveOrUpdateMutation, useStudentMappingSaveOrUpdateMutation, } from "../../../services/courseApi";
import { MdRemoveCircleOutline } from "react-icons/md";
import { useState } from 'react';
import Select from "react-select";
import { FiPlusCircle } from "react-icons/fi";
import { all } from "axios";
const CreateStudentMapping = ({ handleClose, paramValue, assData }) => {
    const [allMapping, setAllMapping] = useState([]);
    const [studentMappingSaveOrUpdate, res] = useStudentMappingSaveOrUpdateMutation();
    const courseRes = useGetCourseListForMappingQuery();
    const formik = useFormik({
        initialValues: {
            'course_id': '',
            'mentor_id': '',
            'student_id': '',
            'is_active': true
        },
        onSubmit: async (values, { resetForm }) => {
            let arr = [];
            allMapping.map((item, index) => {
                arr.push({
                    "mentor_id": item.mentor_id?.id,
                    "course_id": item.course_id?.id,
                    "student_id": item.student_id?.id,
                    "is_active": item.is_active
                })
            })
            const mappingArr = JSON.stringify(arr);
            resetForm();
            if (values.course_id == 0) {
                toast.warn("Please Select course");
                return;
            }
            try {
                const result = await studentMappingSaveOrUpdate({ mapping: mappingArr }).unwrap();
                toast.success(result.message);
            } catch (error) {
                toast.warn(error.data.message);
            }
        },
    });
    const mentorRes = useGetMentorByCourseIdQuery(
        formik.values.course_id?.id ? formik.values.course_id?.id : 0
    );
    const studentRes = useGetStudentParticipantListByCourseIdQuery(
        formik.values.course_id?.id ? formik.values.course_id?.id : 0
    );

    const handelAdd = () => {
        if (!formik.values.course_id ||
            !formik.values.mentor_id ||
            !formik.values.student_id) {
            toast.warn("Please Select Course, Mentor and Student");
            return;
        }

        if (allMapping.length > 0) {
            const isExist = allMapping.find((item) =>
                item.student_id?.id === formik.values.student_id?.id &&
                item.mentor_id?.id === formik.values.mentor_id?.id &&
                item.course_id?.id === formik.values.course_id?.id)
            if (isExist) {
                toast.warn("This mapping already selected");
                return;
            }
        }

        if (assData.length > 0) {
            const isExist = assData.find((item) =>
                item.student_id === formik.values.student_id?.id &&
                item.mentor_id === formik.values.mentor_id?.id &&
                item.course_id === formik.values.course_id?.id)
            if (isExist) {
                toast.warn("This mapping already exist in this course");
                return;
            }
        }

        //same course and same student and not same mentor
        if (allMapping.length > 0) {
            const isExist = allMapping.find((item) =>   
                item.student_id?.id === formik.values.student_id?.id &&
                item.course_id?.id === formik.values.course_id?.id &&
                item.mentor_id?.id !== formik.values.mentor_id?.id)
            if (isExist) {
                toast.warn("This mapping already selected");
                return;
            }
        }

        if (assData.length > 0) {
            const isExist = assData.find((item) =>
                item.student_id === formik.values.student_id?.id &&
                item.course_id === formik.values.course_id?.id &&
                item.mentor_id !== formik.values.mentor_id?.id)
            if (isExist) {
                toast.warn("This mapping already exist in this course");
                return;
            }
        }
        
        setAllMapping([...allMapping, formik.values])
    }
    const handelDelete = (index) => {
        const newFaq = allMapping.filter((item, i) => i !== index);
        setAllMapping(newFaq);
    }

    const handleChangeValue = () => {
        formik.setFieldValue("mentor_id", "");
        formik.setFieldValue("student_id", "");
    };

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
                    <div className="form-group col-3 my-1">
                        <label className="col-12 col-form-label">Course <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <Select
                                isSearchable={true}
                                isClearable
                                isLoading={courseRes.isLoading}
                                options={courseRes.data?.data}
                                getOptionLabel={option => option.title}
                                getOptionValue={option => option.id}
                                onChange={(e) => {
                                    formik.setFieldValue("course_id", e);
                                    handleChangeValue(e);
                                }}
                                value={formik.values.course_id}
                                name="course_id"
                            />
                        </div>
                    </div>

                    <div className="form-group col-3 my-1">
                        <label className="col-12 col-form-label">Mentor <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <Select
                                isClearable
                                isSearchable={true}
                                isLoading={mentorRes.isLoading}
                                options={mentorRes.data?.data}
                                getOptionLabel={option => `${option.mentor_name}(${option.mentor_email})`}
                                getOptionValue={option => option.id}
                                onChange={(value) => {
                                    formik.setFieldValue("mentor_id", value);
                                }}
                                value={formik.values.mentor_id}
                                name="mentor_id"

                            />
                        </div>
                    </div>
                    <div className="form-group col-3 my-1">
                        <label className="col-12 col-form-label">Student <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <Select
                                isSearchable={true}
                                isClearable
                                isLoading={studentRes.isLoading}
                                options={studentRes.data?.data}
                                getOptionLabel={option => `${option.name}( ${option.email}))`}
                                getOptionValue={option => option.id}
                                onChange={(value) => {
                                    formik.setFieldValue("student_id", value);
                                }}
                                value={formik.values.student_id}
                                name="student_id"
                            />
                        </div>
                    </div>

                    <div className="form-group col-1 mt-1 text-center">
                        <label className="col-12 col-form-label ms-3">Is Active</label>
                        <div className="col-12 ">
                            <div className="form-check form-switch me-1  mt-2">
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
                            <button
                                type="button"
                                className="btn btn-success btn-sm"
                                onClick={handelAdd}
                            >
                                <FiPlusCircle size={16} /> Add
                            </button>

                        </div>
                    </div>

                    <div className="my-4">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Course</th>
                                    <th>Mentor</th>
                                    <th>Student</th>
                                    <th>Is Active</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allMapping?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.course_id?.title}</td>
                                        <td>{item?.mentor_id?.mentor_name}</td>
                                        <td>{item?.student_id?.name}</td>
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
                                                <MdRemoveCircleOutline /> Remove
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

export default memo(CreateStudentMapping)
    ;
