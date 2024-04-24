import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import { MdModeEditOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      "https://user-management-server-mosharof-hossains-projects.vercel.app/users"
    )
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDelete = (id) => {
    fetch(
      `https://user-management-server-mosharof-hossains-projects.vercel.app/users/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount === 1) {
          setUsers(users.filter((user) => user._id !== id));
          Swal.fire({
            title: "Success!",
            text: "Deleted successfully!",
            icon: "success",
          });
        }
      });
  };

  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-3xl font-bold text-red-500 text-center my-4">
        User Management CRUD
      </h1>
      <div className="flex flex-col items-center">
        <Link to={"/addUser"}>
          <button className="p-2 mb-2 border-2 border-black rounded-lg px-4 font-bold active:text-white active:bg-black">
            Add User
          </button>
        </Link>

        <ul>
          {users.map((user) => (
            <li key={user._id} className=" flex my-2 gap-2">
              <div className="flex gap-1 items-center hover:text-white hover:bg-black p-1 px-2 rounded-xl border-2 border-black ">
                <h1 className="border-r-2 border-black pr-2 mr-1 my-1 sideBorder">
                  {user.name}
                </h1>
                <h1>{user.email}</h1>
              </div>
              <button
                onClick={() => handleDelete(user._id)}
                className=" text-2xl font-bold rounded-xl border-2 border-black  active:text-white active:bg-black px-4 "
              >
                X
              </button>
              <button
                onClick={() => navigate("/updateUser", { state: user })}
                className="text-2xl rounded-xl border-2 border-black  active:text-white active:bg-black px-3 "
              >
                <MdModeEditOutline />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
