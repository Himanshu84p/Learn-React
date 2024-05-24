import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/index";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";



function AllPost() {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userData = useSelector((state) => state.auth.userData);

  //useEffect for fetching all the posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await appwriteService.getPosts([]);
        if (posts) {
          console.log("user Data here", userData);
          console.log("post", posts.documents);
          if (userData && posts.documents) {
            const filteredPosts = posts.documents.filter(
              (post) => post.userId === userData.$id
            );

            console.log(filteredPosts);
            setMyPosts(filteredPosts);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        console.log(myPosts);
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

  if (myPosts.length === 0) {
    return (
      <div className="text-2xl text-black text-center py-10">
        No Post uploaded
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {myPosts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post ={post} allPost={false} />
            </div>
          ))}
        </div>
        
      </Container>
    </div>
  );
}

export default AllPost;
