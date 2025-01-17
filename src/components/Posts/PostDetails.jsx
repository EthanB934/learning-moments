import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPosts, getAllUserLikes } from "../../services/postServices";
import { getUsersById } from "../../services/userService";
import { getTopicById } from "../../services/topicServices";
import { userLikedPost } from "../../services/postServices";
import "./post.css";

export const PostDetails = ({ currentUser }) => {
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const [topic, setTopic] = useState(0);
  const { postId } = useParams();
  const navigate = useNavigate();

  const findPost = () => {
    getAllPosts().then((postsArray) => {
      const allPosts = postsArray;
      const thisPost = allPosts.find((post) => post.id === parseInt(postId));
      setPost(thisPost);
    });
  };

  useEffect(() => {
    findPost();
  }, []);

  useEffect(() => {
    getUsersById(post.userId).then((usersArray) => {
      const author = usersArray[0];
      //console.log(post)
      //console.log(author)
      setAuthor(author);
    });
  }, [post]);

  useEffect(() => {
    getTopicById(post.topicId).then((topicArray) => {
      const topic = topicArray[0];
      //console.log(topic)
      setTopic(topic);
    });
  }, [post]);

  const handleLike = () => {
    getAllUserLikes().then((likesArray) => {
      const allLikes = likesArray;
      //console.log(currentUser)
      //console.log(post)
      const newUserLike = {
        userId: currentUser.id,
        postId: post.id,
      };
      //console.log(newUserLike)
      const thisLike = allLikes.find(
        (likeRelationship) =>
          likeRelationship.userId === newUserLike.userId &&
          likeRelationship.postId === newUserLike.postId
      );
      if (thisLike) {
        window.alert(`You have already liked this post!`);
      } else {
        userLikedPost(newUserLike).then(findPost);
        console.log("New user like relationship added!");
      }
    }).then(navigate("/posts/favorites"));
  };

  return (
    <section className="post-details">
      <div>
        <span>
          <h1 className="post-h1">{post.title}</h1>
        </span>
      </div>
      <header className="post-header">
        <div onClick={() => {
          navigate(`/profile/${author.id}`)
        }}>{author ? author.name : "Loading author..."}</div>
        <div>{topic ? topic.topic : "Topic loading..."}</div>
      </header>
      <div className="post-body">
        {post.body}
        <div className="post-data">
          {post.date}
          <div className="like-post-button"></div>
          {currentUser && author ? (
            // If the current user is the author of the post, display an Edit button
            currentUser.id === author.id ? (
              <button
                onClick={() => {
                  navigate(`/posts/form/${postId}`, {
                    state: { type: "edit", post: post },
                  });
                }}
              >
                Edit
              </button>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {currentUser && author ? (
            // Else, if the current user is not the author, display a button to like the post
            currentUser.id !== author?.id ? (
              <button
                className="fa-solid fa-thumbs-up"
                onClick={handleLike}
              ></button>
            ) : (
              " "
            )
          ) : (
            " "
          )}
          {post ? post.userLikedPosts?.length : "Likes loading..."}

          <div></div>
        </div>
      </div>
    </section>
  );
};

/*
    Problem: I need to display information unique to each post. 

    Tasks:
    (1) I need to get all of my post objects 
    (2) Compare their unique ids to the one captured in useParams
    (3) Hold this post object in state
    (4) Begin returning information about this post
        (a) The Post Title
        (b) The Author's Name of the Post
        (c) The Post's Topic
        (d) The Post's Body
        (e) The date the post was made
        (f) The likes count for this post 
    (5) Check the current user data: is the user is the author of the post?
    (6) If yes, display a button for the author to edit their post. Else, do not. 
    (7) If no, display a button for the non-author user to like the post.

*/
