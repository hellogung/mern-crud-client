import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function GetUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/users`);
    setUsers(response.data);
    setLoading(false);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_DOMAIN}/users/${id}`);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-75">
        <div className=" d-flex mb-3 justify-content-between">
          <h1 className="h3 fw-bold">List Users</h1>
          <Link to="/add" className="btn btn-dark">
            Add Data
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr className="table-dark">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>
                  <Link
                    to={`/edit/${user._id}`}
                    className="btn btn-dark btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="btn btn-danger btn-sm ms-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading ? <p className="text-center fw-bold ">Loading...</p> : ""}
      </div>
    </>
  );
}

export default GetUser;
