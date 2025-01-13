import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllPosts } from "../../services/postServices"
import { getUsersById } from "../../services/userService"
import { getTopicById } from "../../services/topicServices"

export const PostDetails = () => {
    const [post, setPost] = useState({})
    const [author, setAuthor] = useState({})
    const [topic, setTopic] = useState({})
    const { postId } = useParams()

    useEffect(() => {
        getAllPosts()
        .then((postsArray) => {
            const allPosts = postsArray
            const thisPost = allPosts.find((post) => post.id === parseInt(postId))
            setPost(thisPost)
        })
    }, [])

    useEffect(() => {
        getUsersById(post.userId)
        .then((usersArray) => {
            const author = usersArray[0]
            //console.log(post)
            //console.log(author)
            setAuthor(author)
        })
    }, [post])

    useEffect(() => {
        getTopicById(post.topicId)
        .then((topicArray) => {
            const topic = topicArray[0]
            //console.log(topic)
            setTopic(topic)
        })
    }, [post])

    return <section>
    <div>
        <h1>{post.title}</h1>
    </div>
    <div>
        {author ? author.name : "Loading author..."}
    </div>
    <div>
        {topic ? topic.topic : "Topic loading..."}
    </div>
    <div>
        {post.body}
    </div>
    <div>
        {post.date}
    </div>
    <div>
        {post ? post.userLikedPosts?.length : "Likes loading..."}
    </div>
    </section>
}

/*
    Problem: I need to display information unique to each post. 

    Tasks:
    (1) I need to get all of my post objects 
    (2) Compare their unique ids to the one captured in useParams
    (3) Hold this post object in state
    (4) Begin returning information about this post
        (a) The Post Title
        (b) The Author's Name of the Post
        (c) The Post's Topic
        (d) The Post's Body
        (e) The date the post was made
        (f) The likes count for this post 
    (5) Check the current user data: is the user is the author of the post?
    (6) If yes, display a button for the author to edit their post. Else, do not. 

*/