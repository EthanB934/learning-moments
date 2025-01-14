import { useEffect, useState } from "react"
import { TopicSelect } from "../topics/topicSelect"
import { createNewPost, getAllPosts } from "../../services/postServices"

export const CreatePost = ({ currentUser, getAndSetAllPosts }) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [topic, setTopic] = useState(0)
    const [date, setDate] = useState("")

    const handleSavePost =() => {
        console.log("Button clicked!")
        const postObject = {
            title: title,
            body: body,
            date: date,
            topicId: parseInt(topic),
            userId: currentUser.id
        }
        console.log(postObject)
        createNewPost(postObject).then(getAndSetAllPosts)
        console.log("Congratulations! You have submitted a new post!")
        setTitle("")
        setBody("")
        setTopic(0)
    }

    const findDate = () => {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1 
        const day = date.getDate()
        const formattedDate = `${year}-${month.toString()}-${day.toString()}`
        setDate(formattedDate)
    }

    useEffect(() => {
        findDate()
    }, [])
    //console.log(date)
    //console.log(parseInt(topic))
    return <>
    <form>
        <h2>Create Your New Post!</h2>
        <fieldset>
            <label>Your Title:</label>
            <input 
            type="text"
            value={title}
            onChange={(event) => {
                setTitle(event.target.value)
                //console.log(title)
            }}
            />
        </fieldset>
        <fieldset>
            <label>Your Post Message:</label>
            <textarea 
            type="text"
            value={body}
            onChange={(event) => {
                setBody(event.target.value)
                //console.log(body)
            }}
            />
        </fieldset>
        <label>Choose Your Topic:</label>
        <TopicSelect setter={setTopic}/>
    </form>
    <button onClick={handleSavePost}>Save and Post</button>
    </>
}