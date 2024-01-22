import React, { useState } from "react";
import axios from "axios";

const useGetFiles = (initialState) => {
    const [files, setFiles] = useState(initialState)
    let copy = Object.assign([], files);

    const getFiles = (username) => {
        axios.post("/post/getFiles", { 'username': username })
        .then((result) => {
            for (let i = 0; i < result.data.length; i++) {
                copy.push({
                    id: result.data[i].id, name: result.data[i].name, title: result.data[i].title, description: result.data[i].description, tags: result.data[i].tags, type: result.data[i].type, owner: result.data[i].owner, birthtime: result.data[i].birthtime
                })
                setFiles(copy)
            }
        })
        .catch((error) => console.log(error))
    }
    
    const clearFiles = () => {
        setFiles([])
    }

    return [files, getFiles, clearFiles]
}

export default useGetFiles