import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { memo } from 'react';
import { useFaqSaveOrUpdateMutation } from "../../../services/courseApi";
import { useState } from 'react';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiSolidMinusCircle } from "react-icons/bi";
const CreateCourseFaq = ({ handleClose, paramValue }) => {
    const [allFaq, setAllFaq] = useState([]);


    const [faqSaveOrUpdate, res] = useFaqSaveOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            'title': "",
            'course_id': paramValue,
            'answer': '',
            'is_active': true
        },
        onSubmit: async (values, { resetForm }) => {
            const faq_Arr = JSON.stringify(allFaq);
            resetForm();
            if (values.course_id == 0) {
                toast.warn("Please Select Content");
                return;
            }
            try {
                const result = await faqSaveOrUpdate({ faq: faq_Arr }).unwrap();
                toast.success(result.message);
            } catch (error) {
                toast.warn(error.data.message);
            }
        },
    });

    const handelAdd = () => {

        if (formik.values.title == '') {
            toast.warn("Please Enter Title");
            return;
        }
        if (formik.values.answer == '') {

            toast.warn("Please Enter Answer");
            return;
        }

        setAllFaq([...allFaq, formik.values])
        formik.setFieldValue('title', '');
        formik.setFieldValue('answer', '');
    }
    const handelDelete = (index) => {
        const newFaq = allFaq.filter((item, i) => i !== index);
        setAllFaq(newFaq);
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

                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Answer</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter answer"
                                type="text"
                                className="form-control"
                                name="answer"
                                value={formik.values.answer}
                                onChange={formik.handleChange}

                            />
                        </div>
                    </div>
                    <div className="form-group  col-2 mt-1">
                        <label className="col-12 col-form-label">Is Active</label>
                        <div className="col-12">
                            <div className="form-check form-switch mt-2 ">
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
                    <div className="form-group col-2 my-1">
                        <label className="col-12 col-form-label">Action</label>
                        <div className="col-12 mt-1">
                            <span
                                type="button"
                                onClick={handelAdd}
                            >
                                 <BsFillPlusCircleFill size={20}
                                    color="green"
                                />
                            </span>
                        </div>
                    </div>
                    <div className="my-4">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Title</th>
                                    <th>Answer</th>
                                    <th>Is Active</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allFaq?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.course_id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.answer}</td>
                                        <td>{item.is_active ? 'Active' : 'Inactive'}</td>
                                        <td>
                                            <span
                                                type="button"
                                                onClick={() => handelDelete(index)}
                                            >
                                          <BiSolidMinusCircle color="red" size={24} /> 
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
export default memo(CreateCourseFaq);
