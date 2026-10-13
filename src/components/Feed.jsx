import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    feed && (
      <div className="flex justify-center mt-12">
        <UserCard user={feed.data[0]} />
      </div>
    )
  );
};

export default Feed;
