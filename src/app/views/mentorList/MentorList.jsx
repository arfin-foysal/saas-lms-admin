import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit} from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./MentorModal";
import { useGetAllMentorQuery } from "../../../services/resourceApi";
const MentorList = () => {
  const res = useGetAllMentorQuery();
  const { data, isSuccess, isFetching, isError } = res;
  const [clickValue, setClickValue] = useState(null);
  const [param, setParam] = useState(null);
  const [size,setSize]=useState("lg")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  const columns = useMemo(
    () => [  
  
        {
          accessorKey: "name", 
          header: "Name",
        },
        {
          accessorKey: "username", 
          header: "Username",
        },
      {
        accessorFn: (row) =>
          row && (
            <>
              <span className=" fw-bolder">
              {row?.email}
              </span>
              <br/>
              <span className=" fw-bolder">
              {row?.contact_no}
              </span>
            </>
          ) ,

        id: "email",
        header: "Email",
        size: "10"
      },{
          accessorKey: "organization_slug", 
          header: "Organization",
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
      <PageTopHeader title="Mentor List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Mentor List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Mentor");
                setSize("xl")
              }}
            >
              <FiPlusCircle size={16} /> Add New Mentor
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
                        handelClickValue("Update Mentor");
                        setParam(row?.row?.original);
                        setSize("xl")
                      }}
                    >
                      <FaEdit size={16} /> Edit
                    </button>
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

export default MentorList