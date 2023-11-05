import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit } from "react-icons/fa";
import { FcUnlock } from "react-icons/fc";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./StudentModal";
import { useGetAllStudentQuery } from "../../../services/resourceApi";
const StudentList = () => {
  const res = useGetAllStudentQuery();
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
        accessorKey: "student_id", 
        header: "Student ID",
    },

        {
          accessorKey: "name", 
          header: "Name",
      },
  
        
        {
          accessorKey: "username", 
          header: "Username",
      },
      {
        accessorKey: "contact_no", 
        header: "Contact no",
      },
      {
        accessorFn: (row) =>
          row?.status && (
            <>
                { row?.status === "Active" && (
                   <span className="badge bg-success">Active</span>
                )}
                { row?.status === "Pending" && (
                <span className="badge bg-warning">Pending</span>
                )}
                { row?.status === "Suspended" && (
                <span className="badge bg-secondary">Suspended</span>
                )}
                { row?.status === "On-Hold" && (
                <span className="badge bg-danger">On-Hold</span>
                )}
            </>
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
      <PageTopHeader title="Student List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Student List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Student");
                setSize("xl")
              }}
            >
              <FiPlusCircle size={16} /> Add New Student
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
                        handelClickValue("Update Student");
                        setParam(row?.row?.original);
                        setSize("xl")
                      }}
                    >
                      <FaEdit size={16} /> Edit
                  </button>
                  <div>
                    <button
                      onClick={() => {
                        handleShow();
                        handelClickValue("Password Reset");
                        setParam(row?.row?.original);
                        setSize("sm")
                      }}
                      className="px-2 d-flex align-items-center btn btn-warning btn-sm"
                    >
                  <FcUnlock />  Reset
                    </button>
                  </div>
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

export default StudentList