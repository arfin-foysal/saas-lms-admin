import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./QuizModal";
import { BsArrowRightShort, BsEyeFill } from "react-icons/bs";
import { useGetChapterListQuery, useGetClassListQuery, useGetQuizListQuery, useGetSubjectListQuery } from "../../../services/contentApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { quizName } from "../../../features/commonSlice";
import { BiReset } from "react-icons/bi";
import Select from "react-select";

const QuizList = () => {
  const classRes = useGetClassListQuery();
  const subjectRes = useGetSubjectListQuery();
  const chapterRes = useGetChapterListQuery();
  const dispatch = useDispatch()
  const [clickValue, setClickValue] = useState(null);
  const [param, setParam] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [classId, setClassId] = useState(0);
  const [subjectId, setSubjectId] = useState(0);
  const [chapterId, setChapterId] = useState(0);

  const reFetch = () => {
    res.refetch();
    setClassId(0);
    setSubjectId(0);
    setChapterId(0);
  };
  const res = useGetQuizListQuery({
    class_id: classId?.id?classId?.id:0,
    subject_id: subjectId?.id?subjectId?.id:0,
    chapter_id: chapterId?.id?chapterId?.id:0,
  });
  const { data, isSuccess, isFetching, isError } = res;
  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => <>
          <span className="text-success fw-normal">
            {index + 1}
          </span>

        </>,
        id: "index",
        header: "SL",
        size: "10"
      },
      {
        accessorFn: (row) => <>
          <Link className="text-dark" to={`/dashboard/globaladmin/quiz-question-list/${row?.id}`}>
            <p>En:
              <span > {row.title}</span>
            </p>
            <p>Bn:
              <span > {row.title_bn}</span>
            </p></Link>
        </>,
        id: "title",
        header: "Quiz",
        size: 300,
      },
      {
        accessorFn: (row) => (
          <>
            <span>
              {row?.class_name} <BsArrowRightShort /> {row?.subject_name} <BsArrowRightShort /> {row?.chapter_name}
            </span>
          </>
        ),
        id: "class",
        header: "Class - Subject - Chapter",
        size: 200
      },

      {
        accessorKey: "duration",
        header: "Duration",
        size:"10"
      },
      {
        accessorFn: (row) =>
          <>
            <p>Positive : <span className="text-success fw-bold">{row.positive_mark}</span> </p>
            <p>Negative : <span className="text-danger fw-bold">{row.negative_mark}</span> </p>

          </>,

        id: "marking",
        header: "Marking",
        size:"10"
      },

      {
        accessorKey: "total_mark",
        header: "Total Mark",
        size:"10"
      },
      {
        accessorKey: "number_of_question",
        header: "Question",
        size:"10"
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
        size:"10"
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
        size:"10"
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
      <PageTopHeader title="Quiz List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Quiz List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Quiz");
              }}
            >
              <FiPlusCircle size={16} /> Add New Quiz
            </button>
          </div>
        </div>

        <div className="card-body p-0">
          <MaterialReactTable
            renderTopToolbarCustomActions={() => (
              <div className="col-md-6 gap-1 d-flex justify-content-start ">
                <Select
                  className="w-100"
                  isClearable
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  placeholder="Select Class"
                  isLoading={classRes?.isFetching}
                  onChange={(e) => setClassId(e)}
                  getOptionValue={(option) => `${option["id"]}`}
                  getOptionLabel={(option) => `${option["name"]}`}
                  options={classRes?.data?.data}
                  key={classRes?.data?.data?.id}
                  name="class_id"
                  value={classRes?.data?.data?.id}
                />
                <Select
                  className="w-100"
                  isClearable
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  placeholder="Select Subject"
                  isLoading={subjectRes?.isFetching}
                  onChange={(e) => setSubjectId(e)}
                  getOptionValue={(option) => `${option["id"]}`}
                  getOptionLabel={(option) => `${option["name"]}`}
                  options={subjectRes?.data?.data}
                  key={subjectRes?.data?.data?.id}
                  name="subject_id"
                  value={subjectRes?.data?.data?.id}
                />
                <Select
                  className="w-100"
                  isClearable
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  placeholder="Select Chapter"
                  isLoading={chapterRes?.isFetching}
                  onChange={(e) => setChapterId(e)}
                  getOptionValue={(option) => `${option["id"]}`}
                  getOptionLabel={(option) => `${option["name"]}`}
                  options={chapterRes?.data?.data}
                  name="chapter_id"
                  key={chapterRes?.data?.data?.id}
                  value={chapterRes?.data?.data?.id}
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
                    className="px-2 d-flex mx-1 align-items-center btn btn-success btn-sm"
                    onClick={() => {
                      handleShow();
                      handelClickValue("Update Quiz");
                      setParam(row?.row?.original);
                    }}
                  >
                    <FaEdit size={16} /> Edit
                  </button>

                  <Link
                    title=""
                    className="px-2 d-flex mx-1 align-items-center btn btn-success btn-sm"
                    onClick={() => {
                      dispatch(quizName({
                        name: row?.row?.original?.title, id: row?.row?.original?.id,
                        subject_id: row?.row?.original?.subject_id,
                        class_level_id: row?.row?.original?.class_level_id,
                        chapter_id: row?.row?.original?.chapter_id,
                        chapter_quiz_id: row?.row?.original?.id,
                      }))
                    }}
                    to={`/dashboard/globaladmin/quiz-question-list/${row?.row?.original?.id}`}><BsEyeFill size={17} /> QN </Link>
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




export default QuizList