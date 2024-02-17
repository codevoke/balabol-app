import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import './Post.css';

export default function Post({ username, user_id, post_id, title, content, timestamp, noCopyHref=true }) {
    const navigate = useNavigate();
    const redirect = () => {
        navigate('/user/' + user_id);
    }
    return (
        <div className="Post">
            <div className="PostHeader">{title}</div>
            <p className="PostContent">{content}</p>
            <hr></hr>
            <div className="PostFooter">
                <span className="PostDate">{timestamp}</span>
                <span className="UserHref"
                    onClick={redirect}
                >@{username}</span>
            </div>
            {!noCopyHref ?
                (
                <>
                    <hr></hr>
                    <div className="PostHref" onClick={() => { 
                        navigator.clipboard.writeText(`https://balabol.netlify.app/post/${post_id}`)
                        toast.success("Ссылка скопирована");
                    }} >
                        скопировать ссылку на пост
                    </div>
                </>)
                :
                null
            }
        </div>
    )
}