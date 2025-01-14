export const LikedPosts = ({ prop }) => {
    
    return <>
    {prop.userLikedPosts.length > 0 ? <div className="post-likes">{prop.userLikedPosts.length}</div> 
                         : <div className="post-likes">{prop.userLikedPosts.length}</div>}
    </>
}