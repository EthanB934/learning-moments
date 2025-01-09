export const LikedPosts = ({ prop }) => {
    
    return <>
    {prop.userLikedPosts.length > 0 ? <div>Likes: {prop.userLikedPosts.length}</div> 
                         : <div>Likes: Be the first to like!</div>}
    </>
}