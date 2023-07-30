import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./QuizModal";
import { BsEyeFill } from "react-icons/bs";
import { useGetQuizListQuery } from "../../../services/contentApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { quizName } from "../../../features/commonSlice";

const QuizList = () => {
  const dispatch = useDispatch()
  const res = useGetQuizListQuery();
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
            <p>EN:
              <span className="text-success fw-normal"> {row.title}</span>
            </p>
            <p>BN:
              <span className="text-success fw-normal"> {row.title_bn}</span>
            </p></Link>
        </>,
        id: "title",
        header: "Quiz Name",
        size: 300,
      },

      {
        accessorKey: "duration",
        header: "Duration",
      },
      {
        accessorFn: (row) =>
          <>
            <p>Positive : <span className="text-success fw-bold">{row.positive_mark}</span> </p>
            <p>Negative : <span className="text-danger fw-bold">{row.negative_mark}</span> </p>

          </>,

        id: "marking",
        header: "Marking",
      },

      {
        accessorKey: "total_mark",
        header: "Total Mark",
      },
      {
        accessorKey: "number_of_question",
        header: "Question",
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
                      handelClickValue("Update Quiz");
                      setParam(row?.row?.original);
                    }}
                  >
                    <FaEdit size={16} /> Edit
                  </button>
                  <button
                    title=""
                    className="px-2 mx-1 d-flex align-items-center btn btn-info btn-sm"
                    onClick={() => {
                      dispatch(quizName({
                        name: row?.row?.original?.title, id: row?.row?.original?.id,
                        subject_id: row?.row?.original?.subject_id,  
                        class_level_id: row?.row?.original?.class_level_id,
                        chapter_id: row?.row?.original?.chapter_id,
                        chapter_quiz_id: row?.row?.original?.id,
                      }))
                    }}
                  >
                    <Link to={`/dashboard/globaladmin/quiz-question-list/${row?.row?.original?.id}`}><BsEyeFill size={17} /> QN </Link>

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




export default QuizList