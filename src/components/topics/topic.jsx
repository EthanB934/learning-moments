import { useEffect, useState } from "react"
import { getAllTopics } from "../../services/topicServices"

export const Topic = ({ prop }) => {
    const [allTopics, setAllTopics] = useState([])

    useEffect(() => {
        getAllTopics().then((topicsArray) => setAllTopics(topicsArray))
    }, [])

    const postTopic = allTopics.find((topic) => topic.id === prop.topicId)

    return  <>
    <footer>
        {console.log(postTopic)}
            <div className="post-topic"> - {postTopic?.topic}</div>
        </footer>
    </>
}