import { useEffect } from "react";
import Post from "../components/Post";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";


export default function PostPage() {
    const [post, setPost] = useState({})
    const [user, setUser] = useState({})
    const post_id = useParams()["post_id"];
    useEffect(() => {
        axios.get("/post/" + post_id).then((response) => {
            setPost(response.data)
        }).then(
            axios.get("/user/" + post.user_id).then((response) => {
                setUser(response.data)
            }).catch((error) => {})
        ).catch((error) => {
            toast.error("Публикации не найдены");
        })
    }, [post_id, setPost, post.user_id])

    return (
        <>
            <br></br><br></br><br></br>
            <Post 
                username={user.username} 
                user_id={post.user_id} 
                post_id={post.id} 
                title={post.title} 
                content={post.content} 
                timestamp={post.timestamp} 
                noCopyHref
                />

        </> 
    )
}