import { useEffect, useState } from "react"
import { getAllTopics } from "../../services/topicServices"

export const Topic = ({ prop }) => {
    const [allTopics, setAllTopics] = useState([])

    useEffect(() => {
        getAllTopics().then((topicsArray) => setAllTopics(topicsArray))
    }, [])

    const postTopic = allTopics.find((topic) => topic.id === prop.topicId)
    //console.log("Prop Object", prop)
    //console.log("All Topics", allTopics)
    //console.log("Post Topic", postTopic)
    return  <>
    {postTopic ? <footer><div className="post-topic"> - {postTopic.topic}</div></footer> 
               : <div>Loading...</div>}
    </>
}