import React, { useCallback, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./DetailsModal";
import { BsEyeFill } from "react-icons/bs";
import {  useGetCoursePaymentListByCourseIdQuery } from "../../../services/courseApi";
const PurchaseList = () => {

  const [clickValue, setClickValue] = useState(null);
  const [param, setParam] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const res = useGetCoursePaymentListByCourseIdQuery(0);
  const { data, isSuccess, isFetching, isError } = res;
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
        accessorKey: "course_name",
        header: "Course",
      },
      {
        accessorKey: "name",
        header: "Student",
      },
     
      {
        accessorKey: "item_price",
        header: "Price",
      },
      {
        accessorKey: "discount",
        header: "Discount",
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

      <div className="card border shadow-lg ">
     

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
                    className="px-2 mx-1 d-flex align-items-center btn btn-info btn-sm"
                    onClick={() => {
                      handleShow();
                      handelClickValue("Purchase Details");
                      setParam(row?.row?.original);

                    }}
                  >
                    <BsEyeFill size={16} className="me-1" /> Details
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

export default PurchaseList