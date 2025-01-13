import { useState, useEffect } from "react"
import { TopicSelect } from "./topicSelect"
import "./topic.css"

export const TopicFilterBar = ({ allPosts, setFilteredPosts }) => {
    const [topic, setTopic] = useState(0)
    const [searchRequest, setSearchRequest] = useState("")    

    //{console.log(allPosts)}
    //{console.log(filteredPosts)}

    useEffect(() => {
        if(parseInt(topic) > 0) {
            const filteredPosts = allPosts.filter((post) => 
                post.topicId === parseInt(topic) && post.title.toLowerCase().includes(searchRequest.toLowerCase()))      
            setFilteredPosts(filteredPosts)
        }
        else if (searchRequest) {
            const filteredPosts = allPosts.filter((post) => 
                post.title.toLowerCase().includes(searchRequest.toLowerCase()))
            console.log("Search Request: ", searchRequest)
            setFilteredPosts(filteredPosts)
        }
        else {
           setFilteredPosts(allPosts)
        }
    }, [topic, searchRequest, allPosts])

    //{console.log("Topic Id: ", topic)}
    return <>
        <div className="topic-options">
    <TopicSelect setter={setTopic}/>
        <input 
            type="text"
            placeholder="Search by titles"
            value={searchRequest}
            className="topic-search"
            onChange={(event) => setSearchRequest(event.target.value)}>
        </input>
        </div>
    </>
}