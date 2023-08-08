import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { memo } from 'react';

import { useFaqSaveOrUpdateMutation } from "../../../services/courseApi";

const UpdateCourseFaq = ({ handleClose, paramValue }) => {
    const [faqSaveOrUpdate, res] = useFaqSaveOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            'id': paramValue.id,
            'title': paramValue.title,
            'course_id': paramValue.course_id,
            'answer': paramValue.answer,
            'is_active': paramValue.is_active
        },
        onSubmit: async (values, { resetForm }) => {

            resetForm();
            if (values.course_id == 0) {
                toast.warn("Please Select Content");
                return;
            }
            try {
                const result = await faqSaveOrUpdate(values).unwrap();
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
                        <label className="col-12 col-form-label">Title <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter title"
                                type="text"
                                className="form-control"
                                name="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}

                            />
                        </div>
                    </div>
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Answer</label>
                        <div className="col-12">
                            <textarea
                                placeholder="Enter answer"
                                type="text"
                                className="form-control"
                                name="answer"
                                value={formik.values.answer}
                                onChange={formik.handleChange}

                            />
                        </div>
                    </div>
                    <div className="form-group row col-12 my-3">
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

export default memo(UpdateCourseFaq)
    ;
