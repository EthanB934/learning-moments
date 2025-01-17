export const getAllTopics = () => {
  return fetch("http://localhost:8088/topics").then((res) => res.json());
};

export const getTopicById = (topicId) => {
  return fetch(`http://localhost:8088/topics?id=${topicId}`).then((res) =>
    res.json()
  );
};
