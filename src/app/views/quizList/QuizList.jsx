import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./QuizModal";
import { BsArrowRightShort, BsDot, BsEyeFill } from "react-icons/bs";
import { useGetChapterListBySubjectIdQuery, useGetClassListQuery, useGetQuizListQuery, useGetSubjectListByClassIdQuery,  } from "../../../services/contentApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { quizSet } from "../../../features/commonSlice";
import { BiReset } from "react-icons/bi";
import Select from "react-select";
import { useFormik } from "formik";

const QuizList = () => {
  const dispatch = useDispatch()
  const [clickValue, setClickValue] = useState(null);
  const [param, setParam] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  const formik = useFormik({
    initialValues: {
      classId: "",
      subjectId: "",
      chapterId: "",
    },
    onSubmit: async (values, { resetForm }) => {
      res.refetch({
        class_id: values.classId?.id ? values.classId?.id : 0,
        subject_id: values.subjectId?.id ? values.subjectId?.id : 0,
        chapter_id: values.chapterId?.id ? values.chapterId?.id : 0,
      });
    },
  });

  const classRes = useGetClassListQuery();
  const subjectRes = useGetSubjectListByClassIdQuery(
    formik.values.classId?.id ? formik.values.classId?.id : 0
  );
  const chapterRes = useGetChapterListBySubjectIdQuery(
    formik.values.subjectId?.id ? formik.values.subjectId?.id : 0
  );

  const res = useGetQuizListQuery({
    class_id: formik.values.classId?.id ? formik.values.classId?.id : 0,
    subject_id: formik.values.subjectId?.id ? formik.values.subjectId?.id : 0,
    chapter_id: formik.values.chapterId?.id ? formik.values.chapterId?.id : 0,
  });
  const { data, isSuccess, isFetching, isError } = res;

  const reFetch = () => {
    res.refetch();
    formik.setFieldValue('subjectId', '');
    formik.setFieldValue('chapterId', '');
  };

  const handleChangeValue = (e) => {
    formik.setFieldValue('subjectId', '');
    formik.setFieldValue('chapterId', '');
  }
  const handleChangeValue1 = (e) => {
    formik.setFieldValue('chapterId', '');
  }


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
          row?.sufficient_question === true ? (
            <>
              <span ><BsDot color="green" size={40}/></span>
            </>
          ) : (
            <span ><BsDot color="red" size={40}/></span>
          ),

        id: "sufficient_question",
        header: "QTN Status",
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
      <from
        className="form-sample"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data">
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
                    onChange={(e) => {
                      formik.setFieldValue("classId", e)
                      handleChangeValue(e)
                    }}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    options={classRes?.data?.data}
                    name="classId"
                    value={formik.values.classId}
                  />

                  <Select
                    className="w-100"
                    isClearable
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    placeholder="Select Subject"
                    isLoading={subjectRes?.isFetching}
                    onChange={(e) => {
                      formik.setFieldValue("subjectId", e)
                      handleChangeValue1(e)
                    }
                    }
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    options={subjectRes?.data?.data}
                    name="subjectId"
                    value={formik.values.subjectId}

                  />
                  <Select
                    className="w-100"
                    isClearable
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    placeholder="Select Chapter"
                    isLoading={chapterRes?.isFetching}
                    onChange={(e) => {
                      formik.setFieldValue("chapterId", e)
                    }}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    options={chapterRes?.data?.data}
                    name="chapterId"
                    value={formik.values.chapterId}
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
                    to={`/dashboard/schooladmin/quiz-subject-list/${row?.row?.original?.id}`}><BsEyeFill className="me-1" size={17} /> Subject </Link>
                  <Link
                    title=""
                    className="px-2 d-flex mx-1 align-items-center btn btn-success btn-sm"
                    onClick={() => {
                      dispatch(quizSet({
                        name: row?.row?.original?.title, id: row?.row?.original?.id,
                        subject_id: row?.row?.original?.subject_id,
                        class_level_id: row?.row?.original?.class_level_id,
                        chapter_id: row?.row?.original?.chapter_id,
                        chapter_quiz_id: row?.row?.original?.id,
                      }))
                    }}
                    to={`/dashboard/schooladmin/quiz-question-list/${row?.row?.original?.id}`}><BsEyeFill className="me-1" size={17} /> Question </Link>
                </div>
                <div>
                </div>
              </>
            )}
          />
        </div>
        </div>
      </from>
    </>
  );
};




export default QuizList