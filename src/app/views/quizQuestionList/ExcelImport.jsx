import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as xlsx from 'xlsx';
import { useExcelQuestionUploadMutation, useGetQuizListQuery, useQuestionSetListQuery, } from "../../../services/contentApi";
import { memo, useState } from 'react';
import { useMemo } from "react";
import OptionLoader from "../../components/OptionLoader";
const ExcelImport = ({ handleClose, paramValue }) => {
    const [excelData, setExcelData] = useState([]);
    const quizRes = useGetQuizListQuery();
    const setsList = useQuestionSetListQuery();
    const [excelQuestionUpload, res] = useExcelQuestionUploadMutation();

    const quizResData = useMemo(() =>
        quizRes?.data?.data?.filter((item) => item.id == paramValue), [quizRes, paramValue]);
        const readUploadFile = useMemo(() => (e) => {
            if (e.target.files[0]?.name?.split('.').pop() !== "xlsx") {
                toast.warn("Please upload a valid file (xlsx)");
                return false;
            }
            e.preventDefault();
            if (e.target.files) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target.result;
                    const workbook = xlsx.read(data, { type: "array" });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = xlsx.utils.sheet_to_json(worksheet);
                    setExcelData(json);
                };
                reader.readAsArrayBuffer(e.target.files[0]);
            }
        }, [
            setExcelData,
        ]);

    const formik = useFormik({

        initialValues: {
            question_text: "",
            question_text_bn: "",
            question_set_id: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            answer1: false,
            answer2: false,
            answer3: false,
            answer4: false,
            explanation_text: "",

        },
        onSubmit: async (values, { resetForm }) => {
            let excel_data_arr = [];
            excelData.map((item) => {
                excel_data_arr.push({
                    chapter_quiz_id: quizResData[0]?.id,
                    class_level_id: quizResData[0]?.class_level_id,
                    subject_id: quizResData[0]?.subject_id,
                    chapter_id: quizResData[0]?.chapter_id,
                    question_text: item.question_text,
                    question_text_bn: item.question_text_bn,
                    question_set_id: values.chapter_quiz_id,
                    option1: item.option1,
                    option2: item.option2,
                    option3: item.option3,
                    option4: item.option4,
                    answer1: item.answer1 ? 1 : 0,
                    answer2: item.answer2 ? 1 : 0,
                    answer3: item.answer3 ? 1 : 0,
                    answer4: item.answer4 ? 1 : 0,
                    explanation_text: item.explanation_text,

                })
            })
            const excel_data = JSON.stringify(excel_data_arr);
            resetForm();
            try {
                const result = await excelQuestionUpload({
                    excel_data: excel_data,
                }).unwrap();
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
                        <label className="col-12 col-form-label">Sets <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="chapter_quiz_id"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.chapter_quiz_id}
                                required
                            >
                                {setsList?.isLoading && <OptionLoader />}
                                <option value="" disabled selected hidden> --Select-- </option>
                                {setsList?.data?.data?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Select File <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                className="form-control "
                                name="question_image"
                                type="file"
                                accept="xlsx/xls/csv"
                                onChange={(e) => {
                                    readUploadFile(e);

                                }}
                                required
                            />
                        </div>
                    </div>
                </div>
                <Modal.Footer>
                    <button type="button" className="btn btn-dark me-2 btn-sm" onClick={handleClose}>
                        Close
                    </button>

                    {
                        res?.isLoading ? (
                            <div
                                className="btn btn-success btn-sm rounded-5 border-dark "
                            >
                                <div className="spinner-border spinner-border-sm mt-1" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>

                        ) : (
                            <button type="submit" className="btn btn-success btn-sm">
                                Submit
                            </button>)}

                </Modal.Footer>
            </form>
        </div>
    );
};

export default ExcelImport;
