import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const TempPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        navigate(`/profiles/${id}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        </>
    )
}

export default TempPage