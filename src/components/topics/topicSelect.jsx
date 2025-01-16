import { useEffect, useState } from "react";
import { getAllTopics } from "../../services/topicServices";
import "./topic.css";
export const TopicSelect = ({ setter, topicId }) => {
  const [allTopics, setAllTopics] = useState([]);

  useEffect(() => {
    getAllTopics().then((topicsArray) => setAllTopics(topicsArray));
  }, []);

  return (
    <>
      <select
        className="topic-drop-down"
        value={topicId}
        onChange={(event) => {
          setter(event.target.value);
        }}
      >
        <option value="0">Choose a topic...</option>
        {allTopics.map((topic) => {
          if (topic.id === topicId) {
            //console.log("Found matching topics")
            return (
              <option value={topic.id} key={topic.id}>
                {topic.topic}
              </option>
            );
          } else {
            return (
              <option value={topic.id} key={topic.id}>
                {topic.topic}
              </option>
            );
          }
        })}
      </select>
    </>
  );
};
