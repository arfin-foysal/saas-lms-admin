import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { memo } from 'react';
import {  useRoutineSaveOrUpdateMutation } from "../../../services/courseApi";
import { useState } from 'react';
import { FiPlusCircle } from "react-icons/fi";
import { MdRemoveCircleOutline } from "react-icons/md";
const CreateCourseRoutine = ({ handleClose, paramValue }) => {
    const [allRoutine, setAllRoutine] = useState([]);
    const [routineSaveOrUpdate, res] = useRoutineSaveOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            'day': "",
            'course_id': paramValue,
            'class_title': '',
            'is_note': true
        },
        onSubmit: async (values, { resetForm }) => {
            const routine_Arr = JSON.stringify(allRoutine);
            resetForm();
            if (values.course_id == 0) {
                toast.warn("Please Select course");
                return;
            }
            try {
                const result = await routineSaveOrUpdate({routine:routine_Arr}).unwrap();
                toast.success(result.message);
            } catch (error) {
                toast.warn(error.data.message);
            }
        },
    });


    const handelAdd = () => {
        if (formik.values.day == '') {
            toast.warn("Please Enter Title");
            return;
        }
        if (formik.values.class_title == '') {

            toast.warn("Please Enter Answer");
            return;
        }
        setAllRoutine([...allRoutine, formik.values])
        formik.setFieldValue('day', '');
        formik.setFieldValue('class_title', '');
    }
    const handelDelete = (index) => {
        const newFaq = allRoutine.filter((item, i) => i !== index);
        setAllRoutine(newFaq);
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
                        <label className="col-12 col-form-label">Day <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter day"
                                type="text"
                                className="form-control"
                                name="day"
                                onChange={formik.handleChange}
                                value={formik.values.day}
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Class Title</label>
                        <div className="col-12">
                            <input
                                placeholder="Class Title"
                                type="text"
                                className="form-control "
                                name="class_title"
                                value={formik.values.class_title}
                                onChange={formik.handleChange}
                        
                            />
                        </div>
                    </div>
                    <div className="form-group  col-2 mt-1">
                        <label className="col-12 col-form-label">Is Note</label>
                        <div className="col-12">
                            <div className="form-check form-switch ps-3 mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                          
                                    name="is_note"
                                    onChange={formik.handleChange}
                                    value={formik.values.is_note}
                                    checked={formik.values.is_note}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-2 my-1">
                        <label className="col-12 col-form-label">Action</label>
                        <div className="col-12 mt-1">
                            <button
                                type="button"
                                className="btn btn-success btn-sm"
                                onClick={handelAdd}
                            >
                          <FiPlusCircle size={16} /> Add
                            </button>

                        </div>
                    </div>

                    <div className="my-4">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Day</th>
                                    <th>Class Title</th>
                                    <th>Is Note</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allRoutine?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.day}</td>
                                        <td>{item.class_title}</td>
                                        <td>{item.is_note ?
                                            <span className="badge bg-success">Active</span>
                                            :
                                            <span className="badge bg-danger">Inactive</span>
                                        }
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handelDelete(index)}
                                            >
                                            <MdRemoveCircleOutline/> Remove
                                            </button>
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

export default memo(CreateCourseRoutine)
    ;
