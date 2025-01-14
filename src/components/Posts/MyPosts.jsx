import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Topic } from "../topics/topic"
import "./post.css"

export const MyPosts = ({ currentUser, allPosts }) => {
    const [userPosts, setUserPosts] = useState([])
    //console.log("Current User: ", currentUser)
    //console.log("All posts: ", allPosts)

    useEffect(() => {
        const currentUserPosts = allPosts.filter((post) => post.userId === parseInt(currentUser.id))
        console.log("Current User Posts: ", currentUserPosts)
        setUserPosts(currentUserPosts)
    }, [currentUser, allPosts])

    return (

        <div className="posts">
        {userPosts.map((post) => {
            return <div className="post" key={post.id}>
            <header className="post-header">
                    <Link to={`/posts/${post.id}`}>
                    <div className="post-title">{post.title}</div>
                    </Link>
            </header>
                <div><Topic prop={post}/></div>
            </div>
    })}</div>
    )
}