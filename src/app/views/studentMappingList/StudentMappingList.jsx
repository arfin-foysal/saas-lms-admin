import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./StudentMappingModal";
import { confirmHandel } from "../../../utils/Alert";
import { toast } from "react-toastify";
import {useGetStudentMappingListQuery } from "../../../services/courseApi";

const StudentMappingList = () => {
  const res = useGetStudentMappingListQuery();
  const { data, isSuccess, isFetching, isError } = res;
  const [clickValue, setClickValue] = useState(null);
  const [size, setSize] = useState("lg")
  const [param, setParam] = useState(null);
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
          <span >
            {index + 1}
          </span>

        </>,
        id: "index",
        header: "SL",
        size: "5"
      },

      {
        accessorKey: "course_title",
        header: "Course",
        size: "5"
      },

      {
        accessorKey: "mentor_name",
        header: "Mentor",
        size: "5"
      },
        {
          accessorKey: "student_name",
          header: "Student",
          size: "5"
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
        data={data?.data}
      />
      <PageTopHeader title="Student Mapping List " />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <p >Student Mapping List

          </p>
          <div>
            <button
              className="btn btn-primary btn-sm mx-1 my-0"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Student Mapping");
                // setParam(id)
                setSize("xl")
              }}
            >
              <FiPlusCircle size={16} /> New Student Mapping
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
                      handelClickValue("Update Student Mapping");
                      setParam(row?.row?.original);
                    }}
                  >
                    <FaEdit size={18} />
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

export default StudentMappingList