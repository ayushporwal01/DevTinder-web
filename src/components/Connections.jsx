import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/ConnectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  useEffect(() => {
    let ignore = false;

    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });

        if (!ignore) {
          dispatch(addConnections(res.data.data));
          console.log(res.data.data);
        }
      } catch (err) {
        if (!ignore) {
          console.error(
            "Error fetching connections: ",
            err.response?.data || err.message,
          );
        }
      }
    };

    fetchConnections();

    return () => {
      ignore = true;
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center gap-y-4">
      <h2 className="text-2xl font-medium text-center my-10">Connections</h2>

      {connections.length === 0 && (
        <p className="text-[1.1rem] my-40">No Connections Found</p>
      )}

      {connections.map((connection) => {
        const { firstName, lastName, age, gender, photoURL, about, _id } =
          connection;

        return (
          <div
            key={_id}
            className="flex items-center justify-between bg-base-300 w-xl px-9 py-4 gap-x-5 rounded-sm"
          >
            <div className="flex items-start gap-x-5">
              <img
                src={photoURL}
                className="w-20 h-20 rounded-full"
                alt="Profile Picture"
              />
              <div className="flex flex-col gap-y-1">
                <h3 className="text-[1.2rem] text-white/90 font-semibold ">
                  {firstName} {lastName}
                </h3>
                <p className="text-sm text-white/90">
                  {age}, {gender}
                </p>
                <p className="text-sm text-white/90 w-64 break-all">{about}</p>
              </div>
            </div>

            <button className="btn bg-red-500 hover:scale-105 transition-transform duration-300 ease-in-out">
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
