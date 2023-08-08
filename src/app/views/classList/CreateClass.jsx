import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useMenuCreateOrUpdateMutation } from "../../../services/masterSettingsApi";
import PreviewImage from "../../components/PreviewImage";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { useClassCreateOrUpdateMutation } from "../../../services/contentApi";
const CreateClass = ({ handleClose }) => {
    const fileRef = useRef(null)
    const [previewImage, setPreviewImage] = useState();
    function handelImage(e) {
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
    const [classCreateOrUpdate, res] = useClassCreateOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            name: "",
            name_bn: "",
            price: "",
            icon: "",
            color_code: "",
            sequence: "",
            is_free: false,
            is_active: true,
        },

        onSubmit: async (values, { resetForm }) => {
            let formData = new FormData();
            formData.append("name", values.name);
            formData.append("name_bn", values.name_bn);
            formData.append("price", values.price);
            formData.append("icon", values.icon);
            formData.append("color_code", values.color_code);
            formData.append("sequence", values.sequence);
            formData.append("is_free", values.is_free? 1 : 0);
            formData.append("is_active", values.is_active? 1 : 0);

            resetForm();
            try {
                const result = await classCreateOrUpdate(formData).unwrap();
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
                        <label className="col-12 col-form-label">Bangla Name</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Bangla Name"
                                type="text"
                                className="form-control"
                                name="name_bn"
                                onChange={formik.handleChange}
                                value={formik.values.name_bn}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Price <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Price"
                                type="number"
                                className="form-control"
                                name="price"
                                onChange={formik.handleChange}
                                value={formik.values.price}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Color Code</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Color Code"
                                type="text"
                                className="form-control"
                                name="color_code"
                                onChange={formik.handleChange}
                                value={formik.values.color_code}
                            />
                        </div>
                    </div>
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Sequence <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Sequence"
                                type="number"
                                className="form-control"
                                name="sequence"
                                onChange={formik.handleChange}
                                value={formik.values.sequence}
                            />
                        </div>
                    </div>
                    <div className="form-group row col-6 my-2 ">
                        <label className="col-6 col-form-label">Is Free</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                
                                    name="is_free"
                                    onChange={formik.handleChange}
                                    value={formik.values.is_free}
                                    checked={formik.values.is_free}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row col-6 my-2 ">
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
                    <div className="form-group row col-12 my-1">
                        {/* <label className="col-12 col-form-label">icon</label> */}
                        <div className="col-12">
                            <input
                                ref={fileRef}
                                hidden
                                className="form-control"
                                name="icon"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("icon", e.currentTarget.files[0]);
                                    handelImage(e);
                                }}
                            />
                        </div>
                    </div>
                    <div className=" my-2 text-center">
                        <div >
                            {formik.values.icon ?
                                <PreviewImage previewImage={previewImage} /> : <BsFillCloudArrowUpFill size={40} />
                            }
                        </div>

                        <button
                            type="button"
                            className="btn btn-dark  btn-sm"
                            onClick={() => {
                                fileRef.current.click();
                            }}
                        >
                            Choose a Icon ...
                        </button>

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

export default CreateClass;
