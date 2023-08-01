import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactContext } from "../../App";
import whatsappImage from "../../images/whstappImage.png";

export const Login = () => {
  const navigate = useNavigate();
  const data = useContext(ContactContext);
  const [alert, setAlert] = useState({
    alertBox: "none",
    alertMsg: "",
  });
  const [number, setNumber] = useState("");
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Contacts")) !== null) {
      data.setContacts(JSON.parse(localStorage.getItem("Contacts")));
    } else localStorage.setItem("Contacts", JSON.stringify(data.contacts));
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    if (number === "" || isNaN(number)) {
      setAlert({
        alertBox: "block",
        alertMsg: "Please enter valid number",
      });
    } else {
      if (handleValidatateUser(number)) {
        navigate("/contact");
        window.alert("Login sucessfully");
      } else if (!handleValidatateUser(number)) {
        setAlert({
          alertBox: "block",
          alertMsg: "Account doesn't exist,please create an acount !!!",
        });
      }
    }
  };
  const handleValidatateUser = (num) => {
    let obj = {};
    for (const contact of data.contacts) {
      if (contact.number === num) {
        data.setLoggedInUser({
          userName: contact.name,
          userId: contact.id,
        });
        obj = {
          userName: contact.name,
          userId: contact.id,
        };
        localStorage.setItem("Username", JSON.stringify(obj));
        return true;
      }
    }
    return false;
  };

  return (
    <center>
      <div className="card pb-3" style={{ width: "28rem" }}>
        <img src={whatsappImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title text-success mb-5 mt-3">
            Login to your account !!!
          </h5>
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-5 text-success">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                onChange={(e) => setNumber(e.target.value)}
                autoFocus
              />
              <label htmlFor="floatingInput">Phone</label>
            </div>
            {/* Alert Box */}
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
              style={{ display: alert.alertBox }}
            >
              <strong>Ooopppsss!</strong> {alert.alertMsg}
              <button
                type="button"
                className="btn-close"
                onClick={() => setAlert({ alertBox: "none", alertMsg: "" })}
                aria-label="Close"
              ></button>
            </div>
            {/* Alert Box Closed */}
            <div className="d-grid gap-2">
              <button
                className="btn btn-success pt-2 pb-2"
                type="submit"
                style={{ background: "#1bd741", border: "none" }}
              >
                Login
              </button>
            </div>
            <p className="mt-3">
              New user ? <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </center>
  );
};
