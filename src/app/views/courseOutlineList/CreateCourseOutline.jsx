import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetChapterListBySubjectIdQuery, useGetClassListQuery, useGetQuizListByChapterIdQuery, useGetScriptListByChapterIdQuery, useGetSubjectListByClassIdQuery, useGetVideoListByChapterIdQuery, } from "../../../services/contentApi";
import { memo } from 'react';
import OptionLoader from "../../components/OptionLoader";
import { useCourseOutlineCreateOrUpdateMutation } from "../../../services/courseApi";
import { useState } from "react";
const CreateCourseOutline = ({ handleClose, paramValue }) => {
    const [contentType, setContentType] = useState('');
    const [courseOutlineCreateOrUpdate, res] = useCourseOutlineCreateOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            'title': "",
            'title_bn': "",
            'course_id': paramValue,
            'class_level_id': '',
            'subject_id': '',
            'chapter_id': '',
            'chapter_script_id': 0,
            'chapter_video_id': 0,
            'chapter_quiz_id': 0,
            'sequence': '',
            'is_free': false,
            'is_active': true,
            'is_only_note': false,
        },
        onSubmit: async (values, { resetForm }) => {
            const data = {
                ...values,
                chapter_script_id: contentType == 'script' ? values.chapter_script_id : 0,
                chapter_video_id: contentType == 'video' ? values.chapter_video_id : 0,
                chapter_quiz_id: contentType == 'quiz' ? values.chapter_quiz_id : 0,
            }
            resetForm();
            if (values.course_id == 0) {
                toast.warn("Please Select Content");
                return;
            }
            try {
                const result = await courseOutlineCreateOrUpdate(data).unwrap();
                toast.success(result.message);
            } catch (error) {
                toast.warn(error.data.message);
            }
        },
    });

    const contentTypeHandler = (e) => {
        setContentType(e.target.value);
    }
    const classRes = useGetClassListQuery()
    const subjectRes = useGetSubjectListByClassIdQuery(
        formik.values.class_level_id ? formik.values.class_level_id : 0
    )
    const ChapterRes = useGetChapterListBySubjectIdQuery(
        formik.values.subject_id ? formik.values.subject_id : 0
    )
    const scriptRes = useGetScriptListByChapterIdQuery(
        formik.values.chapter_id ? formik.values.chapter_id : 0
    )

    const videoRes = useGetVideoListByChapterIdQuery(
        formik.values.chapter_id ? formik.values.chapter_id : 0
    )

    const quizRes = useGetQuizListByChapterIdQuery(
        formik.values.chapter_id ? formik.values.chapter_id : 0
    )

    const handleClassChange = (e) => {
        formik.setFieldValue('class_level_id', e.target.value);
        formik.setFieldValue('subject_id', '');
        formik.setFieldValue('chapter_id', '');
        formik.setFieldValue('chapter_script_id', '');
        formik.setFieldValue('chapter_video_id', '');
        formik.setFieldValue('chapter_quiz_id', '');
    }
    const handleSubjectChange = (e) => {
        formik.setFieldValue('subject_id', e.target.value);
        formik.setFieldValue('chapter_id', '');
        formik.setFieldValue('chapter_script_id', '');
        formik.setFieldValue('chapter_video_id', '');
        formik.setFieldValue('chapter_quiz_id', '');
    }
    const handleChapterChange = (e) => {
        formik.setFieldValue('chapter_id', e.target.value);
        formik.setFieldValue('chapter_script_id', '');
        formik.setFieldValue('chapter_video_id', '');
        formik.setFieldValue('chapter_quiz_id', '');
    }
    const isOnlyNote = (e) => {
        formik.setFieldValue('is_only_note', e.target.checked);
        formik.setFieldValue('chapter_script_id', '');
        formik.setFieldValue('chapter_video_id', '');
        formik.setFieldValue('chapter_quiz_id', '');
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
                                placeholder="Enter title"
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
                                value={formik.values.title_bn}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Class <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="class_level_id"
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    handleClassChange(e)

                                }}
                                onBlur={formik.handleBlur}
                                value={formik.values.class_level_id}
                                required
                            >
                                {classRes?.isLoading && <OptionLoader />}
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
                        <label className="col-12 col-form-label">Subject <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="subject_id"
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    handleSubjectChange(e)
                                }}
                                onBlur={formik.handleBlur}
                                value={formik.values.subject_id}
                                required
                            >
                                {subjectRes?.isLoading && <OptionLoader />}
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
                        <label className="col-12 col-form-label">Chapter <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="chapter_id"
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    handleChapterChange(e)
                                }}
                                onBlur={formik.handleBlur}
                                value={formik.values.chapter_id}
                                required

                            >
                                {subjectRes?.isLoading && <OptionLoader />}
                                <option value="" disabled selected hidden> --Select-- </option>
                                {ChapterRes?.data?.data?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={
                        formik.values.is_only_note === false ? "form-group col-4 my-1" : 'd-none'
                    }>
                        <label className="col-12 col-form-label">Content Type</label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="contentType"
                                onChange={(e) => {
                                    contentTypeHandler(e)
                                }}

                                value={contentType}

                            >
                                <option value="" disabled selected hidden> --Select-- </option>
                                <option
                                    value="script"
                                >Script</option>
                                <option
                                    value="video"
                                >Video</option>
                                <option
                                    value="quiz"
                                >Quiz</option>

                            </select>
                        </div>
                    </div>

                    <div className={contentType === "script" &&
                        formik.values.is_only_note !== true ? "form-group col-8 my-1" : 'd-none'}
                    >
                        <label className="col-12 col-form-label">Chapter Script </label>
                        <div className="col-12">
                            <select

                                className="form-control form-select"
                                name="chapter_script_id"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.chapter_script_id}
                            >
                                {scriptRes?.isLoading && <OptionLoader />}
                                <option value="" disabled selected hidden > --Cancel-- </option>
                                {scriptRes?.data?.data?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={contentType === "video" &&
                        formik.values.is_only_note !== true ? "form-group col-8 my-1" : 'd-none'}
                    >
                        <label className="col-12 col-form-label">Chapter Video</label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="chapter_video_id"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.chapter_video_id}

                            >
                                {videoRes?.isLoading && <OptionLoader />}
                                <option value="" disabled selected hidden > --Select-- </option>
                                {videoRes?.data?.data?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={contentType === "quiz" &&
                        formik.values.is_only_note !== true
                        ? "form-group col-8 my-1" : 'd-none'}
                    >
                        <label className="col-12 col-form-label">Chapter Quiz </label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="chapter_quiz_id"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.chapter_quiz_id}

                            >
                                {quizRes?.isLoading && <OptionLoader />}
                                <option value="" disabled selected hidden> --Select-- </option>
                                {quizRes?.data?.data?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-12 my-2">
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
                    <div className="form-group row col-4 my-3 ">
                        <label className="col-6 col-form-label">Is Only Note</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"

                                    name="is_only_note"
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                        isOnlyNote(e)
                                    }}
                                    value={formik.values.is_only_note}
                                    checked={formik.values.is_only_note}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row col-4 my-3 ">
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


                    <div className="form-group row col-4  my-3 ">
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

export default memo(CreateCourseOutline)
    ;
