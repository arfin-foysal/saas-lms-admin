import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./CourseOutlineModal";
import { confirmHandel } from "../../../utils/Alert";
import { toast } from "react-toastify";

import { useDeleteCourseOutlineMutation, useGetCourseListQuery, useGetCourseOutlineByCourseIdQuery } from "../../../services/courseApi";
import { useParams } from "react-router-dom";
const CourseOutlineList = () => {
  const {id}=useParams()
  const res = useGetCourseOutlineByCourseIdQuery(id);
  const { data, isSuccess, isFetching, isError } = res;
  const [deleteCourseOutline] = useDeleteCourseOutlineMutation()
  const courseRes = useGetCourseListQuery();
  const [clickValue, setClickValue] = useState(null);
  const [size, setSize] = useState("lg")
  const [param, setParam] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);


  const handelDelete = async (did) => {
    const result = await deleteCourseOutline(did).unwrap();
    toast.success(result.message);
  };
  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => <>
          <span className="text-success fw-normal">
            {index + 1}
          </span>

        </>,
        id: "index",
        header: "SL",
        size: "5"
      },
      {
        accessorFn: (row, index) => <>
          <span className="text-success fw-normal">
            EN: {row?.title}
            <br />
            BN: {row?.title_bn}
          </span>

        </>,

        accessorKey: "title",
        header: "Name",
        size: "300"
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
      <PageTopHeader title="Course Outline List " />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <p className="fw-bold text-muted">
            COURSE OUTLINE LIST ( {isSuccess &&
              data?.data[0]?.course_title} )
          
          </p>
          <div>

            <button
              className="btn btn-primary btn-sm mx-1 my-0"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Course Outline");
                setParam(id)
                setSize("lg")
              }}
            >
              <FiPlusCircle size={16} /> Add New Outline
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
                      setSize("lg")
                      handleShow();
                      handelClickValue("Update Course Outline");
                      setParam(row?.row?.original);
                    }}
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    title=""
                    className="px-2 mx-1 d-flex align-items-center btn btn-danger btn-sm"
                    onClick={() => {
                      confirmHandel(
                        "error",
                        "Delete",
                        "#FF0000",
                        row?.row?.original?.id,
                        handelDelete
                      )
                

                    }}>
                    <FaTrash size={14} />
                  </button>
                </div>
                <div>
                </div>
              </>
            )}
          />
        </div>
      </div>
    </>
  );
};




export default CourseOutlineList