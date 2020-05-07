import React from "react";
import CircularProgress from "material-ui-core/CircularProgress";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { mapPin } from "react-icons-kit/feather/mapPin";
import { calendar } from "react-icons-kit/feather/calendar";

function Profile({ currentUser, status }) {
  return (
    <div>
      {status === "loading" ? (
        <CircularProgress />
      ) : (
        Object.values(currentUser).map((value) => {
          const dateFormat = new Date(value.joined);
          let monthNumber = dateFormat.getMonth();
          let monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          let monthName = monthNames[monthNumber];
          let yearNumber = dateFormat.getFullYear();
          return (
            <>
              <BackDrop src={value.bannerSrc}></BackDrop>
              <Wrapper>
                <Avatar src={value.avatarSrc}></Avatar>
                <Name>@{value.handle}</Name>
                <div>{value.displayName}</div>
                <Holder>
                  <Icon size={18} icon={mapPin}></Icon>
                  <div>{value.location}</div>
                </Holder>
                <Timestamp>
                  <Icon size={18} icon={calendar}></Icon>
                  {"Joined " + monthName + " " + yearNumber}
                </Timestamp>
                <TweetContents>{value.bio}</TweetContents>
                <span>
                  {" "}
                  <div>
                    Following {value.numFollowing} Followers{" "}
                    {value.numFollowers}
                  </div>
                </span>
              </Wrapper>
            </>
          );
        })
      )}
    </div>
  );
}
const TweetContents = styled.div`
  font-size: 22px;
  padding: 16px 0;
`;

const BackDrop = styled.img`
  display: block;
  max-width: 100%;
  max-height: 300px;
  width: auto;
  height: auto;
`;
const Avatar = styled.img`
  width: 98px;
  height: 98px;
  border-radius: 50%;
`;
const Name = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.1em;
`;
const Wrapper = styled.div`
  background: white;
  width: 780px;
  padding: 16px;
  text-align: left;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  position: absolute;
  z-index: 2;
`;

const Holder = styled.div`
  display: flex;
`;

const Timestamp = styled.div`
  color: rgb(101, 119, 134);
  font-size: 16px;
  padding-bottom: 16px;
`;
export default Profile;
