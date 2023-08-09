import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { memo } from 'react';
import { useMentorAssignSaveOrUpdateMutation } from "../../../services/courseApi";

const UpdateStudentMapping = ({ handleClose, paramValue }) => {
    const [mentorAssignSaveOrUpdate, res] = useMentorAssignSaveOrUpdateMutation();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            'id': paramValue.id,
            'course_id': paramValue.course_id,
            'mentor_id': paramValue.mentor_id,
            'is_active': paramValue.is_active,
            'mentor_name': paramValue.mentor_name,

        },
        onSubmit: async (values, { resetForm }) => {
            resetForm();
            try {
                const result = await mentorAssignSaveOrUpdate({
                    id: values.id,
                    course_id: values.course_id,
                    mentor_id: values.mentor_id,
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
                    <div className="form-group col-12 my-1">
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

export default memo(UpdateStudentMapping)
    ;
