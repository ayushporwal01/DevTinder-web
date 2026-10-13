const UserCard = ({ user }) => {
  const { firstName, lastName, photoURL, age, gender, about } = user;
  return (
    <div className="card bg-base-300 w-72 shadow-sm">
      <figure>
        <img src={photoURL} className="rounded pt-5 w-40" alt="Profile Pic" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && <p>{age + ", " + gender}</p>}
        {about && <p>{about}</p>}
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
