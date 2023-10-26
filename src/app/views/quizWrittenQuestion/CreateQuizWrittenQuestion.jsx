import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useQuizSubjectSaveOrUpdateMutation, useWrittenQuestionSaveOrUpdateMutation, } from "../../../services/contentApi";
import { memo } from 'react';
const CreateQuizWrittenQuestion = ({ handleClose, paramValue }) => {
    const [writtenQuestionSaveOrUpdate, res] = useWrittenQuestionSaveOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            'chapter_quiz_id': paramValue,
            'question_attachment': '',
            'no_of_question': '',
            'marks': '',
            'is_active': true,
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                let formData = new FormData();
                formData.append('chapter_quiz_id', values.chapter_quiz_id);
                formData.append('question_attachment', values.question_attachment);
                formData.append('no_of_question', values.no_of_question);
                formData.append('marks', values.marks);
                formData.append('is_active', values.is_active ? 1 : 0);
                const result = await writtenQuestionSaveOrUpdate(formData).unwrap();
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

                    <div className="form-group  col-12 my-1">
                        <label className="col-12 col-form-label">Attachment</label>
                        <div className="col-12">
                            <input
                                className="form-control"
                                name="question_attachment"
                                type="file"
                                accept="image/*,
                                .doc, .docx, .xml,
                                .ppt, .pptx, .txt, .pdf,
                                "
                                onChange={(e) => {
                                    formik.setFieldValue("question_attachment", e.currentTarget.files[0]);

                                }}
                            />
                        </div>
                    </div>

                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Marks <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter marks"
                                type="number"
                                className="form-control"
                                name="marks"
                                onChange={formik.handleChange}
                                value={formik.values.marks}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">No of Question <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter No of Question"
                                type="number"
                                className="form-control"
                                name="no_of_question"
                                onChange={formik.handleChange}
                                value={formik.values.no_of_question}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group row col-12  my-3 ">
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

export default memo(CreateQuizWrittenQuestion);
