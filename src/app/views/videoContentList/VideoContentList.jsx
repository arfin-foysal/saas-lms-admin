import React, { useCallback, useMemo, useRef, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./VideoContentModal";
import { useGetChapterListBySubjectIdQuery, useGetClassListQuery, useGetSubjectListByClassIdQuery, useGetVideoChapterListQuery } from "../../../services/contentApi";
import { BsArrowRightShort, BsEyeFill } from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import Select from "react-select";
import { useFormik } from "formik";
const VideoContentList = () => {
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
  const res = useGetVideoChapterListQuery({
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
              {row?.class_name} <BsArrowRightShort /> {row?.subject_name} <BsArrowRightShort /> {row?.chapter_name}
            </span>
          </>
        ),
        id: "class",
        header: "Class - Subject - Chapter",
        size: 200
      },


      {
        accessorKey: "price",
        header: "Price",
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
      <form
        className="form-sample"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >

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
      </form>
    </>
  );
};




export default VideoContentList