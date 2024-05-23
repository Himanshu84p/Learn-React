import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/index";
import appwriteService from "../appwrite/config";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //useEffect for fetching all the posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await appwriteService.getPosts([]);
        if (posts) {
          setPosts(posts.documents);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  
  //loading show
  if (loading) {
    return (
      <div className="text-2xl text-black text-center py-10">Loading...</div>
    );
  }

  //error show
  if (error) {
    return <div className="text-2xl text-red">Error: {error}</div>;
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

export default AllPost;
