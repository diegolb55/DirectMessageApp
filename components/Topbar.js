import { FaUserCircle } from "react-icons/fa"


export const Topbar = ({email}) => {
    return (
        <div className="topBar">
            <FaUserCircle style={{fontSize: "3.5rem", color: "white", margin: "0 25px"}}/>
            <h2>{email}</h2>
        </div>
    )
}