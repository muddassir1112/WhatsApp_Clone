import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ContactContext } from "../../App";
import "../../App.css";

export const Contact = () => {
  const data = useContext(ContactContext);
  const navigate = useNavigate();
  const searchRef = useRef();
  const [usersDetails, setUsersDetails] = useState({
    users: [],
    userName: "",
  });
  useEffect(() => {
    let temp = [];
    if (
      JSON.parse(localStorage.getItem("Contacts")) !== null &&
      localStorage.getItem("Username") !== null
    ) {
      temp = JSON.parse(localStorage.getItem("Contacts"));
      setUsersDetails({
        users: temp.filter(
          (ele) => ele.name !== JSON.parse(localStorage.getItem("Username")).userName
        ),
        userName: JSON.parse(localStorage.getItem("Username")).userName,
      });
    }
  }, []);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("Username");
    navigate("/");
  };
  const handleSearchContacts = () => {
    let input = searchRef.current.value.toLowerCase();
    let temp = [];
    if (input.length > 1) {
      usersDetails.users.forEach((ele) => {
        if (ele.name.toLowerCase().includes(input)) {
          temp.push(ele);
        }
      });
      setUsersDetails({ ...usersDetails, users: [...temp] });
    } else if (input <= 1) {
      setUsersDetails({
        ...usersDetails,
        users: JSON.parse(localStorage.getItem("Contacts")).filter(
          (ele) => ele.name !== localStorage.getItem("Username")
        ),
      });
    }
  };
  return (
    <>
      <aside className="sidebar">
        <nav className="navbar bg-light">
          <div className="card">
            <div className="card-body border-bottom">
              <span className="fs-5">
                {usersDetails.userName}
                <button
                  to="/addContact"
                  className="btn btn-success float-end"
                  style={{ marginLeft: "100px" }}
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </span>
            </div>
            {/* search box for search in contacts */}
            <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon1">
                <i className="fas fa-search" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search contacts..."
                aria-label="Username"
                aria-describedby="basic-addon1"
                ref={searchRef}
                onChange={handleSearchContacts}
              />
            </div>
            {/* search box for search in contacts */}
            {usersDetails.users.length > 0 ? (
              <div
                className="container-fluid border-0"
                style={{ height: "80vh", overflowY: "scroll" }}
              >
                <ul className="list-group list-group-flush">
                  {usersDetails.users.map((ele, index) => (
                    <Link
                      to="/contact/chatpage"
                      state={{ from: ele }}
                      style={{ textDecoration: "none" }}
                      key={index}
                    >
                      <li
                        className="mb-3 border-bottom contacts-links fs-6 text-dark"
                        style={{ textTransform: "capitalize" }}
                      >
                        <img
                          src={ele.img}
                          alt="..."
                          className="rounded-circle"
                          style={{ height: "45px", width: "45px" }}
                        />{" "}
                        &nbsp;&nbsp;
                        {ele.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            ) : (
              <div
                className="d-flex justify-content-center"
              >
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </nav>
      </aside>
      <div className="detail">
        <Outlet />
      </div>
    </>
  );
};
