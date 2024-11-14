import { useContext, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setFetched } from "../../store/userFilesSlice";
import { AuthStatusContext } from "../contexts/AuthStatusContext";

const useGetFiles = (initialState) => {
    const [files, setFiles] = useState(initialState)
    const status = useContext(AuthStatusContext)
    const dispatch = useDispatch()
    let copy = Object.assign([], files);

    const getFiles = (username) => {
        axios.post("/post/getFiles", { 'username': username })
            .then((result) => {
                for (let i = 0; i < result.data.length; i++) {
                    copy.unshift({
                        id: result.data[i].id, name: result.data[i].name, title: result.data[i].title, description: result.data[i].description, tags: result.data[i].tags, type: result.data[i].type, owner: result.data[i].owner, birthtime: result.data[i].birthtime, hidden: result.data[i].hidden
                    })
                    setFiles(copy)
                }
                if (status.authStatus.login === username) {
                    dispatch(setFetched(true))
                }
            })
            .catch((error) => console.log(error))
    }

    const clearFiles = () => {
        setFiles([])
        copy.splice(0, copy.length)
    }

    return [files, getFiles, clearFiles]
}

export default useGetFiles