import React from "react";

import { BsBook, BsReverseListColumnsReverse } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { BiMoney } from "react-icons/bi";

import TopBox from "./TopBox";
import TableServerSide from "../../components/TableServerSide";
const DashboardHomePage = () => {

  const columns =  [
    
      {
          accessorKey: 'firstName',
          header: 'First Name',
      },
      {
          accessorKey: 'lastName',
          header: 'Last Name',
      },
  
      //column definitions...
  
]


  return (
    <>
     
     
      <div className="row">
        <TopBox
          name="LMS"
          // color="blue"
          icon={<BsBook color="blue" size={25} />}
          item={""}
          des="In this month"
        />
        <TopBox
          name="LMS"
          // color="red"
          icon={<BsReverseListColumnsReverse color="red" size={25} />}
          item={""}
          des="In this month"
        />
        <TopBox
          name="LMS"
          // color="#FFCC00"
          icon={<GiSandsOfTime color="#FFCC00" size={25} />}
          item={""}
          des="In this month"
        />
        <TopBox
          name="LMS"
          // color="green"
          icon={<BiMoney color="green" size={25} />}
          item={""}
          des="&#2547; In this month"
        />
      </div>

      <div className="row">

        <div className="col-md-12 my-2">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder">Table</div>
            <div className="card-body table-responsive p-0 ">
              <TableServerSide
            column={columns}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default  DashboardHomePage;
