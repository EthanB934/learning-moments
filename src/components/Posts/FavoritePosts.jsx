import { useEffect, useState } from "react";
import { getAllUserFavorites } from "../../services/userLikedPost";
import { deleteFavorite, findPostByPostId } from "../../services/postServices";
import { Link } from "react-router-dom";
import { Topic } from "../topics/topic";
import "./post.css";

export const FavoritePosts = ({ currentUser }) => {
  const [favoritePosts, setFavoritePosts] = useState([]);

  const handleFetching = () => {
    getAllUserFavorites(currentUser.id).then((userFavoritesArray) => {
      const userFavorites = userFavoritesArray.userLikedPosts;
      // embedded array, retrieved from object on which it was embedded
      //console.log(userFavorites);

      Promise.all(
        userFavorites.map((favorite) => findPostByPostId(favorite))
      ).then((fulfilledPosts) => {
        setFavoritePosts(fulfilledPosts);
        console.log(fulfilledPosts);
      });
    });
  };

  useEffect(() => {
    handleFetching();
  }, [currentUser]);
  return (
    <>
      <div className="posts">
        {favoritePosts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <header className="post-header">
                <Link to={`/posts/${post.id}`}>
                  <div className="post-title">{post.title}</div>
                </Link>
              </header>
              <div>
                <Topic prop={post} />
              </div>
              <div className="post-likes fa-solid fa-thumbs-up"></div>
              <button
                className="post-remove"
                onClick={() => {
                  deleteFavorite(post, currentUser).then(() => {handleFetching()});
                }}
              >
                Remove from Favorites
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
