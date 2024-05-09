import React from "react";
import { useLoaderData } from "react-router-dom";

function Github() {
  const data = useLoaderData();
  return (
    <>
      <div className="w-full text-center bg-slate-500 p-6">
        <img className="m-auto rounded-3xl" src={data.avatar_url} alt="github profile" />
        <h1 className="m-4 text-4xl text-white">Followers : {data.followers} </h1>
      </div>
    </>
  );
}

export default Github;

export const GihubDataLoader = async () => {
  const response = await fetch("https://api.github.com/users/himanshu84p");
  return response.json();
};
