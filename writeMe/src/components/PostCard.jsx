import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Button } from "./index";
import { format } from "date-fns";

function PostCard(props) {
  const post = props.post;
  const allPost = props.allPost;
  const FormattedDate = format(post.$updatedAt, "MMMM do yyyy")
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return (
    <Link to={`/post/${post.$id}`}>
      <div
        style={{ backgroundColor: "#222831" }}
        className="w-full rounded-xl p-4 shadow-xl border"
      >
        <div className="w-full h-48 justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl h-44"
          />
          <p className="text-sm font-bold text-gray-400 my-2">{FormattedDate}</p>
        </div>
        <h2 className="text-2xl font-bold text-white">{post.title}</h2>
        {isAuthor && !allPost && (
          <div className="my-2 text-center">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3">
                <FontAwesomeIcon icon={faPenToSquare} />
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={deletePost}>
              <FontAwesomeIcon icon={faTrash} />
              Delete
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
}

export default PostCard;
