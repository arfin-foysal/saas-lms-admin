import React, { useMemo } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { tableColor } from "../../../utils/Theme";
import { BsArrowRightShort } from "react-icons/bs";
import Select from "react-select";
import { useFormik } from "formik";
import { useGetCompletedClassListQuery, useGetCourseListQuery } from "../../../services/courseApi";
import { useGetCourseListForFilterQuery, useGetMentorListForFilterQuery, useGetStudentListForFilterByMentorQuery } from "../../../services/commonApi";
import moment from "moment";
import { BiTime } from "react-icons/bi";

const CompletedClassListReport = () => {
  const formik = useFormik({
    initialValues: {
      courseId: 0,
      mentorId:0,
      studentId:0,
      from: "",
      to: "",
    },
    onSubmit: async (values, { resetForm }) => {
      res.refetch({
        mentor_id: values.mentorId?.id ? values.mentorId?.id : 0,
        student_id: values.studentId?.id ? values.studentId?.id : 0,

      });
    },
  });

  const courseRes = useGetCourseListForFilterQuery();  
  const mentorRes = useGetMentorListForFilterQuery(
    { course_id: formik.values.courseId?.id ? formik.values.courseId?.id : 0 }
  );
  const studentRes = useGetStudentListForFilterByMentorQuery({
    mentor_id: formik.values.mentorId?.id ? formik.values.mentorId?.id : 0,
  }

  );

  const res = useGetCompletedClassListQuery({
    course_id: formik.values.courseId?.id ? formik.values.courseId?.id : 0,
    mentor_id: formik.values.mentorId?.id ? formik.values.mentorId?.id : 0,
    student_id: formik.values.studentId?.id ? formik.values.studentId?.id : 0,
    from: formik.values.from,
    to: formik.values.to,
  });
  const { data, isSuccess, isFetching, isError } = res;


  const handleChangeValue0 = (e) => {
    formik.setFieldValue('mentorId', '');
    // formik.setFieldValue('studentId', '');
    formik.setFieldValue('from', '');
    formik.setFieldValue('to', '');
  }
  const handleChangeValue = (e) => {
    // formik.setFieldValue('studentId', '');
    formik.setFieldValue('from', '');
    formik.setFieldValue('to', '');
 
  }
  const handleChangeValue1 = (e) => {
    formik.setFieldValue('from', '');
    formik.setFieldValue('to', '');
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
        accessorFn: (row) => (
          <>
            <span>
              {row?.course_title} <BsArrowRightShort /> {row?.mentor_name} <BsArrowRightShort /> {row?.student_name}
            </span>
          </>
        ),
        id: "class",
        header: "Course  - Mentor - Student",
        size: 200
      },
      {
        accessorFn: (row) => (
          <>
            <span>
              {moment(row?.schedule_datetime).format("MMMM Do YYYY, h:mm a")}

            </span>
          </>
        ),
        id: "schedule_datetime",
        header: "date",
        size: 200
      },
      {
        accessorFn: (row) => (
          <>
            <span>
              {moment(row?.start_time).format("MMMM Do YYYY, h:mm a")}

            </span>
          </>
        ),
        id: "start_time",
        header: "Start",
        size: 200
      },
      {
        accessorFn: (row) => (
          <>
            <span>
              {moment(row?.end_time).format("MMMM Do YYYY, h:mm a")}

            </span>
          </>
        ),
        id: "end_time",
        header: "End",
        size: 200
      },

      {
        accessorFn: (row) => (
          <>
            <span>
              {row?.total_minutes}
            </span>
          </>
        ),
        id: "total_minutes",
        header: "Total ( Min )",
        size: 200
      }



    ],
    []
  );

  return (
    <>
      {isFetching && <Loader />}
      <PageTopHeader title="Completed Class List" />
      <form
        className="form-sample"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className="card border shadow-lg ">
          <div className="card-header d-flex justify-content-between ">
            <div>Completed Class List</div>
            <div className="text-white  fs-6 bg-danger badge ">
              {
                data?.data?.total_time && (
                  <div >
                    <BiTime size="18" /> <span className="mt-2">
                      Total Time :  {data?.data?.total_time}
                    </span>
                  </div>
                )
              }
            </div>
          </div>

          <div className="card-body p-0">
            <MaterialReactTable
              renderTopToolbarCustomActions={() => (
             
                  <div className="col-8 gap-1 d-flex justify-content-start ">
                    <Select
                      className="w-100"
                      isClearable
                      menuPortalTarget={document.body}
                      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                      placeholder="Select Course"
                      isLoading={courseRes?.isFetching}
                      onChange={(e) => {
                        formik.setFieldValue("courseId", e)
                        handleChangeValue0(e)
                      }}
                      getOptionLabel={option => option.title}
                      getOptionValue={option => option.id}
                      options={courseRes?.data?.data}
                      name="courseId"
                      value={formik.values.courseId}
                    />
                    <Select
                      className="w-100"
                      isClearable
                      menuPortalTarget={document.body}
                      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                      placeholder="Select Mentor"
                      isLoading={mentorRes?.isFetching}
                      onChange={(e) => {
                        formik.setFieldValue("mentorId", e)
                        handleChangeValue(e)
                      }}
                      getOptionLabel={option => option.name}
                      getOptionValue={option => option.id}
                      options={mentorRes?.data?.data}
                      name="mentorId"
                      value={formik.values.mentorId}
                    />

                    <Select
                      className="w-100"
                      isClearable
                      menuPortalTarget={document.body}
                      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                      placeholder="Select Student"
                      isLoading={studentRes?.isFetching}
                      onChange={(e) => {
                        formik.setFieldValue("studentId", e)
                        // handleChangeValue1(e)
                      }
                      }
                      getOptionLabel={option => option.name}
                      getOptionValue={option => option.id}
                      options={studentRes?.data?.data}
                      name="studentId"
                      value={formik.values.studentId}

                    />


                    <input type="date" className="form-control" name="from" value={formik.values.from} onChange={formik.handleChange} />
                    <input type="date" className="form-control" name="to" value={formik.values.to} onChange={formik.handleChange} />


                  </div>


              )}
              columns={columns}
              data={isSuccess ? data?.data?.list : []}
              // enableRowActions
              enableColumnActions
              positionActionsColumn="last"
              muiTopToolbarProps={{
                style: {
                  backgroundColor: tableColor ? tableColor : "#0675F8",
                },
              }}

            />
          </div>
        </div>
      </form>
    </>
  );
};




export default CompletedClassListReport