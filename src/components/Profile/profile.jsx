import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsersById } from "../../services/userService";

export const Profile = ({ currentUser, allPosts }) => {
  const [user, setUser] = useState({});
  const [author, setAuthor] = useState({});
  const [postCount, setPostCount] = useState(0)
  const { userId } = useParams();
  //console.log(userId);
  // I need to get the current user's data

  useEffect(() => {
    getUsersById(currentUser.id).then((userArray) => {
      const userObject = userArray[0];
      setUser(userObject);
    });
  }, [currentUser]);

  useEffect(() => {
    getUsersById(userId).then((userArray) => {
      const authorObject = userArray[0];
      setAuthor(authorObject);
    });
  }, [userId]);
  console.log(user);

  useEffect(() => {
    if(author) {
        const currentUserPosts = allPosts.filter((post) => post.userId === parseInt(author.id))
        //console.log("Current User Posts: ", currentUserPosts)
        setPostCount(currentUserPosts.length)
        console.log("Author Post Count: ", postCount)
    }
    else {
        debugger
        const currentUserPosts = allPosts.filter((post) => post.userId === parseInt(currentUser.id))
        //console.log("Current User Posts: ", currentUserPosts)
        setPostCount(currentUserPosts.length)
        console.log("Current User Post Count: ", postCount)
    }
}, [author, currentUser, allPosts])

// console.log(author) undefined when user views their own profile 
// otherwise, depends on useParams 

  return (
    <>
      {user && !author ? (
        <div>
          <div>
            <h1>
              Name: <span>{user.fullName}</span>
            </h1>
          </div>
          <div>
            <div>
              Email: <span>{user.email}</span>
            </div>
            <div>
              <div>
                Cohort: <span>{user.cohort}</span>
              </div>
            </div>
            <div>
              <div>
                Posts: <span>{postCount}</span>
              </div>
            </div>
            <button>Edit Profile</button>
          </div>
        </div>
      ) : (
        ""
      )}
       {author ? (
        <div>
          <div>
            <h1>
              Name: <span>{author.fullName}</span>
            </h1>
          </div>
          <div>
            <div>
              Email: <span>{author.email}</span>
            </div>
            <div>
              <div>
                Cohort: <span>{author.cohort}</span>
              </div>
            </div>
            <div>
              <div>
                Posts: <span>{postCount}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
