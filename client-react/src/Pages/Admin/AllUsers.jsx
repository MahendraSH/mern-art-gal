import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
const AllUsers = () => {
  axios.defaults.withCredentials = true;
  const api = import.meta.env.VITE_APP_API_URL;
  const { isLoading, data, isError, error } = useQuery(["users"], () =>
    axios.get(`${api}/user/all`).then((res) => res.data)
  );
  console.log(data);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return { error };
  }
  console.log(data);
  const users = data.users.map((user) => {
    return (
      <tr key={user._id}>
        <td>
          <label>
            <span className="font-bold text-zinc-800">{user._id}</span>
          </label>
        </td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="w-12 h-12 mask mask-squircle">
                <img src={user.avatar.url} alt="Avatar" />
              </div>
            </div>
            <div>
              <span className="font-bold">{user.name}</span>
            </div>
          </div>
        </td>
        <td>
          <span className="font-bold">{user.email}</span>
        </td>
        <td>
          <Link to={`/admin/user/${user._id}`} className="btn btn-ghost btn-xs">
            details
          </Link>
        </td>
      </tr>
    );
  });
  console.log(users);
  return (
    <>
      <>
        <div className="w-10/12 overflow-x-auto">
          <table className="table table-xs table-pin-rows table-pin-cols">
            {/* head */}
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>email</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}

              {users}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>email</th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </>
    </>
  );
};

export default AllUsers;
