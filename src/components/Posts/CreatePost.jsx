import { useEffect, useState } from "react"
import { TopicSelect } from "../topics/topicSelect"
import { createNewPost } from "../../services/postServices"
import "./post.css"

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
        //console.log(postObject)
        createNewPost(postObject).then(getAndSetAllPosts)
        //console.log("Congratulations! You have submitted a new post!")
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
    <form className="post-form">
        <h2 className="post-h2">Create Your New Post!</h2>
        <fieldset className="post-form-title">
            <label className="post-form-label">Your Title:</label>
            <input 
            type="text"
            value={title}
            className="post-form-title-input"
            onChange={(event) => {
                setTitle(event.target.value)
                //console.log(title)
            }}
            />
        </fieldset>
        <fieldset className="post-form-message">
            <label className="post-form-label">Your Post Message:</label>
            <textarea 
            type="text"
            value={body}
            className="post-form-message-input"
            onChange={(event) => {
                setBody(event.target.value)
                //console.log(body)
            }}
            />
        </fieldset>
        <div className="post-form-topic">
                <label className="post-form-label">Choose Your Topic:</label>
                <TopicSelect setter={setTopic}/>
        </div>
    <button 
    className="post-form-submit"
    onClick={handleSavePost}>
        Save and Post
    </button>
    </form>
    </>
}