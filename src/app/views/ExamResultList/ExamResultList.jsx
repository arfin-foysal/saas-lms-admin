import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./ExamResultModal";
import {  useGetClassListQuery, useGetVideoChapterListQuery } from "../../../services/contentApi";
import { BsEyeFill } from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import Select from "react-select";
const ExamResultList = () => {
  const classRes = useGetClassListQuery();
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
        accessorKey: "title",
        header: "Exam Name",
      },
      {
        accessorKey: "title",
        header: "Participate Student",
      },
      {
        accessorKey: "title",
        header: "Date Of Participate",
      },
      {
        accessorKey: "title",
        header: "Score",
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
      <PageTopHeader title="Exam Result List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Exam Result List</div>
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
                  placeholder="Select Quiz"
                  isLoading={classRes?.isFetching}
                  onChange={(e) => {
                    setClassId(e)
                  }}
                  getOptionValue={(option) => `${option["id"]}`}
                  getOptionLabel={(option) => `${option["name"]}`}
                  options={classRes?.data?.data}
                  key={classRes?.data?.data?.id}
                  name="class_id"
                  value={classRes?.data?.data?.id}
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
                title: "Bangla Quiz 01",
                student: "12",
                date: "01 August 2023, 01:23 PM",
                score: "12.00",
              },
              {
                title: "Bangla Quiz 02",
                student: "12",
                date: "01 August 2023, 01:23 PM",
                score: "11.00",
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
                      handelClickValue("Exam Result Details");
                      setParam(row?.row?.original);

                    }}
                  >
                    <BsEyeFill size={16} className="me-1"/> Details
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

export default ExamResultList