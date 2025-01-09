import { useState, useEffect} from "react"
import { getAllPosts } from "../../services/postServices"
import { Topic } from "../topics/topic"
import { TopicSelect } from "../topics/topicSelect"
import "./post.css"


export const Posts = () => {
    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [topic, setTopic] = useState(0)

    useEffect(() => {
      getAllPosts().then((postsArray) => setAllPosts(postsArray))
    }, [])

    useEffect(() => {
        if(parseInt(topic) > 0) {
            const filteredPosts = allPosts.filter((post) => post.topicId === parseInt(topic))
            setFilteredPosts(filteredPosts)
        }
        else {
           setFilteredPosts(allPosts)
        }
    }, [topic, allPosts])

    return <>
    <TopicSelect setter={setTopic}/>
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