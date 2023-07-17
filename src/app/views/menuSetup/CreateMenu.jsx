import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useMenuCreateOrUpdateMutation } from "../../../services/masterSettingsApi";
const CreateMenu = ({ handleClose }) => {
    const [menuCreateOrUpdate, res] = useMenuCreateOrUpdateMutation();



    const formik = useFormik({
        initialValues: {
            name: "",
            link: "",
            is_authentication_needed: false,
            has_submenu: true,
            is_course: false,
            is_content: false,
            icon: "",
            is_active: "",

        },

        onSubmit: async (values, { resetForm }) => {
            resetForm();

            try {
                console.log(values);
                const result = await menuCreateOrUpdate(values).unwrap();
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

                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Link</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Link"
                                type="text"
                                className="form-control"
                                name="link"
                                onChange={formik.handleChange}
                                value={formik.values.link}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Icon</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Icon"
                                type="text"
                                className="form-control"
                                name="icon"
                                onChange={formik.handleChange}
                                value={formik.values.icon}

                            />
                        </div>
                    </div>


                    <div className="form-group row col-12 my-2">
                        <label className="col-6 col-form-label">Is Authentication Needed</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Yes"
                                    name="is_authentication_needed"
                                    onChange={formik.handleChange}
                                    value={formik.values.is_authentication_needed}
                                    checked={formik.values.is_authentication_needed}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group row col-12 my-2 ">
                        <label className="col-6 col-form-label">Has submenu</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Yes"
                                    name="has_submenu"
                                    onChange={formik.handleChange}
                                    value={formik.values.has_submenu}
                                    checked={formik.values.has_submenu}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row col-12 my-2 ">
                        <label className="col-6 col-form-label">Is Course</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Active"
                                    name="is_course"
                                    onChange={formik.handleChange}
                                    value={formik.values.is_course}
                                    checked={formik.values.is_course}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row col-12 my-2 ">
                        <label className="col-6 col-form-label">Is Content</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Active"
                                    name="is_content"
                                    onChange={formik.handleChange}
                                    value={formik.values.is_content}
                                    checked={formik.values.is_content}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row col-12 my-2 ">
                        <label className="col-6 col-form-label">Is Active</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Active"
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

export default CreateMenu;
