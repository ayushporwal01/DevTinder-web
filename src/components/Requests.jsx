import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/RequestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/requests/received", {
          withCredentials: true,
        });
        dispatch(addRequests(res.data?.data));
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchRequests();
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center gap-y-4">
      <h2 className="text-2xl font-medium text-center my-10">
        Connection Requests
      </h2>

      {requests.length === 0 && (
        <p className="text-[1.1rem] my-40">No Connection Requests Found</p>
      )}

      {requests.map((request) => {
        const { firstName, lastName, age, gender, photoURL, about, _id } =
          request.fromUserId;

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
                <p className="text-sm text-white/90 w-52 break-all">{about}</p>
              </div>
            </div>

            <button
              onClick={() => reviewRequest("rejected", request._id)}
              className="btn btn-primary hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Reject
            </button>
            <button
              onClick={() => reviewRequest("accepted", request._id)}
              className="btn btn-secondary hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Accept
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
