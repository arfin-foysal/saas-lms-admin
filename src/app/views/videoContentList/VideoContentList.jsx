import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Themes";
import MenuModal from "./VideoContentModal";
import { useGetVideoChapterListQuery } from "../../../services/contentApi";
import { BsEyeFill } from "react-icons/bs";
const VideoContentList = () => {
  const res = useGetVideoChapterListQuery();
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
      accessorKey: "video_code",
      header: "Video Code",
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
      <PageTopHeader title="Video List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Video List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Video");
              }}
            >
              <FiPlusCircle size={16} /> Add New Video
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
                      handelClickValue("Update Video");
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
                      handelClickValue("Video Details");
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




export default VideoContentList