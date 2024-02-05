import React, {  useMemo} from "react";
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { tableColor } from "../../../utils/Theme";
import {  useGetEnrollmentListQuery } from "../../../services/courseApi";
const EnrollMentList = () => {
  const res = useGetEnrollmentListQuery(0);

  const { data, isSuccess, isFetching, isError } = res;


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
        accessorKey: "course_title",
        header: "Course",
      },
      {
        accessorKey: "student_name",
        header: "Student",
      },

      {
        accessorKey: "item_price",
        header: "Price",
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

        <div className="card border shadow-lg ">
   
          <div className="card-body p-0">
          <MaterialReactTable
            
        
              columns={columns}
              data={isSuccess ? data?.data : []}
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

    </>
  );
};




export default EnrollMentList
