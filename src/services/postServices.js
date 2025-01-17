export const getAllPosts = () => {
  return fetch("http://localhost:8088/posts?_embed=userLikedPosts").then(
    (res) => res.json()
  );
};

export const getAllUserLikes = () => {
  return fetch(`http://localhost:8088/userLikedPosts`).then((res) =>
    res.json()
  );
};

export const userLikedPost = (relationship) => {
  return fetch("http://localhost:8088/userLikedPosts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(relationship),
  });
};

export const createNewPost = (postObject) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObject),
  });
};

export const updateNewPost = (postObject) => {
  console.log(postObject);
  return fetch(`http://localhost:8088/posts/${postObject.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObject),
  });
};

export const deleteMyPost = (postObjectId) => {
  return fetch(`http://localhost:8088/posts/${postObjectId.id}`, {
    method: "DELETE",
  }).then(getAllPosts());
};

export const findPostByPostId = async (relationshipPostId) => {
  console.log("Related Post to User: ", relationshipPostId);
  return await fetch(
    `http://localhost:8088/posts/${relationshipPostId.postId}`
  ).then((res) => res.json());
};

export const deleteFavorite = async (favoritePost, currentUser) => {
  console.log(favoritePost);
  const userFavoriteArray = await fetch(
    `http://localhost:8088/userLikedPosts?postId=${favoritePost.id}&userId=${currentUser.id}`
  ).then((res) => res.json());
  const userFavoriteObject = userFavoriteArray[0];
  console.log(userFavoriteObject.id);
  await fetch(`http://localhost:8088/userLikedPosts/${userFavoriteObject.id}`, {
    method: "DELETE",
  });
};
