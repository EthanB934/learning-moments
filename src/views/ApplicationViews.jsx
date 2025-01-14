import { Routes, Route, Outlet } from "react-router-dom"
import { Posts } from "../components/postList/PostList"
import { NavBar } from "../components/Navigation/NavBar"
import { useEffect, useState } from "react"
import { PostDetails } from "../components/postList/PostDetails"
import { getAllPosts } from "../services/postServices"
import { CreatePost } from "../components/postList/CreatePost"

export const ApplicationViews = () => {
    const [allPosts, setAllPosts] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    const getAndSetAllPosts = () => {
        getAllPosts().then((postsArray) => setAllPosts(postsArray))
    }

    useEffect(() => {
        getAndSetAllPosts()
        console.log("Posts Array: ", allPosts)
      }, [])

    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user")
        const learningUserObj = JSON.parse(localLearningUser)
        setCurrentUser(learningUserObj)
    }, [])

    //console.log("Current User: ", currentUser, typeof currentUser)

    return (
        <Routes>
            <Route 
            path="/"
            element={
                <>
                <NavBar />
                <Outlet />
                </>
            }
        >   <Route index element={<Posts allPosts={allPosts}/>} />
            <Route path="posts">
                <Route index element={<Posts allPosts={allPosts}/>} />
                <Route path="new" element={<CreatePost currentUser={currentUser} getAndSetAllPosts={getAndSetAllPosts}/>} />
                <Route path=":postId" element={<PostDetails currentUser={currentUser}/>} />
            </Route>

            {/*This path had to be nested to work properly. Originally, it looked like this:

                <Route path="posts" element={<Posts />} />
                <Route path=":postId" element={<PostDetails />} />

            Why is this wrong? The root path can be named anything, but we want it to make sense for the user's sake.
            We declared the root path to be "posts" because that is what it is displaying, a list of all posts. 
            The value of element is the component we want to associated with that path. In the case of path /posts
            we want to display our Posts component, a list of all posts. The second route is depending on the path 
            of the parent route. For each generated post, we want to render a new page that displays information about
            that one post. We did this in postList.jsx: 

                    <Link to={`/posts/${post.id}`}>
                        <div className="post-title">{post.title}</div>
                    </Link>
            
            This block of code is running during a .map of the filtered posts. It is generating a link for each post 
            object. It is also assigning each post a unique link by the post's id. This is where our second route comes
            in with path=":postId." We need to useParams() to capture this information, and once this information is
            captured with useParams(), we display our element, in this case PostDetails. Our final path looks like:

                    address/posts/post.id

            And displays the element associated with unique path
            */}

        </Route>
        </Routes>
    )
}