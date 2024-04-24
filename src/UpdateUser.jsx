import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { state: user } = useLocation();
  const { email } = user;

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;

    console.log(name);

    fetch(
      `https://user-management-server-mosharof-hossains-projects.vercel.app/users`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount === 1) {
          Swal.fire({
            title: "Success!",
            text: "User successfully Updated!",
            icon: "success",
          });
        }
      })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className="flex items-center justify-center flex-col gap-2 ">
      <form
        onSubmit={handleUpdate}
        className="flex flex-col p-10 gap-2 border-2 border-black mt-10 rounded-xl"
      >
        <input
          type="text"
          name="name"
          placeholder="name"
          required
          className="input input-bordered w-full border-black border-2 focus:outline-none focus:border-black "
        />
        <button
          type="submit"
          className="px-4 py-2 border-black border-2 rounded-lg active:bg-black active:text-white"
        >
          Update User
        </button>
      </form>

      {/* <button
        onClick={() => navigate("/")}
        className="px-4 py-2 border-black border-2 rounded-lg active:bg-black active:text-white"
      >
        Go Back
      </button> */}
    </div>
  );
};

UpdateUser.propTypes = {};

export default UpdateUser;
