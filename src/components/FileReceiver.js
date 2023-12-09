import { useEffect, useContext } from "react";
import { AuthStatusContext } from "./contexts/AuthStatusContext";
import axios from "axios";

const FileReceiver = () => {
    const status = useContext(AuthStatusContext)

    useEffect(() => {
        if (status.authStatus.authorized) {
            axios.post('/post/getFiles', {login: status.authStatus.login})
            .then()
            .catch()
        }
    }, [status, status.authStatus.authorized])

    return null
}

export default FileReceiver