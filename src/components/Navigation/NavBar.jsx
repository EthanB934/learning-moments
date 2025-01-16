import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
    <ul className="navbar">
        <li className="navbar-item">
            <Link className="navbar-link" to="/posts">All Posts</Link>
        </li>
        <li className="navbar-item">
            <Link className="navbar-link" to="/posts/myPosts">My Posts</Link>
        </li>
        <li className="navbar-item">
            <Link className="navbar-link" to="/posts/form">New Post</Link>
        </li>
        <li className="navbar-item">
            <Link className="navbar-link" to="">Favorites</Link>
        </li>
        <li className="navbar-item">
            <Link className="navbar-link" to="">Profile</Link>
        </li>
        {localStorage.getItem("learning_user") ? (
  <li className="navbar-item navbar-logout">
    <Link
      className="navbar-link"
      to=""
      onClick={() => {
        localStorage.removeItem("learning_user")
        navigate("/", { replace: true })
      }}
    >
      Logout
    </Link>
  </li>
) : (
  ""
)}
    </ul>
)
}