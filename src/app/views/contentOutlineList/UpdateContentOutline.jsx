import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useContentOutlineSaveOrUpdateMutation, useGetChapterListBySubjectIdQuery, useGetClassListQuery, useGetContentListQuery, useGetQuizListByChapterIdQuery, useGetScriptListByChapterIdQuery, useGetSubjectListByClassIdQuery, useGetVideoListByChapterIdQuery,  } from "../../../services/contentApi";
import { memo } from 'react';
import OptionLoader from "../../components/OptionLoader";

const UpdateContentOutline = ({ handleClose, paramValue }) => {


    const [contentOutlineSaveOrUpdate, res] = useContentOutlineSaveOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            'title': paramValue?.title,
            'title_bn': paramValue?.title_bn,
            'content_id': paramValue?.content_id,
            'class_level_id': paramValue?.class_level_id,
            'subject_id': paramValue?.subject_id,
            'chapter_id':   paramValue?.chapter_id,
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
        
            formData.append('title', values.title);
            formData.append('title_bn', values.title_bn);
            formData.append('content_id', values.content_id);
            formData.append('class_level_id', values.class_level_id);
            formData.append('subject_id', values.subject_id);
            formData.append('chapter_id', values.chapter_id);
            formData.append('chapter_script_id', values.chapter_script_id);
            formData.append('chapter_video_id', values.chapter_video_id);
            formData.append('chapter_quiz_id', values.chapter_quiz_id);
            formData.append('sequence', values.sequence);
            formData.append('icon', values.icon);
            formData.append('color_code', values.color_code);
            formData.append('is_free', values.is_free? 1 : 0);
            formData.append('is_active', values.is_active? 1 : 0);
            resetForm();

            if (values.content_id == 0) {
                toast.warn("Please Select Content");
                return;
            }


            try {
                const result = await contentOutlineSaveOrUpdate(formData).unwrap();
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

export default memo(UpdateContentOutline)
    ;
