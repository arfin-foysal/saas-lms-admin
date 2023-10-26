import "./Dashboard.scss";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { navItem } from "../../../Nav/NavItem";
import { user } from "../../../Route/utils";
import avatar from "../../../../src/assets/images/avatar.png";
import logo from "../../../../src/assets/logo/logo.png";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../../features/authSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Layout = () => {
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logout Successfully");
    window.location.reload(false);
  };
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <div className="sidebar-wrapper">
          <motion.div
            animate={
              {
                width: isOpen ? "230px" : "55px",
                padding: isOpen ? "17px 17px" : "17px 10px",
                height: "100vh",
                overflow: "hidden",
                transition: {
                  duration: 0.5,
                  type: "spring",
                  damping: 10,
                },
              }}
            className={`sidebar `}
          >
            <div className="top_section ">
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    // variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="logo pt-2"
                  >
                    <Link to="/dashboard/">
                      <LazyLoadImage
                        src={logo}
                        width={130} alt="BacBon"
                        effect="blur"
                      />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="bars pointer" onClick={toggle}>
                <FaBars />
              </div>
            </div>

            <div className="d-flex shadow-lg  rounded  mt-2">
              <div>
                <img
                  className="rounded-circle"
                  width="35"
                  src={avatar}
                  alt="Profile"
                />
              </div>
              <div className="mt-1 ms-2">
                {isOpen && (
                  <motion.h6
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text mt-1 ms-2 fw-lighter"
                  >
                    <p className="m-0 p-0 text-capitalize">{authUser?.name?.slice(0, 7)}</p>
                  </motion.h6>
                )}
              </div>
            </div>

            <div className=" search mt-4 m-0">
              <div className="search_icon mb-2 ml-2">
                <BiHomeAlt />
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.h6
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text mt-1 ms-2 fw-lighter"
                  >
                    <Link  to="/dashboard">Dashboard</Link>
                  </motion.h6>
                )}
              </AnimatePresence>
            </div>
            <Scrollbars
              style={{
                width: "100%",
                height: "72%",
                color: "white",
              }}
              autoHide
              renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{ display: 'none' }} />}

            >
              <section className="routes">
                {navItem.map((route, index) => {
                  return (
                    route.role === user.role &&
                    (route.children ? (
                      <SidebarMenu
                        setIsOpen={setIsOpen}
                        route={route}
                        showAnimation={showAnimation}
                        isOpen={isOpen}
                        key={index}
                      />
                    ) : (
                      <NavLink
                        to={route.link}
                        key={index}
                        className="link"
                        activeclassname="active"
                      >
                        <div className="icon">{route.icon}</div>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              variants={showAnimation}
                              initial="hidden"
                              animate="show"
                              exit="hidden"
                              className="link_text"
                            >
                              {route.title}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </NavLink>
                    ))
                  );
                })}
              </section>
            </Scrollbars>
            <div>
              <div className="d-flex pointer ">
                <div className={
                  isOpen ? "d-none" : "logout_icon mt-1 ms-2"
                } >
                  <MdLogout size={20} onClick={toggle}  className="text-primary" />
                </div>
                <div className="mt-1 ms-2  ">
                  {isOpen && (
                    <span onClick={() => handelLogout()}>
                      <motion.h6
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text mt-1 ms-2 fw-lighter"
                      >
                        <p> <MdLogout size={20}  className="mb-1 text-primary" /> Logout  </p>
                      </motion.h6>

                    </span>
                  )}

                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="contain-wrapper">
          <Header />
          <div className="content-main">
          <main>
            <Outlet />
            </main>
              
          <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
