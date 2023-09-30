import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { memo } from 'react';
import { useContentSubjectAssignSaveOrUpdateMutation } from "../../../services/contentApi";

const UpdateContentSubjectAssign = ({ handleClose, paramValue }) => {
    const [contentSubjectAssignSaveOrUpdate, res] = useContentSubjectAssignSaveOrUpdateMutation();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            'id': paramValue.id,
            'content_id': paramValue.content_id,
            'class_level_id': paramValue.class_level_id,
            'subject_id': paramValue.subject_id,
            'is_active': paramValue.is_active,
            'content_name': paramValue.content_name,
            'class_name': paramValue.class_name,
            'subject_name': paramValue.subject_name,
        },
        onSubmit: async (values, { resetForm }) => {
            resetForm();
            try {
                const result = await contentSubjectAssignSaveOrUpdate({
                    id: values.id,
                    content_id: values.content_id,
                    class_level_id: values.class_level_id,
                    subject_id: values.subject_id,
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
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">
                            Class Name
                        </label>
                        <div className="col-12">
                            <input
                                disabled
                                placeholder="Enter Class Name"
                                type="text"
                                className="form-control"
                                name="class_name"
                                onChange={formik.handleChange}
                                value={formik.values.class_name}
                            />
                        </div>
                        <small>
                            <span className="text-danger">
                                Note </span>
                            : Class is not editable !
                        </small>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">
                            Subject Name
                        </label>
                        <div className="col-12">
                            <input
                                disabled
                                placeholder="Enter Subject Name"
                                type="text"
                                className="form-control"
                                name="subject_name"
                                onChange={formik.handleChange}
                                value={formik.values.subject_name}
                            />
                        </div>
                        <small>
                            <span className="text-danger">
                                Note </span>
                            : Subject is not editable !


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

export default memo(UpdateContentSubjectAssign)
    ;
