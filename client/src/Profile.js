import React from "react";
import CircularProgress from "material-ui-core/CircularProgress";
import styled from "styled-components";

function Profile({ currentUser, status }) {
  console.log("USER", currentUser);
  console.log(status);
  return (
    <div>
      {status === "loading" ? (
        <CircularProgress />
      ) : (
        Object.values(currentUser).map(value => {
          return (
            <>
              <BackDrop src={value.bannerSrc}></BackDrop>
              <Wrapper>
                <Avatar src={value.avatarSrc}></Avatar>
                <Name>@{value.handle}</Name>
                <div>{value.displayName}</div>
                <div>{value.location}</div>
                <Timestamp>{value.joined}</Timestamp>
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
  width: 700px;
  height: 350px;
  z-index: 1;
  position: relative;
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

const Timestamp = styled.div`
  color: rgb(101, 119, 134);
  font-size: 16px;
  padding-bottom: 16px;
`;
export default Profile;
