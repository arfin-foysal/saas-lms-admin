import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { IoSyncCircle } from "react-icons/io5";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./ScriptContentModal";
import { BsArrowRightShort, BsEyeFill } from "react-icons/bs";
import { useGetChapterListQuery, useGetClassListQuery, useGetScriptChapterListQuery, useGetSubjectListQuery } from "../../../services/contentApi";
import Select from "react-select";
import { BiReset } from "react-icons/bi";

const ScriptContentList = () => {

  const classRes = useGetClassListQuery();
  const subjectRes = useGetSubjectListQuery();
  const chapterRes = useGetChapterListQuery();
 
  const [clickValue, setClickValue] = useState(null);
  const [param, setParam] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [classId, setClassId] = useState(0);
  const [subjectId, setSubjectId] = useState(0);
  const [chapterId, setChapterId] = useState(0);

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
      accessorKey: "title",
      header: "Title",
      },
    
      {
        accessorFn: (row) => (
          <>
            <span>
              {row?.class_name} <BsArrowRightShort/> {row?.subject_name} <BsArrowRightShort/> {row?.chapter_name}
            </span>
          </>
        ),
        id: "class",
        header: "Class - Subject - Chapter",
        size:200
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
  const res = useGetScriptChapterListQuery({
    class_id: classId,
    subject_id: subjectId,
    chapter_id: chapterId,

  });
  const { data, isSuccess, isFetching, isError } = res;
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
               renderTopToolbarCustomActions={() => (
                <div className="col-md-6 gap-1 d-flex justify-content-start ">
                  <Select
                    className="w-100"
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    placeholder="Select Class"
                    isLoading={classRes?.isFetching}
                  
                  onChange={(e) => setClassId(e.id)}
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) => `${option["title"]}`}
                    options={classRes?.data?.data}
                    // key={courseRes?.data?.data?.id}
                  />
                  <Select
                    className="w-100"
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    placeholder="Select Subject"
                    isLoading={subjectRes?.isFetching}
                    onChange={(e) => setSubjectId(e.id)}
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) => `${option["title"]}`}
                    options={subjectRes?.data?.data}
                    // key={courseRes?.data?.data?.id}
                  />
                  <Select
                    className="w-100"
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    placeholder="Select Chapter"
                    isLoading={chapterRes?.isFetching}
                     onChange={(e) => setChapterId(e.id)}
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) => `${option["title"]}`}
                    options={chapterRes?.data?.data}
                    // key={courseRes?.data?.data?.id}
                />
                <div>
                 <BiReset
                className="pointer  mt-2"
                color="white"
                size={25}
                onClick={res.refetch}
              />
              </div> 
                </div>
             
              
              )}
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