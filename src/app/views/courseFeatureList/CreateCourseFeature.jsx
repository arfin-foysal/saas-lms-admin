import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";


import { memo } from 'react';
import OptionLoader from "../../components/OptionLoader";
import { useFeatureSaveOrUpdateMutation } from "../../../services/courseApi";
import { useState } from 'react';
const CreateCourseFeature = ({ handleClose, paramValue }) => {
    const [allFeature, setAllFeature] = useState([]);


    const [featureSaveOrUpdate, res] = useFeatureSaveOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            'title': "",
            'title_bn': '',
            'course_id': paramValue,


        },
        onSubmit: async (values, { resetForm }) => {
            const feature_Arr = JSON.stringify(allFeature);
            resetForm();
            if (values.course_id == 0) {
                toast.warn("Please Select Content");
                return;
            }
            try {
                const result = await featureSaveOrUpdate({ feature: feature_Arr }).unwrap();
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
        if (formik.values.title_bn == '') {

            toast.warn("Please Enter Bangla Title");
            return;
        }

        setAllFeature([...allFeature, formik.values])
        formik.setFieldValue('title', '');
        formik.setFieldValue('title_bn', '');


    }
    const handelDelete = (index) => {
        const newFaq = allFeature.filter((item, i) => i !== index);
        setAllFeature(newFaq);
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

                    <div className="form-group col-5 my-1">
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
                    <div className="form-group col-5 my-1">
                        <label className="col-12 col-form-label">Bangla Title</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Bangla Title"
                                type="text"
                                className="form-control"
                                name="title_bn"
                                value={formik.values.title_bn}
                                onChange={formik.handleChange}

                            />
                        </div>
                    </div>
        

                    <div className="form-group col-2 my-1">
                        <label className="col-12 col-form-label">Action</label>
                        <div className="col-12 mt-1">
                            <button
                                type="button"
                                className="btn btn-success btn-sm "
                                onClick={handelAdd}
                            >
                                Add
                            </button>

                        </div>
                    </div>



                    <div className="my-4">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Title</th>
                                    <th>Bangla Title</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allFeature?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.course_id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.title_bn}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handelDelete(index)}
                                            >
                                                Remove
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

export default memo(CreateCourseFeature);
