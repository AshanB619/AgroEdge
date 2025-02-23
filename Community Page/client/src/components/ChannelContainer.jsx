import React from 'react';
import { Channel, useChatContext } from 'stream-chat-react';

//import { ChannelInner, CreateChannel, EditChannel, TeamMessage } from './';

import ChannelInner from '../components/ChannelInner';
import CreateChannel from '../components/CreateChannel';
import EditChannel from '../components/EditChannel';
import TeamMessage from '../components/TeamMessage';

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {  
    const { channel } = useChatContext();

    if(isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    if(isEditing) {
        return (
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing} />
            </div> 
        )
    }

    const EmptyState = () => (
        <div className="channel-empty__container">
            <p className="channel-empty__first">This is the beginning of your chat history.</p>
            <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
        </div>
    );

    const CustomMessage = (messageProps) => {
        return <TeamMessage {...messageProps} />;
    };

    return (
        <div className=" channel__container">
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={CustomMessage}
            >
                <ChannelInner setIsEditing={setIsEditing} />
            </Channel>
        </div>
    );
};

export default ChannelContainer;
