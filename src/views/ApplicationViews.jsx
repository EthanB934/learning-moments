import { Routes, Route, Outlet } from "react-router-dom"
import { Posts } from "../components/postList/postList"
import { NavBar } from "../components/Navigation/NavBar"
import { useEffect, useState } from "react"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user")
        const learningUserObj = JSON.parse(localLearningUser)
        setCurrentUser(learningUserObj)
    }, [])

    //console.log("Current User: ", currentUser, typeof currentUser)

    return (
        <Routes>
            <Route 
            path="/"
            element={
                <>
                <NavBar />
                <Outlet />
                </>
            }
        >
            <Route path="/"/>
            <Route index  element={<Posts />} /> 
        </Route>
        </Routes>
    )
}