import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import AgroEdgeIcon from '../assets/agroedge.jpg'
import LogoutIcon from '../assets/logout.png'

const cookies = new Cookies();

const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
          <div className="icon1__inner">
              <img src={AgroEdgeIcon} alt="AgroEdge" width="30" />
          </div>
      </div>
      <div className="channel-list__sidebar__icon2">
          <div className="icon1__inner" onClick={logout}>
              <img src={LogoutIcon} alt="Logout" width="30" />
          </div>
      </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
      <p className="channel-list__header__text">Community Chat</p>
  </div>
)

// const customChannelTeamFilter = (channels) => {
//   return channels.filter((channel) => channel.type === 'team');
// }

// const customChannelMessagingFilter = (channels) => {
//   return channels.filter((channel) => channel.type === 'messaging');
// }


const ChannelListContainer = () => {

  // const logout = () => {
  //   cookies.remove("token");
  //   cookies.remove('userId');
  //   cookies.remove('username');
  //   cookies.remove('fullName');
  //   cookies.remove('avatarURL');
  //   cookies.remove('hashedPassword');
  //   cookies.remove('phoneNumber');

  //   window.location.reload();
  // }

  //const filters = { members: { $in: [client.userID] } };
 //logout={logout}
  return (
    <>  
      <SideBar />   
      <div className="channel-list__list__wrapper">
        <CompanyHeader/>
        <ChannelSearch/>
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList 
                {...listProps}
                type="team"
                // isCreating={isCreating}
                // setIsCreating={setIsCreating}
                // setCreateType={setCreateType} 
                // setIsEditing={setIsEditing}
                // setToggleContainer={setToggleContainer}
            />
          )}  
          Preview={(previewProps) => (
            <TeamChannelPreview 
                {...previewProps}
                // setIsCreating={setIsCreating}
                // setIsEditing={setIsEditing}
                // setToggleContainer={setToggleContainer}
                type="team"
            />
          )}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList 
                {...listProps}
                type="messaging"
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
            />
          )}  
          Preview={(previewProps) => (
            <TeamChannelPreview 
                {...previewProps}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
                type="messaging"
            />
          )}
        />
      </div>
    </>
  )
}

export default ChannelListContainer
