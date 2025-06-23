import React from "react";
import { useParams } from "react-router-dom";

export default function Dashboard() {
    const { username } = useParams()

    return (<>
        <div className="user-dashboard-container">
            <h1>Welcome {username}!</h1>

        </div>
    </>)
}