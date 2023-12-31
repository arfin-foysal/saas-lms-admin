import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { useOrganizationCreateOrUpdateMutation } from "../../../services/masterSettingsApi";
import PreviewImage from "../../components/PreviewImage";
const CreateOrganization = ({ handleClose }) => {
    const [organizationCreateOrUpdate, res] = useOrganizationCreateOrUpdateMutation();
    const fileRef = useRef(null)
    const [previewImage, setPreviewImage] = useState();
    function handelImage(e) {
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            slug: "",
            details: "",
            address: "",
            email: "",
            contact_no: "",
            contact_person: "",
            hotline_number: "",
            banner: null,
            logo: null,
            is_active: true,
        },
        onSubmit: async (values, { resetForm }) => {
            let formData = new FormData();
            formData.append("name", values.name);
            formData.append("slug", values.slug);
            formData.append("details", values.details);
            formData.append("address", values.address);
            formData.append("email", values.email);
            formData.append("contact_no", values.contact_no);
            formData.append("contact_person", values.contact_person);
            formData.append("hotline_number", values.hotline_number);
            formData.append("banner", values.banner);
            formData.append("logo", values.logo);
            formData.append("is_active", values.is_active ? 1 : 0);
            resetForm();
            try {
                const result = await organizationCreateOrUpdate(formData).unwrap();
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
                        <label className="col-12 col-form-label">Name <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Name"
                                type="text"
                                className="form-control"
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <div className="col-12">
                            <label className="col-12 col-form-label">Slug</label>
                            <input
                                placeholder="Enter Slug"
                                type="text"
                                className="form-control"
                                name="slug"
                                onChange={formik.handleChange}
                                value={formik.values.slug}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <div className="col-12">
                            <label className="col-12 col-form-label">Email</label>
                            <input
                                placeholder="Enter Email"
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Contact Person</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Contact Person"
                                type="text"
                                className="form-control"
                                name="contact_person"
                                onChange={formik.handleChange}
                                value={formik.values.contact_person}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <div className="col-12">
                            <label className="col-12 col-form-label">Contact No:</label>
                            <input
                                placeholder="Enter Contact No"
                                type="text"
                                className="form-control"
                                name="contact_no"
                                onChange={formik.handleChange}
                                value={formik.values.contact_no}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <div className="col-12">
                            <label className="col-12 col-form-label">Hotline No:</label>
                            <input
                                placeholder="Enter hotline No"
                                type="text"
                                className="form-control"
                                name="hotline_number"
                                onChange={formik.handleChange}
                                value={formik.values.hotline_number}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Details</label>
                        <div className="col-12">

                            <textarea
                                placeholder="Enter Details"
                                type="text"
                                className="form-control"
                                name="details"
                                onChange={formik.handleChange}
                                value={formik.values.details}

                            />
                        </div>
                    </div>
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Address</label>
                        <div className="col-12">
                            <textarea
                                placeholder="Enter Address"
                                type="text"
                                className="form-control"
                                name="address"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                            />
                        </div>
                    </div>


                    <div className="form-group  col-6 my-1">
                        <label className="col-12 col-form-label">Logo</label>
                        <div className="col-12">
                            <input
                                className="form-control"
                                name="logo"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("logo", e.currentTarget.files[0]);
                                    handelImage(e);
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group  col-6 my-1">
                        <label className="col-12 col-form-label">Banner</label>
                        <div className="col-12">
                            <input

                                className="form-control"
                                name="banner"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("banner", e.currentTarget.files[0]);
                                    handelImage(e);
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group row col-6  my-3  ">
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

export default CreateOrganization;
