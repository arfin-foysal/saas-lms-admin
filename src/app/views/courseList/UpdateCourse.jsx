import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetMenuListQuery } from "../../../services/masterSettingsApi";

import { useCourseCreateOrUpdateMutation } from "../../../services/courseApi";
const UpdateCourse = ({ handleClose,paramValue }) => {
    const [courseCreateOrUpdate, res] = useCourseCreateOrUpdateMutation();
    const cateRes = useGetMenuListQuery()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            'title': paramValue?.title,
            'title_bn': paramValue?.title_bn,
            'category_id': paramValue?.category_id,
            'gp_product_id': paramValue?.gp_product_id,
            'youtube_url': paramValue?.youtube_url,
            'description': paramValue?.description,
            'thumbnail': paramValue?.thumbnail,
            'icon': paramValue?.icon,
            'number_of_enrolled': paramValue?.number_of_enrolled,
            'regular_price': paramValue?.regular_price,
            'sale_price': paramValue?.sale_price,
            'discount_percentage': paramValue?.discount_percentage ,
            'rating': paramValue?.rating,
            'has_life_coach': paramValue?.has_life_coach,
            'is_active': paramValue?.is_active,
            'is_free': paramValue?.is_free,
            'sequence': paramValue?.sequence,
            'appeared_from': paramValue?.appeared_from,
            'appeared_to': paramValue?.appeared_to,
        },

        onSubmit: async (values, { resetForm }) => {
            let formData = new FormData();
            formData.append("id", paramValue?.id);
            formData.append("title", values.title);
            formData.append("title_bn", values.title_bn);
            formData.append("category_id", values.category_id);
            formData.append("gp_product_id", values.gp_product_id);
            formData.append("youtube_url", values.youtube_url);
            formData.append("description", values.description);
            formData.append("thumbnail", values.thumbnail);
            formData.append("icon", values.icon);
            formData.append("number_of_enrolled", values.number_of_enrolled);
            formData.append("regular_price", values.regular_price);
            formData.append("sale_price", values.sale_price);
            formData.append("discount_percentage", values.discount_percentage);
            formData.append("rating", values.rating);
            formData.append("has_life_coach", values.has_life_coach?1:0);
            formData.append("sequence", values.sequence);
            formData.append("appeared_from", values.appeared_from);
            formData.append("appeared_to", values.appeared_to);
            formData.append("is_free", values.is_free ? 1 : 0);
            formData.append("is_active", values.is_active ? 1 : 0);
            resetForm();
            try {
                const result = await courseCreateOrUpdate(formData).unwrap();
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
                        <label className="col-12 col-form-label">Title <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Title"
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
                                placeholder="Enter Bangla title"
                                type="text"
                                className="form-control"
                                name="title_bn"
                                onChange={formik.handleChange}
                                value={formik.values.title_bn}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Menu Or Category <span className=" text-danger">*</span></label>
                        <div className="col-12">

                            <select
                                className="form-control"
                                name="category_id"
                                onChange={formik.handleChange}
                                value={formik.values.category_id}
                                required
                            >
                                <option value="" disabled selected hidden> --Select-- </option>
                                {cateRes.data && cateRes?.data?.data?.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                )
                                )}
                            </select>

                        </div>
                    </div>

                    <div className="form-group col-4 my-1">
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
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Google Pay Code</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Google Pay Code"
                                type="text"
                                className="form-control"
                                name="gp_product_id"
                                onChange={formik.handleChange}
                                value={formik.values.gp_product_id}
                            />
                        </div>
                    </div>
               
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Regular price <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Regular price"
                                type="number"
                                className="form-control"
                                name="regular_price"
                                onChange={formik.handleChange}
                                value={formik.values.regular_price}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Sale Price <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Sale Price"
                                type="number"
                                className="form-control"
                                name="sale_price"
                                onChange={formik.handleChange}
                                value={formik.values.sale_price}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Discount % <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Discount %"
                                type="number"
                                className="form-control"
                                name="discount_percentage"
                                onChange={formik.handleChange}
                                value={formik.values.discount_percentage}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Number of Enrolled <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Number of Enrolled"
                                type="number"
                                className="form-control"
                                name="number_of_enrolled"
                                onChange={formik.handleChange}
                                value={formik.values.number_of_enrolled}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Rating <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Rating"
                                type="number"
                                max="5"
                                className="form-control"
                                name="rating"
                                onChange={formik.handleChange}
                                value={formik.values.rating}
                                required
                            />
                        </div>
                    </div>    <div className="form-group col-4 my-1">
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
                    <div className="form-group  col-6 my-1">
                        <label className="col-12 col-form-label">Icon</label>
                        <div className="col-12">
                            <input
                                className="form-control"
                                name="icon"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("icon", e.currentTarget.files[0]);

                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group  col-6 my-1">
                        <label className="col-12 col-form-label">Thumbnail</label>
                        <div className="col-12">
                            <input
                                className="form-control"
                                name="thumbnail"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("thumbnail", e.currentTarget.files[0]);

                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group  col-6 my-1">
                        <label className="col-12 col-form-label">Appeared from</label>
                        <div className="col-12">
                            <input type="datetime-local"
                                className="form-control"
                                name="appeared_from"
                                onChange={formik.handleChange}
                                defaultValue={paramValue ? formik.values.appeared_from: ''}
                                 />
                        </div>
                    </div>
                    <div className="form-group  col-6 my-1">
                        <label className="col-12 col-form-label">Appeared To</label>
                        <div className="col-12">
                            <input type="datetime-local"
                                className="form-control"
                                name="appeared_to"
                                onChange={formik.handleChange}
                                defaultValue={paramValue ? formik.values.appeared_to: ''}
                                 />
                        </div>
                    </div>
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Description </label>
                        <div className="col-12">
                            <textarea
                                placeholder="Enter Description"
                                className="form-control"
                                name="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </div>
                    </div>

                    <div className="form-group row col-4 my-2 ">
                        <label className="col-4 col-form-label">Is Free</label>
                        <div className="col-8">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label=""
                                    name="is_free"
                                    onChange={formik.handleChange}
                                    value={formik.values.is_free}
                                    checked={formik.values.is_free}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row col-4 my-2 ">
                        <label className="col-6 col-form-label">Is Active</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label=""
                                    name="is_active"
                                    onChange={formik.handleChange}
                                    value={formik.values.is_active}
                                    checked={formik.values.is_active}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row col-4 my-2 ">
                        <label className="col-6 col-form-label">Has Life Coach</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label=""
                                    name="has_life_coach"
                                    onChange={formik.handleChange}
                                    value={formik.values.has_life_coach}
                                    checked={formik.values.has_life_coach}
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

export default UpdateCourse;
