import { useState, useEffect} from "react"
import { getAllPosts } from "../../services/postServices"
import { Topic } from "../topics/topic"
import "./post.css"


export const Posts = () => {
    const [allPosts, setAllPosts] = useState([])
    

    useEffect(() => {
      getAllPosts().then((postsArray) => setAllPosts(postsArray))
    }, [])

    return <>
    <div className="posts">
        {allPosts.map((post) => {
            return <div className="post" key={post.id}>
            <header className="post-header">
                    <div className="post-title">{post.title}</div> 
            </header>
                <div><Topic prop={post}/></div>
            </div>
    })}</div>
    </>
}