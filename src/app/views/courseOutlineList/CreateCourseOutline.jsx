import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetChapterListBySubjectIdQuery, useGetClassListQuery, useGetQuizListByChapterIdQuery, useGetScriptListByChapterIdQuery, useGetSubjectListByClassIdQuery, useGetVideoListByChapterIdQuery, useQuestionSaveOrUpdateMutation } from "../../../services/contentApi";

import { memo } from 'react';

import OptionLoader from "../../components/OptionLoader";
import { useCourseOutlineCreateOrUpdateMutation, useGetCourseListQuery } from "../../../services/courseApi";
const CreateCourseOutline = ({ handleClose, paramValue }) => {


    const [courseOutlineCreateOrUpdate, res] = useCourseOutlineCreateOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            'title': "",
            'title_bn': "",
            'course_id': paramValue,
            'class_level_id': '',
            'subject_id': '',
            'chapter_id': '',
            'chapter_script_id': '',
            'chapter_video_id': '',
            'chapter_quiz_id': '',
            'sequence': '',
            'is_free': false,
            'is_active': true
        },
        onSubmit: async (values, { resetForm }) => {
            resetForm();
               
            if (values.course_id == 0) {
                toast.warn("Please Select Content");
                return;
            }
            try {
                const result = await courseOutlineCreateOrUpdate(values).unwrap();
                toast.success(result.message);
            } catch (error) {
                toast.warn(error.data.message);
            }
        },
    });

    const classRes = useGetClassListQuery()
    const subjectRes = useGetSubjectListByClassIdQuery(
        formik.values.class_level_id ? formik.values.class_level_id : null
    )
    const ChapterRes = useGetChapterListBySubjectIdQuery(
        formik.values.subject_id ? formik.values.subject_id : null
    )
    const scriptRes = useGetScriptListByChapterIdQuery(
        formik.values.chapter_id ? formik.values.chapter_id : null
    )

    const videoRes = useGetVideoListByChapterIdQuery(
        formik.values.chapter_id ? formik.values.chapter_id : null
    )

    const quizRes = useGetQuizListByChapterIdQuery(
        formik.values.chapter_id ? formik.values.chapter_id : null
    )

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
                    <div className="form-group col-4 my-1">
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
                    <div className="form-group col-4 my-1">
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
                                onChange={formik.handleChange}
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
                                onChange={formik.handleChange}
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
                                onChange={formik.handleChange}
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
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Chapter Script <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="chapter_script_id"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.chapter_script_id}
                                required
                            >
                                {scriptRes?.isLoading && <OptionLoader />}
                                <option value="" disabled selected hidden> --Select-- </option>
                                {scriptRes?.data?.data?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Chapter Video <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="chapter_video_id"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.chapter_video_id}
                                required
                            >
                                {videoRes?.isLoading && <OptionLoader />}
                                <option value="" disabled selected hidden> --Select-- </option>
                                {videoRes?.data?.data?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Chapter Quiz <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="chapter_quiz_id"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.chapter_quiz_id}
                                required
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

export default memo(CreateCourseOutline)
    ;
