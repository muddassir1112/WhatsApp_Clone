import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactContext } from "../../App";
import whatsappImage from "../../images/whstappImage.png";
import userImage from "../../images/user.avif";
export const Signup = () => {
  const data = useContext(ContactContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    alertBox: "none",
    alertMsg: "",
  });
  const [details, setDetails] = useState({
    number: "",
    name: "",
  });
 
  const handleSignup = (e) => {
    e.preventDefault();
    let temp = JSON.parse(localStorage.getItem("Contacts"));
    if (validation(details.number, details.name)) {
      for (const contact of temp) {
        if (
          details.number !== contact.number &&
          details.name.toLowerCase() === contact.name.toLowerCase()
        ) {
          setAlert({
            alertBox: "block",
            alertMsg: "Either name or number is already in use.",
          });
          return;
        } else if (
          details.number === contact.number &&
          details.name.toLowerCase() !== contact.name.toLowerCase()
        ) {
          setAlert({
            alertBox: "block",
            alertMsg: "Either name or number is already in use.",
          });
          return;
        }
      }
      let obj = {
        id: Math.ceil(Math.random() * 1212),
        number: details.number,
        name: details.name,
        img: userImage,
      };
      data.contacts.push(obj);
      data.setContacts([...data.contacts]);
      localStorage.setItem("Contacts", JSON.stringify(data.contacts));
      navigate("/");
    }
  };

  const validation = (number, name) => {
    if (
      number === "" ||
      isNaN(number) ||
      number.length < 10 ||
      number.length > 10
    ) {
      setAlert({
        alertBox: "block",
        alertMsg: " Please enter valid mobile number",
      });
      return false;
    } else if (name === "" || !isNaN(name)) {
      setAlert({
        alertBox: "block",
        alertMsg: "Please enter valid name",
      });
      return false;
    } else return true;
  };
  return (
    <center>
      <div className="card pb-5" style={{ width: "28rem" }}>
        <img src={whatsappImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title text-success mb-5 mt-3">
            Create an Account !!!
          </h5>
          <form onSubmit={handleSignup}>
            <div className="form-floating mb-3 text-success">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                onChange={(e) =>
                  setDetails({ ...details, name: e.target.value })
                }
                autoFocus
              />
              <label htmlFor="floatingInput">Name</label>
            </div>
            <div className="form-floating mb-5 text-success">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                onChange={(e) =>
                  setDetails({ ...details, number: e.target.value })
                }
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
                Signup
              </button>
              <p className="mt-3">
                Already a user ? <Link to="/">Click here to login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </center>
  );
};
