import React from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { usePasswordResetMutation } from "../../../services/authApi";


const PasswordUpdate = ({ handleClose, paramValue }) => {
  const [passwordReset] = usePasswordResetMutation();
  const formik = useFormik({
    initialValues: {
      new_password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await passwordReset({
          id: paramValue?.user_id,
          new_password: values?.new_password,
        }).unwrap();
        if (result.status) {
          resetForm();
          handleClose();
        }
        toast.success(result.message);
      } catch (error) {
        toast.error(error.data.message);
      }
    },
  });

  return (
    <>
<div>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group ">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  name="new_password"
                  onChange={formik.handleChange}
                  value={formik.values.new_password}
                  required
                />
              </div>
              <Modal.Footer className=" border-0">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-warning btn-sm">
                  Update Password
                </button>
              </Modal.Footer>
            </form>
          </div>
    </>
  );
};

export default PasswordUpdate;
