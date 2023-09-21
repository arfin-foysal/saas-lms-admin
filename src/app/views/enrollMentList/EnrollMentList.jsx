import React, { useCallback, useMemo, useRef, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./EnrollMentModal";
import { BiReset } from "react-icons/bi";
import Select from "react-select";
import { useFormik } from "formik";
import { useGetCourseListQuery, useGetEnrollmentListQuery } from "../../../services/courseApi";
const EnrollMentList = () => {
  const [clickValue, setClickValue] = useState(null);
  const [param, setParam] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  const formik = useFormik({
    initialValues: {
      courseId: "",
    },
    onSubmit: async (values, { resetForm }) => {
      res.refetch({
        class_id: values.classId?.id ? values.classId?.id : 0,
      });
    },
  });

  const courseList = useGetCourseListQuery();

  const res = useGetEnrollmentListQuery(
    formik.values.courseId?.id ? formik.values.courseId?.id : 0
  );

  const { data, isSuccess, isFetching, isError } = res;

  const reFetch = () => {
    res.refetch();
    formik.setFieldValue('courseId', '');

  };



  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => <>
          <span className=" fw-normal">
            {index + 1}
          </span>

        </>,
        id: "index",
        header: "SL",
        size: "10"
      },
      {
        accessorKey: "course_title",
        header: "Course",
      },
      {
        accessorKey: "student_name",
        header: "Student",
      },

      {
        accessorFn: (row) =>
          row?.is_active === true ? (
            <>
              <span className="badge bg-success">Active</span>
            </>
          ) : (
            <span className="badge bg-warning">Inactive</span>
          ),

        id: "Status",
        header: "Status",
      },

    ],
    []
  );

  return (
    <>
      {isFetching && <Loader />}
      <MenuModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramValue={param}
      />
      <PageTopHeader title="Enrollment List" />
      <form
        className="form-sample"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >

        <div className="card border shadow-lg ">
          <div className="card-header d-flex justify-content-between ">
            <div>Enrollment List</div>
            <div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  handleShow();
                  handelClickValue("Add New Enrollment");
                }}
              >
                <FiPlusCircle size={16} /> Add Free Enrollment
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            <MaterialReactTable
              renderTopToolbarCustomActions={() => (
                <div className="col-md-4 gap-1 d-flex justify-content-start ">
                  <Select
                    className="w-100"
                    isClearable
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    placeholder="Select Course"
                    isLoading={courseList?.isFetching}
                    onChange={(e) => {
                      formik.setFieldValue("courseId", e)
                    }}
                    getOptionLabel={option => option.title}
                    getOptionValue={option => option.id}
                    options={courseList?.data?.data}
                    name="courseId"
                    value={formik.values.courseId}
                  />


                  <div>
                    <BiReset
                      className="pointer  mt-2"
                      color="white"
                      size={25}
                      onClick={reFetch}
                    />
                  </div>
                </div>
              )}
              columns={columns}
              data={isSuccess ? data?.data : []}
              // enableRowActions
              enableColumnActions
              positionActionsColumn="last"
              muiTopToolbarProps={{
                style: {
                  backgroundColor: tableColor ? tableColor : "#0675F8",
                },
              }}
              // enablePagination="true"
              // renderRowActions={(row, index) => (
              //   <>
              //     <div className="d-flex">
              //       <button
              //         title=""
              //         className="px-2 mx-1 d-flex align-items-center btn btn-success btn-sm"
              //         onClick={() => {
              //           handleShow();
              //           handelClickValue("Update Enrollment");
              //           setParam(row?.row?.original);
              //         }}
              //       >
              //         <FaEdit size={16} /> Edit
              //       </button>
              //     </div>
              //     <div>
              //     </div>
              //   </>
              // )}
            />
          </div>
        </div>
      </form>
    </>
  );
};




export default EnrollMentList