import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./CourseModal";
import { useGetCourseListQuery } from "../../../services/courseApi";
import moment from "moment";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
const CourseList = () => {
  const res = useGetCourseListQuery();
  const { data, isSuccess, isFetching, isError } = res;
  const [clickValue, setClickValue] = useState(null);
  const [param, setParam] = useState(null);
  const [size, setSize] = useState("lg")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

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
        accessorFn: (row) =>
          <>
            <span >
              En: {row?.title}
              <br />
              Bn: {row?.title_bn}
            </span>

          </>
        ,
        id: "course_name",
        header: "Course Name",
        size: "300"
      }
      ,


      {
        accessorKey: "category_name",
        header: "Menu / Category",
      },


      {
        accessorFn: (row) =>
          row?.appeared_from && (
            <>
              <span className=" fw-bolder">
                {moment(row.appeared_from).format("Do MMMM  YYYY hh:mm a")}
              </span>
            </>
          ),

        id: "appeared_from",
        header: "From",
        size: "10"
      },
      {
        accessorFn: (row) =>
          row?.appeared_to && (
            <>
              <span className=" fw-bolder">
                {moment(row.appeared_to).format(" Do MMMM YYYY hh:mm a")}
              </span>
            </>
          ),

        id: "appeared_to",
        header: "To",
        size: "10"
      },

      {
        accessorFn: (row) =>
          row?.is_free === true ? (
            <>
              <span className="badge bg-success">Yes</span>
            </>
          ) : (
            <span className="badge bg-warning">No</span>
          ),

        id: "is_free",
        header: "Is Free",
        size: "10"
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
        size: "10"
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
        size={size}
      />
      <PageTopHeader title="Course List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Course List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Course");
                setSize("lg")
              }}
            >
              <FiPlusCircle size={16} /> Add New Course
            </button>
          </div>
        </div>

        <div className="card-body p-0">
          <MaterialReactTable
            columns={columns}
            data={isSuccess ? data?.data : []}
            enableRowActions
            enableColumnActions

            positionActionsColumn="last"
            muiTopToolbarProps={{
              style: {
                backgroundColor: tableColor ? tableColor : "#0675F8",
              },
            }}
            // enablePagination="true"
            renderRowActions={(row, index) => (
              <>
                <div className="d-flex">

                  <button
                    title=""
                    className="px-2 mx-1 d-flex align-items-center btn btn-success btn-sm"
                    onClick={() => {
                      handleShow();
                      handelClickValue("Update Course");
                      setParam(row?.row?.original);
                      setSize("lg")
                    }}
                  >
                    <FaEdit size={16} className="me-1" /> Edit
                  </button>
      

                  <Link
                    className="px-2 d-flex mx-1 align-items-center btn btn-success btn-sm"
                    to={`/dashboard/globaladmin/course-outline-list/${row?.row?.original?.id}`}><BsEyeFill className="me-1"  size={17} /> Outline </Link>
                  <Link
                    className="px-2 d-flex mx-1 align-items-center btn btn-success btn-sm"
                    to={`/dashboard/globaladmin/course-faq-list/${row?.row?.original?.id}`}><BsEyeFill  className="me-1"  size={17} /> FAQ </Link>
                  <Link
                    className="px-2 d-flex mx-1 align-items-center btn btn-success btn-sm"
                    to={`/dashboard/globaladmin/course-feature-list/${row?.row?.original?.id}`}><BsEyeFill  className="me-1"  size={17} /> Feature </Link>
                  <Link
                    className="px-2 d-flex mx-1 align-items-center btn btn-success btn-sm"
                    to={`/dashboard/globaladmin/course-routine-list/${row?.row?.original?.id}`}><BsEyeFill  className="me-1"  size={17} /> Routine </Link>
                  <Link
                    className="px-2 d-flex mx-1 align-items-center btn btn-success btn-sm"
                    to={`/dashboard/globaladmin/course-mentor-assign-list/${row?.row?.original?.id}`}><BsEyeFill  className="me-1"  size={17} /> Mentor </Link>
                  <div>
                  </div>
                </div>
              </>
            )}
          />
        </div>
      </div>
    </>
  );
};




export default CourseList