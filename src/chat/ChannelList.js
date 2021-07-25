import React from 'react'
import Channel from './Channel.js'

const ChannelList = (props) => {
    let list = 'There is no channels to show'

    
    const handleClick = (id) => {
        // TODO: DELETE
        console.log('🦄', id)
        props.onSelectChannel(id)
    }

    if(props.channels){
        list = props.channels.map((c) => {
            return (
                <Channel key={c.id} id={c.id} name={c.name} participants={c.participants} onClick={handleClick} />
            )
        })
    }

    return (
        <div className="channel-list">
            {list}
        </div>
    )
}

export default ChannelList