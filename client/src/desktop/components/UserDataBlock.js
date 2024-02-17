import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

import './UserDataBlock.css'
import { toast } from "react-toastify"


export default function UserDataBlock({ user_id }) {
    const [user, setUser] = useState({})
    useEffect(() => {
        axios.get('/user/' + user_id).then((response) => {
            setUser(response.data)
        }).catch((error) => {
            setUser({name: "Пользователь не найден", username: "_@"})
            toast.error("Пользователь не найден");
        })
    }, [user_id ])
    return (
        <div className="UserDataBlock">
            <h1>{user.name}</h1>
            <h4>@{user.username}</h4>
        </div>
    )
}