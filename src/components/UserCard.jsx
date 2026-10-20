const UserCard = ({ user, showActions = true, limitedAbout }) => {
  const { firstName, lastName, photoURL, age, gender, about } = user;

  return (
    <div className="card bg-base-300 w-72 shadow-sm">
      <figure>
        <img src={photoURL} className="w-full" alt="Profile Pic" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>

        {age && <p>{age + ", " + gender}</p>}

        {about && <p className="wrap-break-word">{limitedAbout}</p>}

        {showActions && (
          <div className="card-actions justify-center mt-5 space-x-2">
            <button className="btn btn-primary hover:scale-105 transition-transform duration-300 ease-in-out">
              Ignore
            </button>
            <button className="btn btn-secondary hover:scale-105 transition-transform duration-300 ease-in-out">
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
