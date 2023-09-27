import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetChapterListBySubjectIdQuery, useGetClassListQuery, useGetQuizTypeListQuery, useGetSubjectListByClassIdQuery, useQuizCreateOrUpdateMutation, } from "../../../services/contentApi";
import OptionLoader from "../../components/OptionLoader";
const UpdateQuiz
    = ({ handleClose,paramValue }) => {
        const classRes = useGetClassListQuery()

        const [quizCreateOrUpdate, res] = useQuizCreateOrUpdateMutation();
        const formik = useFormik({
            initialValues: {
                id:paramValue?.id,
                title:paramValue?.title,
                title_bn: paramValue?.title_bn,
                description: paramValue?.description,
                class_level_id: paramValue?.class_level_id,
                quiz_type_id: paramValue?.quiz_type_id,
                subject_id: paramValue?.subject_id,
                chapter_id: paramValue?.chapter_id,
                duration: paramValue?.duration,
                positive_mark: paramValue?.positive_mark,
                negative_mark: paramValue?.negative_mark,
                total_mark: paramValue?.total_mark,
                number_of_question: paramValue?.number_of_question,
                sequence: paramValue?.sequence,
                is_free: paramValue?.is_free,
                is_active: paramValue?.is_active,
            },
            onSubmit: async (values, { resetForm }) => {
                let formData = new FormData();
                formData.append("id", values.id);
                formData.append("title", values.title);
                formData.append("title_bn", values.title_bn);
                formData.append("description", values.description);
                formData.append("class_level_id", values.class_level_id);
                formData.append("quiz_type_id", values.quiz_type_id);
                formData.append("subject_id", values.subject_id);
                formData.append("chapter_id", values.chapter_id);
                formData.append("duration", values.duration);
                formData.append("positive_mark", values.positive_mark);
                formData.append("negative_mark", values.negative_mark);
                formData.append("total_mark", values.total_mark);
                formData.append("number_of_question", values.number_of_question);
                formData.append("sequence", values.sequence);
                formData.append("is_free", values.is_free ? 1 : 0);
                formData.append("is_active", values.is_active ? 1 : 0);
                resetForm();
                try {
                    const result = await quizCreateOrUpdate(formData).unwrap();
                    toast.success(result.message);
                } catch (error) {
                    toast.warn(error.data.message);
                }
            },
        });
        const subjectRes = useGetSubjectListByClassIdQuery(formik.values.class_level_id ?
            formik.values.class_level_id : 0)
        const chapterRes = useGetChapterListBySubjectIdQuery(formik.values.subject_id ?
            formik.values.subject_id : 0)
           const quizTypeRes = useGetQuizTypeListQuery()

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
                                    placeholder="Enter Title Bangla"
                                    type="text"
                                    className="form-control"
                                    name="title_bn"
                                    onChange={formik.handleChange}
                                    value={formik.values.title_bn}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group col-3 my-1">
                            <label className="col-12 col-form-label">Quiz Type <span className=" text-danger">*</span></label>
                            <div className="col-12">
                                <select
                                    className="form-control form-select"
                                    name="quiz_type_id"
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        // handelFocus(e.target.name, e.target.value);
                                    }}
                                    value={formik.values.quiz_type_id}
                                    required
                                >
                                    <option value="" disabled selected hidden> --Select-- </option>
                                    {quizTypeRes?.isLoading && (
                                        <OptionLoader />
                                    )}
                                    {quizTypeRes?.data?.data?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group col-3 my-1">
                            <label className="col-12 col-form-label">Class <span className=" text-danger">*</span></label>
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
                                    {classRes?.isLoading && (
                                        <OptionLoader />
                                    )}
                                    {classRes?.data?.data?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group col-3 my-1">
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
                                    {subjectRes?.isLoading && (
                                        <OptionLoader />
                                    )}
                                    {subjectRes?.data?.data?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group col-3 my-1">
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
                                    {chapterRes?.isLoading && (
                                        <OptionLoader />
                                    )}
                                    {chapterRes?.data?.data?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group col-6 my-1">
                            <label className="col-12 col-form-label">Duration <span className=" text-danger">*</span></label>
                            <div className="col-12">
                                <input
                                    placeholder="Enter Duration"
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
                            <label className="col-12 col-form-label">Positive Mark  <span className=" text-danger">*</span></label>
                            <div className="col-12">
                                <input
                                    placeholder="Enter Positive Mark"
                                    type="number"
                                    className="form-control"
                                    name="positive_mark"
                                    onChange={formik.handleChange}
                                    value={formik.values.positive_mark}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group col-6 my-1">
                            <label className="col-12 col-form-label">Negative Mark  <span className=" text-danger">*</span></label>
                            <div className="col-12">
                                <input
                                    placeholder="Enter Negative Mark"
                                    type="number"
                                    className="form-control"
                                    name="negative_mark"
                                    onChange={formik.handleChange}
                                    value={formik.values.negative_mark}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group col-6 my-1">
                            <label className="col-12 col-form-label">Total Mark <span className=" text-danger">*</span></label>
                            <div className="col-12">
                                <input
                                    placeholder="Enter Total Mark"
                                    type="number"
                                    className="form-control"
                                    name="total_mark"
                                    onChange={formik.handleChange}
                                    value={formik.values.total_mark}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group col-6 my-1">
                            <label className="col-12 col-form-label">Number of Question <span className=" text-danger">*</span></label>
                            <div className="col-12">
                                <input
                                    placeholder="Enter Number of Question"
                                    type="number"
                                    className="form-control"
                                    name="number_of_question"
                                    onChange={formik.handleChange}
                                    value={formik.values.number_of_question}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group col-6 my-1">
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

export default UpdateQuiz
    ;
