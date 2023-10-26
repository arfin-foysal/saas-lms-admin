import { MdPayment } from "react-icons/md";

const DetailsPayment = ({ handleClose, values }) => {
    return (
        <>
            <div className="row">
                <div className="alert alert-success" role="alert">
                    <MdPayment className=" mb-1" size={20} />
                    Payment Details
                </div>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th >Course Name:</th>
                            <td>{values?.course_name}</td>
                            <th >Type:</th>
                            <td>{values?.item_type}</td>
                        </tr>
                        <tr>
                            <th>Name:</th>
                            <td>{values?.name}</td>
                            <th>Item Price</th>
                            <td>{values?.item_price}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{values?.email}</td>
                            <th>Paid Amount</th>
                            <td>{values?.paid_amount}</td>
                        </tr>
                        <tr>
                            <th >Phone:</th>
                            <td>{values?.contact_no}</td>
                            <th>Discount</th>
                            <td>{values?.discount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default DetailsPayment;
