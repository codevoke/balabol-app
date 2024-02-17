import { useContext } from 'react';
import { Data } from "../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Logout () {
    const navigate = useNavigate();
    const { setter } = useContext(Data);
    setter({
        auth: false,
        access_token: null,
        username: null,
        user_id: null
    })
    navigate('/sign-in');
    toast.success("Вы вышли из аккаунта");
}