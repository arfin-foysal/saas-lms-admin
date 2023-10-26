import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useWebsitePageSaveOrUpdateMutation } from "../../../services/masterSettingsApi";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
const UpdateWebsitePage = ({ handleClose,paramValue }) => {
    const editor = useRef(null);
    const [websitePageSaveOrUpdate, res] = useWebsitePageSaveOrUpdateMutation();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            page_title: paramValue?.page_title,
            page_details: paramValue?.page_details,
            organization_id: paramValue?.organization_id,
            page_banner: paramValue?.page_banner,
        },
        onSubmit: async (values, { resetForm }) => {
            let formData = new FormData();
            formData.append("id", paramValue?.id);
            formData.append("page_title", values?.page_title);
            formData.append("page_details", values?.page_details);
            formData.append("organization_id", values?.organization_id);
            formData.append("page_banner", values?.page_banner);
            resetForm();
            try {
                const result = await websitePageSaveOrUpdate(formData).unwrap();
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
                                placeholder="Enter Title"
                                type="text"
                                className="form-control"
                                name="page_title"
                                onChange={formik.handleChange}
                                value={formik.values.page_title}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group  col-12 my-1">
                        <label className="col-12 col-form-label">Banner</label>
                        <div className="col-12">
                            <input
                                className="form-control"
                                name="page_banner"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("page_banner", e.currentTarget.files[0]);
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group  col-12 my-1">
                        <label className="col-12 col-form-label">Page Details</label>
                        <JoditEditor
                            ref={editor}
                            value={formik.values.page_details}
                            tabIndex={1} 
                            onChange={(newContent) => {
                                formik.setFieldValue("page_details", newContent);
                            }}
                        />
                    </div>

                </div>
                <Modal.Footer>

                    <button className="btn btn-dark me-2 btn-sm" onClick={handleClose}>
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

export default UpdateWebsitePage;
