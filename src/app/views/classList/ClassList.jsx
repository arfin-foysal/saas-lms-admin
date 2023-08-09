import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit} from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./CLassModal";
import { useGetClassListQuery } from "../../../services/contentApi";
const ClassList = () => {
  const res = useGetClassListQuery();
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
        accessorFn: (row, index) => <>
          <span >
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
            {row?.name}
            </span>
          </>
        ,
        id: "name",
        header: "Name",
     
      },
      {
        accessorKey: "price", 
        header: "Price",

      },
      {
        accessorFn: (row) =>
          row?.is_free === true ? (
            <>
              <span className="badge bg-info">Yes</span>
            </>
          ) : (
            <span className="badge bg-secondary">No</span>
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
      <PageTopHeader title="Class List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Class List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Class");
              }}
            >
              <FiPlusCircle size={16} /> Add New Class
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
                        handelClickValue("Update Class");
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
export default ClassList