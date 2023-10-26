import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import PreviewImage from "../../components/PreviewImage";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { useGetChapterListBySubjectIdQuery, useGetClassListQuery, useGetSubjectListByClassIdQuery, useVideoCreateOrUpdateMutation } from "../../../services/contentApi";
const CreateVideoContent = ({ handleClose }) => {
    const classRes = useGetClassListQuery()
    const fileRef = useRef(null)
    const [previewImage, setPreviewImage] = useState();
    function handelImage(e) {
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
    const [videoCreateOrUpdate, res] = useVideoCreateOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            title: "",
            title_bn: "",
            class_level_id: null,
            subject_id: null,
            chapter_id: "",
            author_name: "",
            author_details: "",
            description: "",
            raw_url: "",
            s3_url: "",
            youtube_url: "",
            download_url: "",
            duration: "",
            price: "",
            rating: "",
            is_free: false,
            sequence: "",
            thumbnail: "",
            is_active: true,
        },
        onSubmit: async (values, { resetForm }) => {
            let formData = new FormData();
            formData.append("title", values.title);
            formData.append("title_bn", values.title_bn);
            formData.append("class_level_id", values.class_level_id);
            formData.append("subject_id", values.subject_id);
            formData.append("chapter_id", values.chapter_id);
            formData.append("author_name", values.author_name);
            formData.append("author_details", values.author_details);
            formData.append("description", values.description);
            formData.append("raw_url", values.raw_url);
            formData.append("s3_url", values.s3_url);
            formData.append("youtube_url", values.youtube_url);
            formData.append("download_url", values.download_url);
            formData.append("duration", values.duration);
            formData.append("price", values.price);
            formData.append("rating", values.rating);
            formData.append("thumbnail", values.thumbnail);
            formData.append("sequence", values.sequence);
                formData.append("is_free", values.is_free?1:0);
            formData.append("is_active", values.is_active?1:0);
            resetForm();
            try {
                const result = await videoCreateOrUpdate(formData).unwrap();
                toast.success(result.message);
            } catch (error) {
                toast.warn(error.data.message);
            }
        },
    });
    const subjectRes = useGetSubjectListByClassIdQuery(formik.values.class_level_id
        ? formik.values.class_level_id
        : 0)
    const chapterRes = useGetChapterListBySubjectIdQuery(formik.values.subject_id
        ? formik.values.subject_id
        : 0)

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
                                placeholder="Enter Bangla Title"
                                type="text"
                                className="form-control"
                                name="title_bn"
                                onChange={formik.handleChange}
                 
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Class  <span className=" text-danger">*</span></label>
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
                        <label className="col-12 col-form-label">Author Name</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Author Name"
                                type="text"
                                className="form-control"
                                name="author_name"
                                onChange={formik.handleChange}
                                value={formik.values.author_name}
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Author Details</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Author Details"
                                type="text"
                                className="form-control"
                                name="author_details"
                                onChange={formik.handleChange}
                                value={formik.values.author_details}
                            />
                        </div>
                    </div>

                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Raw URL</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Raw URL"
                                type="text"
                                className="form-control"
                                name="raw_url"
                                onChange={formik.handleChange}
                                value={formik.values.raw_url}
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">S3 URL</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter S3 URL"
                                type="text"
                                className="form-control"
                                name="s3_url"
                                onChange={formik.handleChange}
                                value={formik.values.s3_url}
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Youtube URL</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Youtube URL"
                                type="text"
                                className="form-control"
                                name="youtube_url"
                                onChange={formik.handleChange}
                                value={formik.values.youtube_url}
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Download URL</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Download URL"
                                type="text"
                                className="form-control"
                                name="download_url"
                                onChange={formik.handleChange}
                                value={formik.values.download_url}
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Duration</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter duration"
                                type="number"
                                className="form-control"
                                name="duration"
                                onChange={formik.handleChange}
                                value={formik.values.duration}
                                required
                            />
                        </div>
                    </div>
              
                    <div className="form-group col-6 my-1">
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
                    </div>      <div className="form-group col-6 my-1">
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
                    <div className="form-group col-6 my-1">
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

export default CreateVideoContent;
