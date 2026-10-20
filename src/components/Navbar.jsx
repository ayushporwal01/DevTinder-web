import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { useState } from "react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login", {
        state: {
          toastMessage: "Logout Successful!",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm px-20 border-b border-amber-100/10">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          🧑‍💻 DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input w-24 md:w-auto"
          />
          <div className="dropdown dropdown-end mx-5 flex items-center gap-x-3">
            <p className="text-[1.1rem]">Welcome {user.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoURL} />
              </div>
            </div>

            {isDropdownOpen && (
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content absolute top-full right-0 bg-base-300 rounded-box z-1 mt-4 w-40 p-2 shadow"
              >
                <li>
                  <Link
                    to="/profile"
                    className="text-[0.99rem]"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connections"
                    className="text-[0.99rem]"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <a
                    className="text-[0.99rem]"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
