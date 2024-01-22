import React from 'react'

const FileTypeSetter = (props) => {
    if (props.file.type.match('image')) {
        return (<img className={props.className} name={props.file.name} alt={props.file.name} key={props.file.id} src={`http://192.168.1.2:3000/${props.path}/images/${props.file.name}`} />)
    }
    else if (props.file.type.match('video')) {
        return (<video className={props.className} name={props.file.name} alt={props.file.name} key={props.file.id} src={`http://192.168.1.2:3000/${props.path}/videos/${props.file.name}`} loop controls />)
    }
}

export default FileTypeSetter