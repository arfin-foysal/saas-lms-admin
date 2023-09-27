import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit  } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./ContentSubjectAssignModal";
import { Link, useParams } from "react-router-dom";
import { useGetContentSubjectListQuery } from "../../../services/contentApi";
import { BsEyeFill } from "react-icons/bs";

const ContentSubjectAssignList = () => {
  const { id } = useParams()
  const res =useGetContentSubjectListQuery();
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
        accessorKey: "class_name",
        header: "Class",
        size: "5"
      },
      {
        accessorKey: "subject_name",
        header: "Subject",
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
      <PageTopHeader title="Subject Assign List " />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <p className="fw-bold text-muted">
          <span className="text-success fw-bold">Content :</span> {data?.data[0]?.content_name}
          </p>
          <div>
            <button
              className="btn btn-primary btn-sm mx-1 my-0"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Subject Assign");
                setParam(id)
                setSize("lg")
              }}
            >
              <FiPlusCircle size={16} /> New Subject Assign
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
                      setSize("md")
                      handleShow();
                      handelClickValue("Update Subject Assign");
                      setParam(row?.row?.original);
                    }}
                  >
                 <FaEdit size={18} />  Edit 
                  </button>
                  {/* <Link
                   className="px-2 d-flex mx-1 align-items-center btn btn-success btn-sm"
                    to={`/dashboard/schooladmin/content-outline-list/${row?.row?.original?.id}/${id}`}><BsEyeFill size={17} />  Outline
                  </Link> */}

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

export default ContentSubjectAssignList