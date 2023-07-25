import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Themes";
import MenuModal from "./ScriptContentModal";
import { BsEyeFill } from "react-icons/bs";
import { useGetScriptChapterListQuery } from "../../../services/contentApi";

const ScriptContentList = () => {
  const res = useGetScriptChapterListQuery();
  const { data, isSuccess, isFetching, isError } = res;
  const [clickValue, setClickValue] = useState(null);
  const [param, setParam] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  const columns = useMemo(
    () => [{
      accessorKey: "script_code",
      header: "Script Code",
    },
    {
      accessorKey: "title",
      header: "Title",
    },

    {
      accessorKey: "title_bn",
      header: "Title Bangla",
    },

    {
      accessorKey: "price",
      header: "Price",
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
      <PageTopHeader title="Script List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Script List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Script");
              }}
            >
              <FiPlusCircle size={16} /> Add New Script
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
                      handelClickValue("Update Script");
                      setParam(row?.row?.original);
                    }}
                  >
                    <FaEdit size={16} /> Edit
                  </button>

                  <button
                    title=""
                    className="px-2 mx-1 d-flex align-items-center btn btn-info btn-sm"
                    onClick={() => {
                      handleShow();
                      handelClickValue("Script Details");
                      setParam(row?.row?.original);
                    }}
                  >
                    <BsEyeFill size={16} /> Details
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




export default ScriptContentList