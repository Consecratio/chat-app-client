import React from 'react'

const Channel = (props) => {
    console.log('🦄', props)

    return (
        <div className='channel-item'>
            <div>{props.name}</div>
            <span>{props.participants}</span>
        </div>
    )
}

export default Channel