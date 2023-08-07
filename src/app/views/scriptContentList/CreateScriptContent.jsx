import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import PreviewImage from "../../components/PreviewImage";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { useGetChapterListBySubjectIdQuery, useGetClassListQuery, useGetSubjectListByClassIdQuery, useScriptCreateOrUpdateMutation, } from "../../../services/contentApi";
const CreateScriptContent = ({ handleClose }) => {
    const classRes = useGetClassListQuery()
    const fileRef = useRef(null)
    const [previewImage, setPreviewImage] = useState();
    function handelImage(e) {
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
    const [scriptCreateOrUpdate, res] = useScriptCreateOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            title: "",
            title_bn: "",
            description: "",
            script_code: "",
            class_level_id: "",
            subject_id: "",
            chapter_id: "",
            raw_url: "",
            s3_url: "",
            thumbnail: "",
            price: "",
            rating: "",
            is_free: false,
            sequence: "",
            is_active: true
        },
        onSubmit: async (values, { resetForm }) => {
            let formData = new FormData();
            formData.append("title", values.title);
            formData.append("title_bn", values.title_bn);
            formData.append("description", values.description);
            formData.append("script_code", values.script_code);
            formData.append("s3_url", values.s3_url);
            formData.append("class_level_id", values.class_level_id);
            formData.append("subject_id", values.subject_id);
            formData.append("chapter_id", values.chapter_id);
            formData.append("raw_url", values.raw_url);
            formData.append("thumbnail", values.thumbnail);
            formData.append("price", values.price);
            formData.append("rating", values.rating);
            formData.append("sequence", values.sequence);
            formData.append("is_free", values.is_free ? 1 : 0);
            formData.append("is_active", values.is_active ? 1 : 0);
            resetForm();
            try {
                const result = await scriptCreateOrUpdate(formData).unwrap();
                toast.success(result.message);
            } catch (error) {
                toast.warn(error.data.message);
            }
        },
    });
    const subjectRes = useGetSubjectListByClassIdQuery(formik.values.class_level_id)
    const chapterRes = useGetChapterListBySubjectIdQuery(formik.values.subject_id)

    const handelFocus = (name) => {
        if (name === "class_level_id") {
            formik.setFieldValue("subject_id", "");
            formik.setFieldValue("chapter_id", "");
        }
    }

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
                        <label className="col-12 col-form-label">Title <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Name"
                                type="text"
                                className="form-control"
                                name="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Bangla Title</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Title Bangla"
                                type="text"
                                className="form-control"
                                name="title_bn"
                                onChange={formik.handleChange}
                                value={formik.values.title_bn}
                          
                            />
                        </div>
                    </div>
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Description</label>
                        <div className="col-12">
                            <textarea
                                placeholder="Enter Description"
                                type="text"
                                className="form-control"
                                name="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Class <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <select
                                className="form-control form-select"
                                name="class_level_id"
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    handelFocus(e.target.name, e.target.value);
                                }}
                                value={formik.values.class_level_id}
                                required
                            >
                                <option value="" disabled selected hidden> --Select-- </option>
                                {classRes?.data?.data?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Subject  <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <select
                                className="form-control form-select"
                                name="subject_id"
                                onChange={formik.handleChange}
                                value={formik.values.subject_id}
                                required
                            >
                                <option value="" disabled selected hidden> --Select-- </option>
                                {subjectRes?.data?.data?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Chapter  <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <select
                                className="form-control form-select"
                                name="chapter_id"
                                onChange={formik.handleChange}
                                value={formik.values.chapter_id}
                                required
                            >
                                <option value="" disabled selected hidden> --Select-- </option>
                                {chapterRes?.data?.data?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>


                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Raw File</label>
                        <div className="col-12">
                            <input
                                className="form-control "
                                name="raw_url"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("raw_url", e.currentTarget.files[0]);
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">S3 Url</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter S3 Url"
                                type="text"
                                className="form-control"
                                name="s3_url"
                                onChange={formik.handleChange}
                                value={formik.values.s3_url}
                            />
                        </div>
                    </div>


                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Price  <span className=" text-danger">*</span></label>
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
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Sequence  <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Sequence"
                                type="number"
                                className="form-control"
                                name="sequence"
                                onChange={formik.handleChange}
                                value={formik.values.sequence}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Rating  <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Rating"
                                type="number"
                                className="form-control"
                                name="rating"
                                onChange={formik.handleChange}
                                value={formik.values.rating}
                                required
                            />
                        </div>
                    </div>



                    <div className="form-group row col-12 my-2 ">
                        <label className="col-6 col-form-label">Is Free</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Active"
                                    name="is_free"
                                    onChange={formik.handleChange}
                                    value={formik.values.is_free}
                                    checked={formik.values.is_free}
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
                    <div className="form-group row col-12 my-1">
                        {/* <label className="col-12 col-form-label">icon</label> */}
                        <div className="col-12">
                            <input
                                ref={fileRef}
                                hidden
                                className="form-control"
                                name="thumbnail"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("thumbnail", e.currentTarget.files[0]);
                                    handelImage(e);
                                }}
                            />
                        </div>
                    </div>
                    <div className=" my-2 text-center">
                        <div >
                            {formik.values.thumbnail ?
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
                            Choose a thumbnail ...
                        </button>

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

export default CreateScriptContent;
