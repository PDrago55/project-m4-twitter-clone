import React, { useReducer, useEffect } from "react";
import styled from "styled-components";
import CircularProgress from "material-ui-core/CircularProgress";
import { heart } from "react-icons-kit/feather/heart";
import { repeat } from "react-icons-kit/feather/repeat";
import { upload } from "react-icons-kit/feather/upload";
import { messageCircle } from "react-icons-kit/feather/messageCircle";
import Icon from "react-icons-kit";
import TypeForm from "./TypeForm";
import ErrorPage from "./ErrorPage";
import { Link } from "react-router-dom";

const initialState = {
  loading: true,
  handle: "",
  displayName: "",
  bannerSrc: "",
  location: "",
  joined: "",
  bio: "",
  numFollowing: null,
  numOfFollowers: null,
  tweetsById: {},
  tweetIds: [],
  numLikes: null,
  isFollowingYou: null,
  isBeingFollowedByYou: null,
  error: "",
  post: {},
};

const reducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "Fetch_Success":
      newState = {
        handle: state.handle,
        displayName: state.displayName,
        bannerSrc: state.bannerSrc,
        location: state.location,
        joined: state.joined,
        bio: state.bio,
        tweetIds: state.tweetIds,
        tweetsById: state.tweetsById,
        loading: false,
        post: action.payload,
        error: "",
      };
      break;
    case "Fetch_Error":
      newState = {
        loading: false,
        post: {},
        error: "Something went Wrong",
      };
      break;
    default:
      return console.log("X");
  }
  return newState;
};

function HomeFeed() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const date = format(new Date(), "K:mm  a · PPP");
  // console.log(date);
  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return dispatch({ type: "Fetch_Success", payload: data });
      })
      .catch((error) => {
        console.log(error);
        return dispatch({ type: "Fetch_Error" });
      });
  }, []);
  return (
    <Wrapper>
      <strong>HOME</strong>
      <TypeForm />
      <Divider></Divider>
      {state.loading ? (
        <CircularProgress />
      ) : state.error ? (
        <ErrorPage />
      ) : (
        state.post.tweetIds.map((tweet) => {
          const dateFormat = new Date(state.post.tweetsById[tweet].timestamp);
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
            <OneTweet>
              <Top>
                <Avatar
                  src={state.post.tweetsById[tweet].author.avatarSrc}
                ></Avatar>
                <DisplayName>
                  <Link to="/:profileId">
                    {state.post.tweetsById[tweet].author.displayName}
                  </Link>
                </DisplayName>
                <Timestamp>
                  {" "}
                  {monthName + " " + dayNumber + nth(dayNumber)}
                </Timestamp>
              </Top>
              <Name>@{state.post.tweetsById[tweet].author.handle}</Name>
              <Middle>
                <Link to={`/tweet/${tweet}`}>
                  <TweetContents>
                    <Idk>{state.post.tweetsById[tweet].status}</Idk>
                    {state.post.tweetsById[tweet].media.length > 0 ? (
                      <PostImage
                        src={state.post.tweetsById[tweet].media[0].url}
                      ></PostImage>
                    ) : (
                      <></>
                    )}
                  </TweetContents>
                </Link>
              </Middle>
              <IconWrapper>
                <Icon icon={messageCircle}></Icon>
                <Icon icon={heart}></Icon>
                <Icon icon={repeat}></Icon>
                <Icon icon={upload}></Icon>
              </IconWrapper>
            </OneTweet>
          );
        })
      )}
    </Wrapper>
  );
}

const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ededed;
`;

const Idk = styled.div`
  display: flex;
`;
const Middle = styled.div`
  display: flex;
  flex-direction: row;
  a {
    text-decoration: none;
    display: flex;
    margin: 7px;
    color: black;
  }
`;
// const UserLink = styled.div`
//   a {
//     text-decoration: none;
//     display: flex;
//     margin: 7px;
//     color: black;
//   }
// `;
const Top = styled.div`
  display: flex;
`;
const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

const DisplayName = styled.div`
  a {
    text-decoration: none;
    display: flex;
    margin: 7px;
    color: black;
  }
  ,font-weight: bold;
`;
const TweetContents = styled.div`
  font-family: sans-serif;
  font-size: 22px;
  padding: 5px 0px;
`;

const Timestamp = styled.div`
  color: rgb(101, 119, 134);
  font-size: 16px;
  margin-top: 7px;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 16px;
`;

const PostImage = styled.img`
  width: 400px;
  height: 200px;
  border-radius: 10px;
`;

const OneTweet = styled.div`
  padding: 20px;
  border: 1px solid #ededed;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Space = styled.div`
background-color: white;
padding 30px;`;

const Wrapper = styled.div`
  background: white;
  width: 780px;
  padding: 16px;
  position: relative;
  text-align: left;
  /* padding-bottom: 0; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
`;
export default HomeFeed;
