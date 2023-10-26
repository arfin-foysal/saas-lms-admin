import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetCoreSubjectListQuery, useQuizSubjectSaveOrUpdateMutation,  } from "../../../services/contentApi";
import { memo } from 'react';
import OptionLoader from "../../components/OptionLoader";
const CreateQuizSubject = ({ handleClose, paramValue }) => {
    const [quizSubjectSaveOrUpdate, res] = useQuizSubjectSaveOrUpdateMutation();
    const subjectRes = useGetCoreSubjectListQuery();
    const formik = useFormik({
        initialValues: {
            'chapter_quiz_id': paramValue,
            'quiz_core_subject_id': '',
            'no_of_question': '',
            'is_active': true,
     
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const result = await quizSubjectSaveOrUpdate(values).unwrap();
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
                        <label className="col-12 col-form-label">Subject <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="quiz_core_subject_id"
                                onChange={(e) => {
                                    formik.handleChange(e)
                                }}
                                onBlur={formik.handleBlur}
                                value={formik.values.quiz_core_subject_id}
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

export default memo(CreateQuizSubject)
    ;
