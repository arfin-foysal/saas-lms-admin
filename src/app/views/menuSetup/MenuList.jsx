import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from './../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit} from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./MenuModal";
import { useGetMenuListQuery } from "../../../services/masterSettingsApi";
const MenuList = () => {
  const res = useGetMenuListQuery();
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
    () => [
      {
        accessorKey: "name", 
        header: "Name",
      },

      {
        accessorKey: "link", 
        header: "Link",

      },
      {
        accessorFn: (row) =>
          row?.is_authentication_needed === true ? (
            <>
              <span className="badge bg-info">Yes</span>
            </>
          ) : (
            <span className="badge bg-secondary">No</span>
          ),

        id: "is_authentication_needed",
        header: "Authentication Needed",
      },
      {
        accessorFn: (row) =>
          row?.has_submenu === true ? (
            <>
              <span className="badge bg-info">Yes</span>
            </>
          ) : (
            <span className="badge bg-secondary">No</span>
          ),

        id: "has_submenu",
        header: "Sub Menu",
      },
      {
        accessorFn: (row) =>
          row && (
            <div className="ms-4">
              {row.is_content === true ?
                <span className="badge bg-info mr-1">Yes</span> :
                <span className="badge bg-secondary mr-1">No</span>
              }
              
              {row.is_course === true ?
                <span className="badge bg-info ms-1">Yes</span> :
                <span className="badge bg-secondary ms-1">No</span>
              }

            </div>
          ),

        id: " is_content & is_course ",
        header: "Content & Course",
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
      <PageTopHeader title="Menu List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Menu List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Menu");
              }}
            >
              <FiPlusCircle size={16} /> Add New Menu
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
                  <div className="mx-2">
                    <button
                      title=""
                      className="px-2 d-flex align-items-center btn btn-success btn-sm"
                      onClick={() => {
                        handleShow();
                        handelClickValue("Update Menu");
                        setParam(row?.row?.original);
                      }}
                    >
                      <FaEdit size={16} /> Edit
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

export default MenuList