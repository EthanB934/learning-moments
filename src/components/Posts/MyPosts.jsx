import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Topic } from "../topics/topic"
import "./post.css"
import { deleteMyPost } from "../../services/postServices"

export const MyPosts = ({ currentUser, allPosts, getAndSetAllPosts }) => {
    const [userPosts, setUserPosts] = useState([])
    //console.log("Current User: ", currentUser)
    //console.log("All posts: ", allPosts)

    useEffect(() => {
        const currentUserPosts = allPosts.filter((post) => post.userId === parseInt(currentUser.id))
        //console.log("Current User Posts: ", currentUserPosts)
        setUserPosts(currentUserPosts)
    }, [currentUser, allPosts])

    const handleDelete = (postObjectId) => {
        debugger
        console.log("Button clicked!")
        deleteMyPost(postObjectId)
            .then(getAndSetAllPosts())
    }

    return (
        <>
        <div className="posts">
        {userPosts.map((post) => {
            return <div className="post" key={post.id}>
            <header className="post-header">
                    <Link to={`/posts/${post.id}`}>
                    <div className="post-title">{post.title}</div>
                    </Link>
            </header>
                <div><Topic prop={post}/></div>
                <div className="post-delete">
                    <button className="post-delete-button fa-regular fa-trash-can"
                    onClick={() => {handleDelete(post)}}>
                        
                    </button>
                </div>
            </div>
            }) 
        }
        </div>
        </>
    )
}