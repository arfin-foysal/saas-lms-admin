import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { memo } from 'react';

import { useRoutineSaveOrUpdateMutation } from "../../../services/courseApi";

const UpdateCourseMentor = ({ handleClose, paramValue }) => {
    const [routineSaveOrUpdate, res] = useRoutineSaveOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            'id': paramValue.id,
            'day': paramValue.day,
            'course_id': paramValue.course_id,
            'class_title': paramValue.class_title,
            'is_note': paramValue.is_note
        },
        onSubmit: async (values, { resetForm }) => {

            resetForm();
            if (values.course_id == 0) {
                toast.warn("Please Select course");
                return;
            }
            try {
                const result = await routineSaveOrUpdate(values).unwrap();
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
                        <label className="col-12 col-form-label">Day <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Day"
                                type="text"
                                className="form-control"
                                name="day"
                                onChange={formik.handleChange}
                                value={formik.values.day}

                            />
                        </div>
                    </div>
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Class Title</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Title"
                                type="text"
                                className="form-control"
                                name="class_title"
                                value={formik.values.class_title}
                                onChange={formik.handleChange}

                            />
                        </div>
                    </div>
                    <div className="form-group row col-12 my-3">
                        <label className="col-6 col-form-label">Is Note</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Active"
                                    name="is_note"
                                    onChange={formik.handleChange}
                                    value={formik.values.is_note}
                                    checked={formik.values.is_note}
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

export default memo(UpdateCourseMentor)
    ;
