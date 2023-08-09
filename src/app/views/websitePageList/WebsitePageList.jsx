import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./WebsitePageModal";
import { useParams } from 'react-router-dom';
import { useGetWebsitePageListQuery } from "../../../services/masterSettingsApi";
const WebsitePageList = () => {
  const { id } = useParams()
  const res = useGetWebsitePageListQuery(id);
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
        accessorKey: "organization_name",
        header: "Organization",
        size: "10"
      },
      {
        accessorKey: "page_title",
        header: "Title",
        size: "10"
      },
      {
     
        accessorFn: (row) => {
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: row?.page_details?.slice(0, 100) + "..."
                ,
              }}
            />
          );
        },
        header: "Page Details",
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
      />
      <PageTopHeader title="Page List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Page List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Page");
                setParam(id);
              }}
            >
              <FiPlusCircle size={16} /> Add New Page
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
                        handelClickValue("Update Page");
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




export default WebsitePageList