import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./QuizQuestionModal";
import {useDeleteQuestionMutation, useGetQuestionListByQuizQuery } from "../../../services/contentApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BiUpload } from "react-icons/bi";
import { confirmHandel } from "../../../utils/Alert";
import { toast } from "react-toastify";
import { BsArrowRightShort } from "react-icons/bs";

const QuizQuestionList = () => {
  const { id } = useParams()
  const qn = useSelector((state) => state.common.quiz);
  const res = useGetQuestionListByQuizQuery(id);
  const { data, isSuccess, isFetching, isError } = res;
  const [deleteQuestion] =useDeleteQuestionMutation ()
  const [clickValue, setClickValue] = useState(null);
  const [size, setSize] = useState("lg")
  const [param, setParam] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  const handelDelete = async (value) => {
    const result = await deleteQuestion(
      {
        id: value?.id,
        chapter_quiz_id: value?.chapter_quiz_id,
        class_level_id: value?.class_level_id,
        subject_id: value?.subject_id,
        chapter_id: value?.chapter_id,
      }
    ).unwrap();
    toast.success(result.message);
  };
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
        accessorFn: (row, index) => <>
          <span>
            En: {row?.question_text}
            <br />
            Bn: {row?.question_text_bn}
          </span>

        </>,


        accessorKey: "question_text",
        header: "Question",
        size: "300"
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
        accessorKey: "question_set_name",
        header: "Set",
        size: "5"
      },
      {
        accessorKey: "option1",
        header: "Option 01",
      },
      {
        accessorKey: "option2",
        header: "Option 02",
      },
      {
        accessorKey: "option3",
        header: "Option 03",
      },
      {
        accessorKey: "option4",
        header: "Option 04",
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
      />
      <PageTopHeader title="Quiz Questions" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <p className="fw-bold text-muted">QUESTION LIST ( {qn?.name} )</p>
          <div>
            <button
              className="btn btn-primary btn-sm mx-1"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Question");
                setParam(id)
                setSize("lg")
              }}
            >
              <FiPlusCircle size={16} /> Add New Questions
            </button>
            <button
              className="btn btn-primary btn-sm mx-1"
              onClick={() => {
                handleShow();
                handelClickValue("Upload Questions using XLSX");
                setSize("md")
                setParam(id)
              }}
            >
              <BiUpload size={16} /> Upload Question
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
                      setSize("lg")
                      handleShow();
                      handelClickValue("Update Question");
                      setParam(row?.row?.original);
                    }}
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    title=""
                    className="px-2 mx-1 d-flex align-items-center btn btn-danger btn-sm"
                    onClick={() => {
                      confirmHandel(
                        "error",
                        "Delete",
                        "#FF0000",
                        row?.row?.original,
                        handelDelete
                      )

                    }}>
                    <FaTrash size={14} />
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




export default QuizQuestionList