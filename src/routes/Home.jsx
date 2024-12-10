import { useNavigate } from "react-router";
import { useEffect } from "react";

function Root() {
    let navigate = useNavigate();

    useEffect(() => {
        navigate("/login")
    },[])

    return (
        <div></div>
    )    
}

export default Root;