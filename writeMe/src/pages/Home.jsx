import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (userData === null) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex justify-center items-center bg-white">
            <div className="p-6 bg-gray-200 rounded-lg shadow-lg text-center">
              <FontAwesomeIcon
                icon={faLock}
                className="text-blue-500 text-5xl mb-4"
              />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Login to read posts
              </h1>
              <p className="text-gray-600">
                You must be logged in to view the content. Please log in or sign
                up to continue.
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
