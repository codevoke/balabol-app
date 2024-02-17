import { useEffect, useState } from "react"

import './ContentPage.css'
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import UserDataBlock from "../components/UserDataBlock";
import axios from "axios";
import Post from "../components/Post";


export default function ContentPage({ user_id }) {
    const [postList, setPostList] = useState([])
    const [user, setUser] = useState({})
    const param_user_id = useParams()
    user_id = user_id || param_user_id["user_id"]

    useEffect(() => {
        axios.get("/user/" + user_id).then((response) => {
            setUser(response.data)
        })
        axios.get("/user-posts/" + user_id).then((response) => {
            setPostList(response.data.posts)
        }).catch((error) => {
            toast.error("Публикации не найдены");
        })
    }, [user_id, setPostList])
    return (
        <div className="ContentPage">
            <UserDataBlock user_id={user_id} />
            <hr></hr>
            {postList.map((post) => {
                return (
                    <Post
                        username={user.username}
                        user_id={post.user_id}
                        post_id={post.id}
                        title={post.title}
                        content={post.content}
                        timestamp={post.timestamp}
                    />
                )
            })}
        </div>
        
    )
}