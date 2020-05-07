import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { heart } from "react-icons-kit/feather/heart";
import { repeat } from "react-icons-kit/feather/repeat";
import { upload } from "react-icons-kit/feather/upload";
import { messageCircle } from "react-icons-kit/feather/messageCircle";
import { CurrentUser } from "./CurrentUserContext";
import Icon from "react-icons-kit";
import { CircularProgress } from "material-ui-core";
function Tweet() {
  const { status } = React.useContext(CurrentUser);
  const params = useParams();
  const [oneTweet, setOneTweet] = useState("");
  useEffect(() => {
    fetch(`/api/tweet/${params.tweetId}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setOneTweet(data);
      });
  }, [params.tweetId]);
  return (
    <Wrapper>
      {status === "loading" ? (
        <CircularProgress />
      ) : (
        Object.values(oneTweet).map((tweet) => {
          const dateFormat = new Date(tweet.timestamp);
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
          let dayNumber = dateFormat.getDate();
          function nth(n) {
            return (
              ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th"
            );
          }
          return (
            <TweetWrapper>
              <Holder>
                <Avatar src={tweet.author.avatarSrc}></Avatar>
                <Handle>@{tweet.author.handle}</Handle>
                <Name>{tweet.author.displayName}</Name>
              </Holder>
              <Timestamp>
                {monthName + " " + dayNumber + nth(dayNumber)}
              </Timestamp>
              <TweetContents>{tweet.status}</TweetContents>
              {tweet.media.length > 0 ? (
                <PostImage src={tweet.media[0].url}></PostImage>
              ) : (
                <></>
              )}
              <IconWrapper>
                <Icon icon={messageCircle}></Icon>
                <Icon icon={heart}></Icon>
                <Icon icon={repeat}></Icon>
                <Icon icon={upload}></Icon>
              </IconWrapper>
            </TweetWrapper>
          );
        })
      )}
    </Wrapper>
  );
}

const Holder = styled.div`
  display: flex;
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
const PostImage = styled.img`
  width: 400px;
  height: 200px;
`;

const Handle = styled.div`
  margin: 18px;
`;
const TweetContents = styled.div`
  font-size: 22px;
  padding: 16px 0;
`;
const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const TweetWrapper = styled.div`
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

const Name = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 16px;
`;
const Timestamp = styled.div`
  color: rgb(101, 119, 134);
  font-size: 16px;
  padding-bottom: 16px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 250px;
`;
export default Tweet;
