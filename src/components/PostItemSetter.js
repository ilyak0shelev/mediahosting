import React, { useState } from 'react'

import '../styles/PostItemSetter.css'

const FileTypeSetter = (props) => {

    const address = 'http://192.168.1.6:3000'

    if (props.file.type.match('image')) {
        return (<img className={props.className} name={props.file.name} alt={props.file.name} key={props.file.id} src={`${address}/${props.path}/images/${props.file.name}`} />)
    }
    else if (props.file.type.match('video')) {
        return (
        <div className='vidCont'>
        <video onMouseOver={(event) => {event.target.play()}} onMouseLeave={(event) => {event.target.pause()}} className={props.className} name={props.file.name} 
               alt={props.file.name} key={props.file.id} src={`${address}/${props.path}/videos/${props.file.name}`} muted autoPlay loop>
        </video>
        <span className='vidSpan'>video</span>
        </div>
        )
    }
}

export default FileTypeSetter