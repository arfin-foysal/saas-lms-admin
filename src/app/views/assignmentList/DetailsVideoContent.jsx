import { IoDocument } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { LuFileEdit } from "react-icons/lu";
import script from "../../../assets/images/script.png";
const DetailsVideoContent = ({ handleClose, values }) => {
    return (
        <>
            <div className="row">

                <div className="alert alert-success" role="alert">
                    <IoDocument className=" mb-1" size={20} />
                    Exam Result
                </div>

                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th >Exam Name:</th>
                            <td>Bangla Quiz 01</td>
                            <th >Date:</th>
                            <td>01 August 2023, 01:23 PM</td>
                        </tr>
                        <tr>
                            <th>Number Of Question:</th>
                            <td>15</td>
                            <th>Duration:</th>
                            <td>10.00 Minutes</td>
                        </tr>
                        <tr>
                            <th>Total Marks:</th>
                            <td>15</td>
                            <th>Achieved:</th>
                            <td>12.00</td>
                        </tr>

                    </tbody>
                </table>

                <div className="text-center mt-2">
                    <h3 className=" fw-bolder py-3">
                        <LuFileEdit />  Answer Script
                    </h3>

                    <div className="row">
                        <div className="col-md-4 text-center">
                            <img src={script}
                                className=" border border-primary rounded p-1"
                                width="250px"
                                alt="" />
                            <p>Script 1</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <img src={script}
                                className=" border border-primary rounded p-1"
                                width="250px"
                                alt="" />
                            <p>Script 2</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <img src={script}
                                className=" border border-primary rounded p-1"
                                width="250px"
                                alt="" />
                            <p>Script 3</p>
                        </div>

                        </div>

                    <from>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Question 1</label>
                                    <input type="text" className="form-control" />

                                </div>
                            </div>

                            <div className="col-md-2">
                                <button type="submit" className="btn btn-primary btn-sm mt-4">Update</button>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Question 3 </label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button type="submit" className="btn btn-primary btn-sm mt-4">Update</button>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Question 4</label>
                                    <input type="text" className="form-control" />

                                </div>
                            </div>

                            <div className="col-md-2">
                                <button type="submit" className="btn btn-primary btn-sm mt-4">Update</button>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Question 2 </label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button type="submit" className="btn btn-primary btn-sm mt-4">Update</button>
                            </div>

                        </div>

                    </from>


                </div>

            </div>
        </>
    );
};

export default DetailsVideoContent;
