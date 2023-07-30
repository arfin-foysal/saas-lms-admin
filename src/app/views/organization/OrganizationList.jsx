import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./OrganizationModal";
import demo from "../../../../src/assets/images/no_image.png";
import { useGetOrganizationListQuery } from "../../../services/masterSettingsApi";
import { BsGearFill } from "react-icons/bs";
const OrganizationList = () => {
  const res = useGetOrganizationListQuery();
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
        accessorFn: (row) =>
          row?.logo ? (
            <>
              <img
                className="img-fluid rounded-circle shadow"
                style={{ width: "40px", height: "40px" }}
                src={`${import.meta.env.VITE_ASSET_HOST_URL}${row?.logo}`}
                alt=""
              ></img>
            </>
          ) : (
            <img
              className="img-fluid rounded-circle shadow"
              style={{ width: "40px", height: "40px" }}
              src={demo}
              alt=""
            ></img>
          ),

        id: "logo",
        header: "Logo",
        size: 10,
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "slug",
        header: "Slug",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorFn: (row) =>
          row && (
            <div className="ms-4">
              {row.contact_no &&
                <span className=" mr-1">{row.contact_no}</span>
              }

              {row.contact_person &&
                <span className=" ms-1">({row.contact_person})</span>
              }

            </div>
          ),
        id: " contact_no & contact_person ",
        header: "Contact No & Contact Person",
      },
      {
        accessorFn: (row) =>
          row?.is_active === true ? (

            <span className="badge bg-success">Active</span>

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
      <PageTopHeader title="Organization List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Organization List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Organization");
              }}
            >
              <FiPlusCircle size={16} /> Add New Org
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
                    className="mx-1 btn btn-dark btn-sm"
                    onClick={() => {
                      handleShow();
                      handelClickValue("Update Settings");
                      setParam(row?.row?.original);
                    }}
                  >
                    <BsGearFill size={16} /> Update
                  </button>

                  <button
                    title=""
                    className="mx-2 btn btn-success btn-sm"
                    onClick={() => {
                      handleShow();
                      handelClickValue("Update Organization");
                      setParam(row?.row?.original);
                    }}
                  >
                    <FaEdit size={16} /> Edit
                  </button>
                </div>
              </>
            )}
          />
        </div>
      </div>
    </>
  );
};
export default OrganizationList