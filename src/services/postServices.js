export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts?_embed=userLikedPosts").then((res) => res.json())
}