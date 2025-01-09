import { useState, useEffect} from "react"
import { getAllPosts } from "../../services/postServices"
import { Topic } from "../topics/topic"
import { TopicFilterBar } from "../topics/topicFilterBar"
import "./post.css"


export const Posts = () => {
    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])

    useEffect(() => {
      getAllPosts().then((postsArray) => setAllPosts(postsArray))
    }, [])

    return <>
    <TopicFilterBar allPosts={allPosts} 
                    setFilteredPosts={setFilteredPosts}/>

    <div className="posts">
        {filteredPosts.map((post) => {
            return <div className="post" key={post.id}>
            <header className="post-header">
                    <div className="post-title">{post.title}</div> 
            </header>
                <div><Topic prop={post}/></div>
            </div>
    })}</div>
    </>
}