import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./VideoContentModal";
import {  useGetClassListQuery, useGetVideoChapterListQuery } from "../../../services/contentApi";
import { BsEyeFill } from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import Select from "react-select";
import { useGetCourseListQuery } from "../../../services/courseApi";
const AssignmentList = () => {
  const courseRes = useGetCourseListQuery();
  const [clickValue, setClickValue] = useState(null);
  const [param, setParam] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [classId, setClassId] = useState(0);
  const [subjectId, setSubjectId] = useState(0);
  const [chapterId, setChapterId] = useState(0);
  const res = useGetVideoChapterListQuery({
    class_id: classId?.id?classId?.id:0,
    subject_id: subjectId?.id?subjectId?.id:0,
    chapter_id: chapterId?.id?chapterId?.id:0,
  });

  const { data, isSuccess, isFetching, isError } = res;
  const reFetch = () => {
    res.refetch();
    setClassId(0);
    setSubjectId(0);
    setChapterId(0);
  };

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
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "student",
        header: "Student",
      },
      {
        accessorKey: "Deadline",
        header: "deadline",
      },
      {
        accessorFn: (row, index) => <>
          {/* status */}
          <span className="badge bg-success">Active</span>
        </>,
        id: "status",
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
      />
      <PageTopHeader title="Assignment List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Assignment List</div>
        </div>

        <div className="card-body p-0">
          <MaterialReactTable
            renderTopToolbarCustomActions={() => (
              <div className="col-md-4 gap-1 d-flex justify-content-start ">
                <Select
                  isClearable
                  className="w-100"
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  placeholder="Select Course"
                  isLoading={courseRes?.isFetching}
                  onChange={(e) => {
                    setClassId(e)
                  }}
                  getOptionValue={(option) => `${option["id"]}`}
                  getOptionLabel={(option) => `${option["title"]}`}
                  options={courseRes?.data?.data}
                  key={courseRes?.data?.data?.id}
                  name="class_id"
                  value={courseRes?.data?.data?.id}
                />

                <div>
                  <BiReset
                    className="pointer  mt-2"
                    color="white"
                    size={25}
                    onClick={reFetch}
                  />
                </div>
              </div>
            )}
            columns={columns}
            data={[
              {
                name: "Bangla 1st Paper: 1st Chapter",
                student: "Fahim Ahmed",
                Deadline: "01 August 2023 , 5.00 PM",
              },

             
      

            ]}
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
                      handelClickValue("Assignment Details");
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

export default AssignmentList