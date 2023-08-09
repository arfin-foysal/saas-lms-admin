import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { memo } from 'react';
import { useFaqSaveOrUpdateMutation } from "../../../services/courseApi";

const UpdateCourseFeature = ({ handleClose, paramValue }) => {
    const [faqSaveOrUpdate, res] = useFaqSaveOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            'id': paramValue.id,
            'title': paramValue.title,
            'course_id': paramValue.course_id,
            'title_bn': paramValue.title_bn,
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
                        <label className="col-12 col-form-label">Bangla Title</label>
                        <div className="col-12">
                            <textarea
                                placeholder="Enter bangla title"
                                type="text"
                                className="form-control"
                                name="title_bn"
                                value={formik.values.title_bn}
                                onChange={formik.handleChange}
                            />
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
export default memo(UpdateCourseFeature) ;
