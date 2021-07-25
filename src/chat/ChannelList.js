import React from 'react'
import Channel from './Channel.js'

const ChannelList = (props) => {
    let list = 'There is no channels to show'

    console.log('🦄', props.channels)

    if(props.channels){
        list = props.channels.map((c) => {
            return (
                <Channel key={c.id} name={c.name} participants={c.participants} />
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