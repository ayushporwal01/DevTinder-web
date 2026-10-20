import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const MAX_LENGTH = 100;

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [toast, showToast] = useState("");

  const dispatch = useDispatch();

  const limitedAbout = (about || "").slice(0, MAX_LENGTH);

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoURL,
          about,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data.data));
      showToast(true);
      setTimeout(() => {
        showToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-x-10">
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveProfile();
            }}
          >
            <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend">Edit Profile</legend>

              <label className="label">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input"
              />

              <label className="label">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input"
              />

              <label className="label">Age</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input"
              />

              <label className="label">Gender</label>

              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn input font-normal"
                >
                  {gender || "Select a gender"}
                </div>
                <ul
                  tabIndex={-1}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <button
                      type="button"
                      className="text-start"
                      onClick={() => setGender("Male")}
                    >
                      Male
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => setGender("Female")}>
                      Female
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => setGender("Others")}>
                      Others
                    </button>
                  </li>
                </ul>
              </div>

              <label className="label">Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="input"
              />

              <label className="label">About</label>
              <textarea
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea"
                maxLength={MAX_LENGTH}
                required
              />

              <p className="text-xs text-gray-500 text-right mt-1">
                {limitedAbout.length}/{MAX_LENGTH}
              </p>

              <p className="text-red-500">{error}</p>
              <button type="submit" className="btn btn-neutral mt-4">
                Save
              </button>
            </fieldset>
          </form>

          <div className="flex items-start mt-5">
            <UserCard
              user={{ firstName, lastName, age, gender, photoURL, about }}
              showActions={false}
              limitedAbout={limitedAbout}
            />
          </div>
        </>
      </div>

      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
