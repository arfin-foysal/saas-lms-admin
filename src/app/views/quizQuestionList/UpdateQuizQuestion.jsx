import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetQuizListQuery, useQuestionSaveOrUpdateMutation, useQuizCreateOrUpdateMutation, } from "../../../services/contentApi";
import { useSelector } from "react-redux";
import { memo } from 'react';
import { useMemo } from "react";
const UpdateQuizQuestion = ({ handleClose ,paramValue}) => {
    const [questionSaveOrUpdate, res] = useQuestionSaveOrUpdateMutation();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            question_text: paramValue?.question_text,
            question_text_bn: paramValue?.question_text_bn,
            question_image: paramValue?.question_image,
            option1: paramValue?.option1,
            option2: paramValue?.option2,
            option3: paramValue?.option3,
            option4: paramValue?.option4,
            option1_image: paramValue?.option1_image,
            option2_image: paramValue?.option2_image,
            option3_image: paramValue?.option3_image,
            option4_image: paramValue?.option4_image,
            answer1: paramValue?.answer1,
            answer2: paramValue?.answer2,
            answer3: paramValue?.answer3,
            answer4: paramValue?.answer4,
            explanation_text: paramValue?.explanation_text,
            explanation_image: paramValue?.explanation_image,
            is_active: paramValue?.is_active,
        },
        onSubmit: async (values, { resetForm }) => {
            let formData = new FormData();
            formData.append("id", paramValue?.id);
            formData.append("chapter_quiz_id", paramValue?.chapter_quiz_id);
            formData.append("class_level_id", paramValue?.class_level_id);
            formData.append("subject_id", paramValue?.subject_id);
            formData.append("chapter_id", paramValue?.chapter_id);
            formData.append("question_text", values.question_text);
            formData.append("question_text_bn", values.question_text_bn);
            formData.append("question_image", values.question_image);
            formData.append("option1", values.option1);
            formData.append("option2", values.option2);
            formData.append("option3", values.option3);
            formData.append("option4", values.option4);
            formData.append("option1_image", values.option1_image);
            formData.append("option2_image", values.option2_image);
            formData.append("option3_image", values.option3_image);
            formData.append("option4_image", values.option4_image);
            formData.append("answer1", values.answer1 ? 1 : 0);
            formData.append("answer2", values.answer2 ? 1 : 0);
            formData.append("answer3", values.answer3 ? 1 : 0);
            formData.append("answer4", values.answer4 ? 1 : 0);
            formData.append("explanation_text", values.explanation_text);
            formData.append("explanation_image", values.explanation_image);
            formData.append("is_active", values.is_active ? 1 : 0);
            resetForm();
            try {
                const result = await questionSaveOrUpdate(formData).unwrap();
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
                        <label className="col-12 col-form-label">Question <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Question"
                                type="text"
                                className="form-control"
                                name="question_text"
                                onChange={formik.handleChange}
                                value={formik.values.question_text}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Bangla Question</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Bangla Question"
                                type="text"
                                className="form-control"
                                name="question_text_bn"
                                onChange={formik.handleChange}
                                value={formik.values.question_text_bn}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Question Image</label>
                        <div className="col-12">
                            <input
                                className="form-control "
                                name="question_image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("question_image", e.currentTarget.files[0]);
                                }}
                                

                            />
                        </div>
                    </div>

                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Option 01 <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter option 01"
                                type="text"
                                className="form-control"
                                name="option1"
                                onChange={formik.handleChange}
                                value={formik.values.option1}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Option 01 (Image)</label>
                        <div className="col-12">
                            <input
                                className="form-control "
                                name="option1_image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("option1_image", e.currentTarget.files[0]);
                                }}
                            />
                        </div>
                    </div>

                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Option 02 <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter option 02"
                                type="text"
                                className="form-control"
                                name="option2"
                                onChange={formik.handleChange}
                                value={formik.values.option2}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Option 02 (Image)</label>
                        <div className="col-12">
                            <input
                                className="form-control "
                                name="option2_image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("option2_image", e.currentTarget.files[0]);
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Option 03 <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter option 03"
                                type="text"
                                className="form-control"
                                name="option3"
                                onChange={formik.handleChange}
                                value={formik.values.option3}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Option 03 (Image)e</label>
                        <div className="col-12">
                            <input
                                className="form-control "
                                name="option3_image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("option3_image", e.currentTarget.files[0]);
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Option 04 <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter option 04"
                                type="text"
                                className="form-control"
                                name="option4"
                                onChange={formik.handleChange}
                                value={formik.values.option4}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Option 04 (Image)</label>
                        <div className="col-12">
                            <input
                                className="form-control "
                                name="option4_image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("option4_image", e.currentTarget.files[0]);
                                }}
                            />
                        </div>
                    </div>



                    <div className="form-group row col-6 my-3 ">
                        <label className="col-6 col-form-label">Correct Answer 01</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="✔"
                                    name="answer1"
                                    onChange={formik.handleChange}
                                    value={formik.values.answer1}
                                    checked={formik.values.answer1}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row col-6 my-3 ">
                        <label className="col-6 col-form-label">Correct Answer 02</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="✔"
                                    name="answer2"
                                    onChange={formik.handleChange}
                                    value={formik.values.answer2}
                                    checked={formik.values.answer2}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row col-6 my-3 ">
                        <label className="col-6 col-form-label">Correct Answer 03</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="✔"
                                    name="answer3"
                                    onChange={formik.handleChange}
                                    value={formik.values.answer3}
                                    checked={formik.values.answer3}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row col-6 my-3 ">
                        <label className="col-6 col-form-label">Correct Answer 04</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="✔"
                                    name="answer4"
                                    onChange={formik.handleChange}
                                    value={formik.values.answer4}
                                    checked={formik.values.answer4}
                                />
                            </div>
                        </div>
                    </div>
           
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Explanation Text <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <textarea
                                placeholder="Enter Question"
                                type="text"
                                className="form-control"
                                name="explanation_text"
                                onChange={formik.handleChange}
                                value={formik.values.explanation_text}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Explanation (Image)</label>
                        <div className="col-12">
                            <input
                                className="form-control "
                                name="explanation_image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("explanation_image", e.currentTarget.files[0]);
                                }}
                            />
                        </div>
                    </div>
                    
                    <div className="form-group row col-12 my-3 ">
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

export default memo(UpdateQuizQuestion)
    ;
