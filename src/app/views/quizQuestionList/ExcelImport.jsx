import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetQuizListQuery, useQuestionSaveOrUpdateMutation, useQuizCreateOrUpdateMutation, } from "../../../services/contentApi";
import { useSelector } from "react-redux";
import { memo } from 'react';
import { useMemo } from "react";
const ExcelImport = ({ handleClose ,paramValue}) => {
    const quizRes = useGetQuizListQuery();
    const quizResData = useMemo(() =>
        quizRes?.data?.data?.filter((item) => item.id == paramValue), [quizRes, paramValue]);
    const [questionSaveOrUpdate, res] = useQuestionSaveOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            question_text: "",
            question_text_bn: "",
  
        },
        onSubmit: async (values, { resetForm }) => {
            let formData = new FormData();
            formData.append("chapter_quiz_id", quizResData[0]?.id);
         
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
                        <label className="col-12 col-form-label">Sets <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Sets"
                                type="text"
                                className="form-control"
                                name="question_text"
                                onChange={formik.handleChange}
                                value={formik.values.question_text}
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

export default memo(ExcelImport)
    ;
