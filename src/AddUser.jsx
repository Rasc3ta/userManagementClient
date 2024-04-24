import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    // console.log(name, "|" ,email);

    fetch(
      `https://user-management-server-mosharof-hossains-projects.vercel.app/users`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "User successfully added!",
            icon: "success",
          });
        }
      });

    // navigate("/");
  };

  return (
    <div className="flex items-center justify-center flex-col gap-2 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-10 gap-2 border-2 border-black mt-10 rounded-xl"
      >
        <input
          type="text"
          name="name"
          placeholder="name"
          className="input input-bordered w-full border-black border-2 focus:outline-none focus:border-black "
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          className="input input-bordered w-full border-black border-2 focus:outline-none focus:border-black"
        />
        <button
          type="submit"
          className="px-4 py-2 border-black border-2 rounded-lg active:bg-black active:text-white"
        >
          Add User
        </button>
      </form>

      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 border-black border-2 rounded-lg active:bg-black active:text-white"
      >
        Go Back
      </button>
    </div>
  );
};

AddUser.propTypes = {};

export default AddUser;
