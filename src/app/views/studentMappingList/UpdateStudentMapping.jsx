import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { memo } from 'react';
import {  useStudentMappingSaveOrUpdateMutation } from "../../../services/courseApi";

const UpdateStudentMapping = ({ handleClose, paramValue }) => {
    const [studentMappingSaveOrUpdate, res] = useStudentMappingSaveOrUpdateMutation();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            'id': paramValue.id,
            'course_id': paramValue.course_id,
            'mentor_id': paramValue.mentor_id,
            'is_active': paramValue.is_active,
            'mentor_name': paramValue.mentor_name,
            'course_title': paramValue.course_title,
            'student_id': paramValue.student_id,
            'student_name': paramValue.student_name,

        },
        onSubmit: async (values, { resetForm }) => {
            resetForm();
            try {
                const result = await studentMappingSaveOrUpdate({
                    id: values.id,
                    is_active: values.is_active?1:0,
                }).unwrap();
                toast.success(result.message);
            } catch (error) {
                toast.warn(error.data.message);
            }
        },
    });

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
                        <label className="col-12 col-form-label">Course</label>
                        <div className="col-12">
                            <input
                                disabled
                                placeholder="Enter Course"
                                type="text"
                                className="form-control"
                                name="course_title"
                                onChange={formik.handleChange}
                                value={formik.values.course_title}
                            />
                        </div>
                        <small>
                            <span className="text-danger">
                                Note </span>
                            : Course is not editable !
                        </small>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Mentor</label>
                        <div className="col-12">
                            <input
                                disabled
                                placeholder="Enter Mentor Name"
                                type="text"
                                className="form-control"
                                name="mentor_name"
                                onChange={formik.handleChange}
                                value={formik.values.mentor_name}
                            />
                        </div>
                        <small>
                            <span className="text-danger">
                                Note </span>
                            : Mentor is not editable !

                        </small>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Student</label>
                        <div className="col-12">
                            <input
                                disabled
                                placeholder="Enter Student"
                                type="text"
                                className="form-control"
                                name="student_name"
                                onChange={formik.handleChange}
                                value={formik.values.student_name}
                            />
                        </div>
                        <small>
                            <span className="text-danger">
                                Note </span>
                            : Student is not editable !

                        </small>
                    </div>

                    <div className="form-group row col-12 my-2 ">
                        <label className="col-6 col-form-label">Is Active</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
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

export default memo(UpdateStudentMapping);
