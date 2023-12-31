import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useContentOutlineSaveOrUpdateMutation, useGetChapterListBySubjectIdQuery, useGetClassListQuery, useGetQuizListByChapterIdQuery, useGetScriptListByChapterIdQuery, useGetSubjectListByClassIdQuery, useGetVideoListByChapterIdQuery, } from "../../../services/contentApi";
import { memo } from 'react';
import OptionLoader from "../../components/OptionLoader";
import { useState } from "react";
import { useEffect } from "react";
const UpdateContentOutline = ({ handleClose, paramValue }) => {
    const [contentType, setContentType] = useState('');
    const [contentOutlineSaveOrUpdate, res] = useContentOutlineSaveOrUpdateMutation();
    
    const formik = useFormik({
        initialValues: {
            'id': paramValue?.id,
            'title': paramValue?.title,
            'title_bn': paramValue?.title_bn,
            'content_id': paramValue?.content_id,
            'class_level_id': paramValue?.class_level_id,
            'subject_id': paramValue?.subject_id,
            'chapter_id': paramValue?.chapter_id,
            'content_subject_id': paramValue?.content_subject_id,
            'chapter_script_id': paramValue?.chapter_script_id,
            'chapter_video_id': paramValue?.chapter_video_id,
            'chapter_quiz_id': paramValue?.chapter_quiz_id,
            'sequence': paramValue?.sequence,
            'icon': paramValue?.icon,
            'color_code': paramValue?.color_code,
            'is_free': paramValue?.is_free,
            'is_active': paramValue?.is_active,
        },
        onSubmit: async (values, { resetForm }) => {
            let formData = new FormData();
            formData.append('id', paramValue?.id)
            formData.append('title', values.title);
            formData.append('title_bn', values.title_bn);
            formData.append('content_id', values.content_id);
            formData.append('content_subject_id', values.content_subject_id);
            formData.append('class_level_id', values.class_level_id);
            formData.append('subject_id', values.subject_id);
            formData.append('chapter_id', values.chapter_id);
            formData.append('chapter_script_id', values.chapter_script_id ? values.chapter_script_id : 0);
            formData.append('chapter_video_id', values.chapter_video_id ? values.chapter_video_id : 0);
            formData.append('chapter_quiz_id', values.chapter_quiz_id ? values.chapter_quiz_id : 0);
            formData.append('sequence', values.sequence);
            formData.append('icon', values.icon);
            formData.append('color_code', values.color_code);
            formData.append('is_free', values.is_free ? 1 : 0);
            formData.append('is_active', values.is_active ? 1 : 0);

            if (values.content_id == 0) {
                toast.warn("Please Select Content");
                return;
            }
            resetForm();
            try {
                const result = await contentOutlineSaveOrUpdate(formData).unwrap();
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

    if (res.isSuccess) {
        handleClose();
    }

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

    const videoHandler = (e) => {
        formik.setFieldValue('chapter_video_id', e.target.value);
        formik.setFieldValue('chapter_script_id', 0);
        formik.setFieldValue('chapter_quiz_id', 0);
    }

    const scriptHandler = (e) => {
        formik.setFieldValue('chapter_script_id', e.target.value);
        formik.setFieldValue('chapter_video_id', 0);
        formik.setFieldValue('chapter_quiz_id', 0);
    }

    const quizHandler = (e) => {
        formik.setFieldValue('chapter_quiz_id', e.target.value);
        formik.setFieldValue('chapter_script_id', 0);
        formik.setFieldValue('chapter_video_id', 0);
    }
    useEffect(() => {
        if (paramValue.chapter_script_id) {
            setContentType('chapter_script_id');
        } else if (paramValue.chapter_video_id) {
            setContentType('chapter_video_id');
        } else if (paramValue.chapter_quiz_id) {
            setContentType('chapter_quiz_id');
        } else {
            setContentType('');
        }
    }, [])

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

                    <div className="form-group col-4 my-1"
                    >
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
                                    value="chapter_script_id"
                                >Script</option>
                                <option
                                    value="chapter_video_id"
                                >Video</option>
                                <option
                                    value="chapter_quiz_id"
                                >Quiz</option>

                            </select>
                        </div>
                    </div>

                    <div className={contentType === "chapter_script_id" ? "form-group col-8 my-1" : 'd-none'}
                    >
                        <label className="col-12 col-form-label">Chapter Script </label>
                        <div className="col-12">
                            <select

                                className="form-control form-select"
                                name="chapter_script_id"
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    scriptHandler(e)
                                }}
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
                    <div className={contentType === "chapter_video_id" ? "form-group col-8 my-1" : 'd-none'}
                    >
                        <label className="col-12 col-form-label">Chapter Video</label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="chapter_video_id"
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    videoHandler(e)
                                }}
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
                    <div className={contentType === "chapter_quiz_id"
                        ? "form-group col-8 my-1" : 'd-none'}
                    >
                        <label className="col-12 col-form-label">Chapter Quiz </label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="chapter_quiz_id"
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    quizHandler(e)
                                }}
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

                    <div className="form-group  col-4 my-1">
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
                        <label className="col-12 col-form-label">Color Code</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Color Code"
                                type="text"
                                className="form-control"
                                name="color_code"
                                onChange={formik.handleChange}
                                value={formik.values.color_code}
                                required
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

export default memo(UpdateContentOutline)
    ;
