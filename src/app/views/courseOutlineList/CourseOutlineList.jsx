import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./CourseOutlineModal";
import { useDeleteQuestionMutation } from "../../../services/contentApi";

import { confirmHandel } from "../../../utils/Alert";
import { toast } from "react-toastify";
import Select from 'react-select'
import { useGetCourseListQuery, useGetCourseOutlineByCourseIdQuery } from "../../../services/courseApi";


const CourseOutlineList = () => {
  const [id, setId] = useState(null);
  const res = useGetCourseOutlineByCourseIdQuery(id);
  const { data, isSuccess, isFetching, isError } = res;
  const [deleteQuestion] = useDeleteQuestionMutation()
  const courseRes = useGetCourseListQuery()



  const [clickValue, setClickValue] = useState(null);
  const [size, setSize] = useState("lg")
  const [param, setParam] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);


  const handelDelete = async (id) => {
    const result = await deleteQuestion(id).unwrap();
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
        accessorKey: "subject_name",
        header: "Subject",
        size: "5"
      },
      {
        accessorFn: (row, index) => <>
          <span className="text-success fw-normal">
            EN: {row?.question_text}
            <br />
            BN: {row?.question_text_bn}
          </span>

        </>,

        accessorKey: "question_text",
        header: "Question",
        size: "300"
      },
      {
        accessorKey: "option1",
        header: "Option 01",
      },
      {
        accessorKey: "option2",
        header: "Option 02",
      },
      {
        accessorKey: "option3",
        header: "Option 03",
      },
      {
        accessorKey: "option4",
        header: "Option 04",
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
      <PageTopHeader title="Quiz Questions" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <p className="fw-bold text-muted"></p>
          <div>

            <button
              className="btn btn-primary btn-sm mx-1 my-0"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Question");
                setParam(id)
                setSize("lg")
              }}
            >
              <FiPlusCircle size={16} /> Add New Questions
            </button>

          </div>
        </div>

        <div className="card-body p-0">
          <MaterialReactTable
            renderTopToolbarCustomActions={() => (
              <div className="col-md-3 d-flex justify-content-start ">
                <Select
                  className="w-100"
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  placeholder="Select Course"
                  isLoading={courseRes?.isFetching}
                  onChange={(e) => setId(e.id)}
                  getOptionValue={(option) => `${option["id"]}`}
                  getOptionLabel={(option) => `${option["title"]}`}
                  options={courseRes?.data?.data}
                  key={courseRes?.data?.data?.id}
                 
         
                />
                {/* <IoSyncCircle
                    className="cursor mt-2 ms-1"
                    color="white"
                    size={25}
                    onClick={() => refatchClick()}
                  /> */}
              </div>
            )}
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
                      handelClickValue("Update Question");
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