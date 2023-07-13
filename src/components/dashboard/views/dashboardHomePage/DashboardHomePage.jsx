import React from "react";
import TopBox from "./TopBox";
import { BsBook, BsReverseListColumnsReverse } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import VendorPaymentGraph from "./VendorPaymentGraph";
import BorrowGraph from "./BorrowGraph";
import { BiMoney } from "react-icons/bi";
import TableServerSide from "../../common/TableServerSide";



const AdminPage = () => {

  const colorFunc = (color) => {
    document.documentElement.style.setProperty('--theme-bg-color', color);
  
  }

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
          color="blue"
          icon={<BsBook color="blue" size={25} />}
          item={""}
          des=""
        />
        <TopBox
          name="LMS"
          color="red"
          icon={<BsReverseListColumnsReverse color="red" size={25} />}
          item={""}
          des="In this month"
        />
        <TopBox
          name="LMS"
          color="#FFCC00"
          icon={<GiSandsOfTime color="#FFCC00" size={25} />}
          item={""}
          des="In this month"
        />
        <TopBox
          name="LMS"
          color="green"
          icon={<BiMoney color="green" size={25} />}
          item={""}
          des="&#2547; In this month"
        />
      </div>

      <div className="row">
        <div className="col-md-6 my-2">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder text-center ">Total Vendor Payment</div>
            <div className="card-body  p-0">
              {/* <VendorPaymentGraph
                vendorPaymentGraph={""}
              /> */}
            </div>
          </div>
        </div>
        <div className="col-md-6 my-2">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder text-center ">Total Borrow Book</div>
            <div className="card-body  p-0">
              {/* <BorrowGraph
                itemRentGraph={""}
              /> */}
            </div>
          </div>
        </div>
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

export default  AdminPage;
