import { useContext } from "react"
import { Data } from "../../App"
import ContentPage from "./ContentPage"

export default function Me() {
    const { user } = useContext(Data)
    return (
        <ContentPage user_id={user.user_id} />
    )
}