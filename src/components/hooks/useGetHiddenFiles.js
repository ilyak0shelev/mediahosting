import { useState } from "react";
import axios from "axios";

const useGetHiddenFiles = (initialState) => {
    const [hiddenFiles, setHiddenFiles] = useState(initialState)
    let copy = Object.assign([], hiddenFiles);

    const getHiddenFiles = (username) => {
        axios.post("/post/getHiddenFiles", { 'username': username })
            .then((result) => {
                for (let i = 0; i < result.data.length; i++) {
                    copy.push({
                        id: result.data[i].id, name: result.data[i].name, title: result.data[i].title, description: result.data[i].description, tags: result.data[i].tags, type: result.data[i].type, owner: result.data[i].owner, birthtime: result.data[i].birthtime, hidden: result.data[i].hidden
                    })
                    setHiddenFiles(copy)
                }
            })
            .catch((error) => console.log(error))
    }

    const clearHiddenFiles = () => {
        setHiddenFiles([])
    }

    return [hiddenFiles, getHiddenFiles, clearHiddenFiles]
}

export default useGetHiddenFiles