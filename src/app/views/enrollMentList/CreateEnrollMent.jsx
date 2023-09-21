import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import { useCourseFreeEnrollmentMutation, useGetCourseListQuery, useGetStudentListQuery } from "../../../services/courseApi";
const CreateEnrollMent = ({ handleClose }) => {
    const courseRes = useGetCourseListQuery()
    const studentRes = useGetStudentListQuery()
    const [courseFreeEnrollment, res] = useCourseFreeEnrollmentMutation();
    const formik = useFormik({
        initialValues: {
            item_id: "",
            user_id: "",
            promo_id: null,
            is_active: true,
        },
        onSubmit: async (values, { resetForm }) => {
            resetForm();
            try {
                const data = {
                    item_id: values.item_id?.id ? values.item_id?.id : 0,
                    user_id: values.user_id?.user_id ? values.user_id?.user_id : 0,
                    promo_id: values.promo_id,
                    is_active: values.is_active,
                }
                const result = await courseFreeEnrollment(data).unwrap();
                toast.success(result.message);
            } catch (error) {
                toast.warn(error.data.message);
            }
        },
    });


    const handleChangeValue = (e) => { 
        formik.setFieldValue("user_id", "");
        formik.setFieldValue("promo_id", "");
        
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
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Course <span className=" text-danger">*</span></label>
                        <div className="col-12">
                  <Select
                    className="w-100"
                    isClearable
                    placeholder="Select Course"
                    isLoading={courseRes?.isFetching}
                    onChange={(e) => {
                      formik.setFieldValue("item_id", e)
                    handleChangeValue(e)
                    }}
                    getOptionLabel={option => option.title}
                    getOptionValue={option => option.id}
                    options={courseRes?.data?.data}
                    name="item_id"
                    value={formik.values.item_id}
                  />
                     
                        </div>
                    </div>
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Student <span className=" text-danger">*</span></label>
                        <div className="col-12">
                        <Select
                    className="w-100"
                    isClearable
                    placeholder="Select Student"
                    isLoading={studentRes?.isFetching}
                    onChange={(e) => {
                      formik.setFieldValue("user_id", e)
                    }}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.user_id}
                    options={studentRes?.data?.data}
                    name="user_id"
                    value={formik.values.user_id}
                  />
                        </div>
                    </div>
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Promo Code <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter promo Code"
                                type="number"
                                className="form-control"
                                name="promo_id"
                                onChange={formik.handleChange}
                                value={formik.values.promo_id}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group row col-12 my-2 ">
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

export default CreateEnrollMent;
