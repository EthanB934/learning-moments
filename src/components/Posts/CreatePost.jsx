import { useEffect, useState } from "react";
import { TopicSelect } from "../topics/topicSelect";
import { createNewPost, updateNewPost } from "../../services/postServices";
import "./post.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTopicById } from "../../services/topicServices";

export const CreatePost = ({ currentUser, getAndSetAllPosts }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topicId, setTopicId] = useState(0);
  const [date, setDate] = useState("");
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  //console.log(location.state)
  useEffect(() => {
    if (location?.state?.post) {
      setTitle(location.state.post.title);
      setBody(location.state.post.body);
      setTopicId(parseInt(location.state.post.topicId));
    }
  }, []);

  const handleSavePost = () => {
    if (title !== "" && body !== "" && topicId !== 0) {
      console.log("Button clicked!");
      const postObject = {
        title: title,
        body: body,
        date: date,
        topicId: parseInt(topicId),
        userId: currentUser.id,
      };
      //console.log(postObject)
      createNewPost(postObject).then(getAndSetAllPosts);
      //console.log("Congratulations! You have submitted a new post!")
      setTitle("");
      setBody("");
      setTopicId(0);
    } else {
      window.alert("Please fill out all required fields");
    }
  };

  const handleUpdatePost = () => {
    if (title !== "" && body !== "" && topicId !== 0) {
      console.log("Button clicked!");
      const postObject = {
        id: postId,
        title: title,
        body: body,
        date: date,
        topicId: parseInt(topicId),
        userId: currentUser.id,
      };
      //console.log(postObject)
      updateNewPost(postObject).then(getAndSetAllPosts);
      navigate("/posts/myPosts")
    }
  };

  const findDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month.toString()}-${day.toString()}`;
    setDate(formattedDate);
  };

  useEffect(() => {
    findDate();
  }, []);
  //console.log(date)
  //console.log(parseInt(topic))
  return (
    <>
      <form className="post-form">
        <h2 className="post-h2">Create Your New Post!</h2>
        <fieldset className="post-form-title">
          <label className="post-form-label">Your Title:</label>
          <input
            type="text"
            value={title}
            className="post-form-title-input"
            onChange={(event) => {
              setTitle(event.target.value);
              //console.log(title)
            }}
          />
        </fieldset>
        <fieldset className="post-form-message">
          <label className="post-form-label">Your Post Message:</label>
          <textarea
            type="text"
            value={body}
            className="post-form-message-input"
            onChange={(event) => {
              setBody(event.target.value);
              //console.log(body)
            }}
          />
        </fieldset>
        <div className="post-form-topic">
          <label className="post-form-label">Choose Your Topic:</label>
          <TopicSelect topicId={topicId} setter={setTopicId} />
        </div>
        {/* {console.log(
          "Location State, Type: ",
          location.state.type,
          typeof location.state.type
        )} */}
        {location?.state?.type === "edit" ? (
          <button
            className="post-form-submit"
            onClick={(event) => {
              event.preventDefault();
              handleUpdatePost();
            }}
          >
            Update Your Post
          </button>
        ) : (
          <button className="post-form-submit" onClick={handleSavePost}>
            Save and Post
          </button>
        )}
      </form>
    </>
  );
};
