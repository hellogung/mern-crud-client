import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_DOMAIN}/users`, {
        name,
        email,
        gender,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="h3 mb-3 fw-bold">Add Users</h1>
      <div className="w-50">
        <form onSubmit={saveUser}>
          <div className="card rounded p-4">
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="agung gumelar"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@mail.com"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option hidden>Choose Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="d-block">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <Link to="/" className="btn btn-secondary ms-1">
                Back
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddUser;
