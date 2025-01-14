export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts?_embed=userLikedPosts").then((res) => res.json())
}

export const getAllUserLikes = () => {
    return fetch(`http://localhost:8088/userLikedPosts`).then((res) => res.json())
}

export const  userLikedPost = (relationship) => {
    return fetch ("http://localhost:8088/userLikedPosts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(relationship)
    })
}

export const createNewPost = (postObject) => {
    return fetch ("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObject)
    })
}

export const deleteMyPost = (postObjectId) => {
    return fetch (`http://localhost:8088/posts/${postObjectId}`, {
        method: "Delete"
    })
}