import React from "react";

import { BsBook, BsReverseListColumnsReverse } from "react-icons/bs";
import { BiSolidGroup } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import TopBox from "./TopBox";
import LineChart from "./LineChart";
import { BarChart } from "./BarChart";
import EnrollMentList from "./EnrollmentList";
import PurchaseList from "../purchaseList/PurchaseList";

const DashboardHomePage = () => {

  const columns = [

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
          name="Total Courses"
          // color="blue"
          icon={<BsBook color="blue" size={25} />}
          item={"9"}
          // des="In this month"
        />
    
        <TopBox
          name="Total Students"
          // color="#FFCC00"
          icon={<BiSolidGroup color="#FFCC00" size={25} />}
          item={"150"}
          // des="In this month"
        />
        <TopBox
          name="Total Expert "
          // color="green"
          icon={<FaChalkboardTeacher color="green" size={25} />}
          item={"20"}
          // des="&#2547; In this month"
        />    <TopBox
          name="Total Enrolment"
          // color="red"
          icon={<BsReverseListColumnsReverse color="red" size={25} />}
          item={"235"}
          // des="In this month"
        />
      </div>

      <div className="row">

        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder">Overview</div>
            <LineChart />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder">Number of Students</div>
            <BarChart />
          </div>
        </div>

        <div className="col-md-6 my-2">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder">Enrollment</div>
            <div className="card-body table-responsive p-0 ">
              <EnrollMentList
                column={columns}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 my-2">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder">Purchase</div>
            <div className="card-body table-responsive p-0 ">
              <PurchaseList/>
       
            </div>
          </div>
        </div>
      </div >

    </>
  );
};

export default DashboardHomePage;
