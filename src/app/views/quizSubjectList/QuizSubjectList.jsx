import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./QuizSubjectModal";
import { confirmHandel } from "../../../utils/Alert";
import { toast } from "react-toastify";
import { useDeleteCourseOutlineMutation } from "../../../services/courseApi";
import { useParams } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { useGetQuizSubjectQuery } from "../../../services/contentApi";
const QuizSubjectList = () => {
  const {id}=useParams()
  const res = useGetQuizSubjectQuery(id);
  const { data, isSuccess, isFetching, isError } = res;
  const [deleteCourseOutline] = useDeleteCourseOutlineMutation()
  const [clickValue, setClickValue] = useState(null);
  const [size, setSize] = useState("lg")
  const [param, setParam] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  const handelDelete = async (did) => {
    const result = await deleteCourseOutline(did).unwrap();
    toast.success(result.message);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "subject_name",
        header: "Subject",
      },
      {
        accessorKey: "no_of_question",
        header: "No Of Question",
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
      <PageTopHeader title="Quiz Subject List " />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <p className="fw-bold text-muted">
          <span className="text-success fw-bold">Quiz:</span> {data?.data[0]?.quiz_title}
          </p>
          <div>

            <button
              className="btn btn-primary btn-sm mx-1 my-0"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Quiz Subject");
                setParam(id)
                setSize("md")
              }}
            >
              <FiPlusCircle size={16} /> Add New Subject
            </button>

          </div>
        </div>

        <div className="card-body p-0">
          <MaterialReactTable
              defaultColumn={{
                minSize: 1, 
                maxSize: 9001, 
                size: 260, 
              }}
         
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
                      handelClickValue("Update Quiz Subject");
                      setParam(row?.row?.original);
                    }}
                  >
                    <FaEdit size={18} />
                  </button>
                  {/* <button
                    title=""
                    className="px-2 mx-1 d-flex align-items-center btn btn-danger btn-sm"
                    onClick={() => {
                      confirmHandel(
                        "error",
                        "Delete",
                        "#FF0000",
                        row?.row?.original?.id,
                        handelDelete
                      )
                    }}>
                    <FaTrash size={14} />
                  </button> */}
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




export default QuizSubjectList