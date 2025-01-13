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