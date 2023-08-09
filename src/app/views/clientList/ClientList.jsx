import React, { useCallback, useMemo } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit} from "react-icons/fa";
import { tableColor } from "../../../utils/Theme";
import { useGetClientListQuery } from "../../../services/commonApi";
const ClientList = () => {
  const res = useGetClientListQuery();
  const { data, isSuccess, isFetching, isError } = res;
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", 
        header: "Name",
      },
      {
        accessorFn: (row) =>
          row && (
            <>
              {row?.email} ( {row?.phone})
            </>
          ) ,

        id: "email",
        header: "Email & Phone",
      },
    
      {
        accessorKey: "address", 
        header: "Address",
      },
      {
        accessorFn: (row) =>
          row && (
            <>
              {row?.occupation} ( {row?.organization_name})
            </>
          ) ,

        id: "occupation",
        header: "Occupation & Organization",
      },
 
      {
        accessorKey: "organization_address", 
        header: "Org Address",
      },
      {
        accessorKey: "nid_passport", 
        header: "Nid/Passport",
      },
      {
        accessorKey: "trade_license", 
        header: "Trade License",
      },
      {
        accessorKey: "web_address", 
        header: "Web Address",
      },
 
      {
        accessorKey: "post_code", 
        header: "Post Code",
      },
 
    ],
    []
  );

  return (
    <>
      {isFetching && <Loader />}
      <PageTopHeader title="Client List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Client List</div>
        </div>

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




export default ClientList