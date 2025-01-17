export const getAllUserFavorites = (userId) => {
  return fetch(
    `http://localhost:8088/users/${userId}?_embed=userLikedPosts`
  ).then((res) => res.json());
};
