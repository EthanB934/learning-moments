import { useState, useEffect} from "react"
import { getAllPosts } from "../../services/postServices"
import { Topic } from "../topics/topic"
import { TopicFilterBar } from "../topics/topicFilterBar"
import { LikedPosts } from "./LikedPost"
import "./post.css"
import { Link, Route } from "react-router-dom"


export const Posts = ({ allPosts }) => {
    //const [allPosts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    

    // useEffect(() => {
    //   getAllPosts().then((postsArray) => setAllPosts(postsArray))
    // }, [])



    return <>
    <TopicFilterBar allPosts={allPosts} 
                    setFilteredPosts={setFilteredPosts}/>
                    
    <div className="posts">
        {filteredPosts.map((post) => {
            return <div className="post" key={post.id}>
            <header className="post-header">
                    <Link to={`/posts/${post.id}`}>
                    <div className="post-title">{post.title}</div>
                    </Link>
            </header>
                <div><Topic prop={post}/></div>
                <div className="post-likes fa-solid fa-thumbs-up"><LikedPosts prop={post}/></div>
            </div>
    })}</div>
    </>
}