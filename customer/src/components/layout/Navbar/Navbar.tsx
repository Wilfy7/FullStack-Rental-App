import React from "react";
import "./NavbarStyles.scss";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/Slice/customerSlice";
import { toast, ToastContainer } from "react-toastify";

const NavigationBar = () => {
  let publicUrl = process.env.PUBLIC_URL;

  //is logged in from redux
  const isLoggedin = useSelector(
    (state: any) => state.customer.data.isLoggedIn
  );

  // dispatch and navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle logout
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  // handle create property
  const handleCreate = () => {
    if (isLoggedin) {
      navigate("/create-property");
    } else {
      toast("Please login to add property", {
        type: "error",
        position: "top-right",
        pauseOnHover: false,
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
        //hide the shadow of the toast
        style: {
          boxShadow: "none",
        },
      });
    }
  };

  return (
    <nav className=" globalstyles navbar navbar-expand-lg bg-body-tertiary">
      <ToastContainer />
      <div className="container-fluid">
        <div>
          <a data-testid="nav__logo" className="navbar-brand" href="/">
            <img src={`${publicUrl}/assets/img/logo.png`} alt="logo" />
          </a>
        </div>

        <div className="d-flex">
          <>
            <button onClick={handleCreate} className="btn mobile-navbutton ">
              Add Property <AddIcon />
            </button>
          </>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/properties">
                Properties
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact Us
              </a>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Profile
              </span>
              <ul className="dropdown-menu">
                {
                  // if the user is not logged  show login and register
                  !isLoggedin && (
                    <>
                      <li>
                        <a className="dropdown-item" href="/login">
                          Login
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/register">
                          Register
                        </a>
                      </li>
                    </>
                  )
                }
                <li>
                  {isLoggedin && (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={handleLogOut}
                      className="dropdown-item"
                    >
                      logout
                    </span>
                  )}
                </li>
              </ul>
            </li>
          </ul>
          <>
            <button
              onClick={handleCreate}
              className="btn desktop-navbutton "
              type="submit"
            >
              Add Property <AddIcon />
            </button>
          </>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
