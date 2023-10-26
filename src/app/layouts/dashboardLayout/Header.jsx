import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import avatar from "../../../../src/assets/images/avatar.png";
import reset from "../../../../src/assets/images/reset.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdLogout } from "react-icons/md";
const Header = () => {
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handelLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logout Successfully");
    window.location.reload(false);
  };
    // <-------------refresh page----------->
    const refresh = () => {
      window.location.reload(false);
    };
  
  return (
    <>
      <div className="py-2 shadow  d-flex justify-content-end  px-3">
      <span className="cursor reset ms-auto mt-2 pointer" onClick={refresh}>
                <img src={reset} alt="" width={22} />
              </span>
        <span className=" d-none d-md-block fw-bold mt-2">Refresh</span>
        <div className="ms-auto d-flex">
          <div>
            <p className="p-0 m-0 " style={{ fontSize: "14px" }}>
              <strong className="text-capitalize">{ authUser?.name?.slice(0, 7)}</strong>
            </p>
            <p className="text-muted p-0 m-0 text-capitalize" style={{ fontSize: "12px" }}>
              {authUser?.user_type}
            </p>
          </div>

          <Dropdown>
            <Dropdown.Toggle
              variant="white"
              className=" border-0"
              id="dropdown-basic"
            >
              <img
                src={avatar}
                alt=""
                width={25}
                align="end"
                title=""
                id="dropdown-menu-align-start"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ marginLeft: "-90px" }}>
              {/* <Dropdown.Item >
                <BiUser /> Profile
              </Dropdown.Item> */}
              {/* <Dropdown.Item >
                <RiSettings2Fill /> Setting
              </Dropdown.Item> */}
              <Dropdown.Item onClick={() => handelLogout()}>
                <MdLogout size={17} className="mb-1" /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Header;
