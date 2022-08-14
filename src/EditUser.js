import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_DOMAIN}/users/${id}`
    );
    setName(response.data.name);
    setEmail(response.data.email);
    setGender(response.data.gender);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${process.env.REACT_APP_DOMAIN}/users/${id}`, {
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
      <h1 className="h3 mb-3 fw-bold">Edit Users</h1>
      <div className="w-50">
        <form onSubmit={updateUser}>
          <div className="card rounded p-4">
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option hidden>Choose Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="d-block">
              <button type="submit" className="btn btn-primary">
                Update
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

export default EditUser;
