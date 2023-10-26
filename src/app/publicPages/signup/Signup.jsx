import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
// import { signupSchema } from "../../../validation/signupSchema";
import logo from "./../../../assets/logo/logo.png";
// import { useRegisterMutation } from "../../../services/authApi";
import { BsArrowRight } from "react-icons/bs";
const Signup = () => {
  const navigate = useNavigate();
//   const [register, res] = useRegisterMutation();
//   const { data, isLoading, isSuccess } = res;

  const formik = useFormik({
    // validationSchema: signupSchema,
    initialValues: {
      name: "",
      username: "",
      email: "",
      number: "",
      password: "",
      confirm_password: "",
    },

    onSubmit: async (values) => {
      try {
        // const result = await register(values).unwrap();
        // console.log(values);
        // toast.success(result.message);
      } catch (error) {
        toast.error(error.data.message);
      }
    },
  });

//   if (isSuccess) {
//     navigate("/login");
//     // window.location.reload(false);
//   }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 py-2  ">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col">
                  <div className="p-5">
                    <div>
                      {/* {isLoading && (
                        <div className="text-center">
                          <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )} */}
                    </div>

                    <div className="text-center pb-3">
                      <img src={logo} alt="" width={150} />
                    </div>
                    <form className="user" onSubmit={formik.handleSubmit}>
                      <div className="form-group row">
                        <div className="col-sm-6 py-2 mb-3 mb-sm-0">
                          <input
                            type="text"
                            placeholder="Enter Full Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                              formik.errors.name && formik.touched.name
                                ? "form-control form-control-user is-invalid  shadow"
                                : "form-control form-control-usershadow"
                            }
                          />
                          {formik.errors.name && formik.touched.name ? (
                            <div className="invalid-feedback">
                              {formik.errors.name}
                            </div>
                          ) : null}
                        </div>
                        <div className="col-sm-6 py-2">
                          <input
                            type="text"
                            placeholder="uaername"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                              formik.errors.username && formik.touched.username
                                ? "form-control form-control-user is-invalid  shadow"
                                : "form-control form-control-usershadow"
                            }
                          />
                          {formik.errors.username && formik.touched.username ? (
                            <div className="invalid-feedback">
                              {formik.errors.username}
                            </div>
                          ) : null}
                        </div>
                        <div className="col-sm-6 py-2">
                        <input
                          type="number"
                          placeholder="Enter Number"
                          name="number"
                          value={formik.values.number}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.errors.number && formik.touched.number
                              ? "form-control form-control-user is-invalid  shadow"
                              : "form-control form-control-usershadow"
                          }
                        />
                        {formik.errors.number && formik.touched.number ? (
                          <div className="invalid-feedback">
                            {formik.errors.number}
                          </div>
                        ) : null}
                        </div>
                        <div className="col-sm-6 py-2">
                        <input
                          type="email"
                          placeholder="Email Address"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.errors.email && formik.touched.email
                              ? "form-control form-control-user is-invalid  shadow"
                              : "form-control form-control-usershadow"
                          }
                        />
                        {formik.errors.email && formik.touched.email ? (
                          <div className="invalid-feedback">
                            {formik.errors.email}
                          </div>
                        ) : null}
                        </div>
                      </div>
           
                

                      <div className="form-group row ">
                        <div className="col-sm-6 py-2 mb-3 mb-sm-0">
                          <input
                            type="password"
                            id="exampleInputPassword"
                            placeholder="Password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                              formik.errors.password && formik.touched.password
                                ? "form-control form-control-user is-invalid  shadow"
                                : "form-control form-control-usershadow"
                            }
                          />
                          {formik.errors.password && formik.touched.password ? (
                            <div className="invalid-feedback">
                              {formik.errors.password}
                            </div>
                          ) : null}
                        </div>
                        <div className="col-sm-6 py-2">
                          <input
                            type="password"
                            id="exampleRepeatPassword"
                            placeholder="Confirm Password"
                            name="confirm_password"
                            value={formik.values.confirm_password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                              formik.errors.confirm_password &&
                              formik.touched.confirm_password
                                ? "form-control form-control-user is-invalid  shadow"
                                : "form-control form-control-usershadow"
                            }
                          />
                          {formik.errors.confirm_password &&
                          formik.touched.confirm_password ? (
                            <div className="invalid-feedback">
                              {formik.errors.confirm_password}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="form-group pt-3 text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                        >
                          SignUp
                          <BsArrowRight />
                        </button>
                      </div>
                    </form>

             
                    <div className="text-center pt-2">
                      <Link className="small text-dark" to="/login">
                        Already have an account? Login!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
