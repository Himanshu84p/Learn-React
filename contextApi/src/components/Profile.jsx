import React, { useContext } from "react";
import UserContext from "../context/UserContext";

function Profile() {
  const { user } = useContext(UserContext);
  if (!user)
    return (
      <div className="mx-auto my-4 p-3 rounded-lg text-center text-green-700 text-3xl bg-red-300 w-fit">
        Please Login
      </div>
    );

  return (
    <div className="mx-auto my-4 p-3 rounded-lg text-center text-green-700 text-3xl bg-red-300 w-fit">
      Welcome {user.username}
    </div>
  );
}

export default Profile;
