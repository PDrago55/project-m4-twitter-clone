import React, { useReducer, useEffect } from "react";
import styled from "styled-components";
import CircularProgress from "material-ui-core/CircularProgress";
import { heart } from "react-icons-kit/feather/heart";
import { repeat } from "react-icons-kit/feather/repeat";
import { upload } from "react-icons-kit/feather/upload";
import { messageCircle } from "react-icons-kit/feather/messageCircle";
import Icon from "react-icons-kit";
import TypeForm from "./TypeForm";

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
  post: {}
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
        error: ""
      };
      break;
    case "Fetch Error":
      newState = {
        loading: false,
        post: {},
        error: "something went wrong dude"
      };
      break;
    default:
      return console.log("X");
  }
  return newState;
};

function HomeFeed() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then(res => {
        return res.json();
      })
      .then(data => {
        return dispatch({ type: "Fetch_Success", payload: data });
      })
      .catch(error => {
        console.log("error", error);
        dispatch({ type: "fetch_error" });
      });
  }, []);
  return (
    <div>
      <strong>HOME</strong>
      <TypeForm />
      <div></div>
      <div></div>
      <div></div>
      {state.loading ? (
        <CircularProgress />
      ) : (
        state.post.tweetIds.map(tweet => {
          return (
            <Wrapper>
              <Avatar
                src={state.post.tweetsById[tweet].author.avatarSrc}
              ></Avatar>
              <Name>@{state.post.tweetsById[tweet].author.handle}</Name>
              <TweetContents>
                {state.post.tweetsById[tweet].status}

                {state.post.tweetsById[tweet].media.length > 0 ? (
                  <PostImage
                    src={state.post.tweetsById[tweet].media[0].url}
                  ></PostImage>
                ) : (
                  <></>
                )}
              </TweetContents>
              <Timestamp>{state.post.tweetsById[tweet].timestamp}</Timestamp>
              <IconWrapper>
                <Icon icon={messageCircle}></Icon>
                <Icon icon={heart}></Icon>
                <Icon icon={repeat}></Icon>
                <Icon icon={upload}></Icon>
              </IconWrapper>
              <Divider></Divider>
            </Wrapper>
          );
        })
      )}
      {state.error ? "error" : null}
    </div>
  );
}

const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

const TweetContents = styled.div`
  font-size: 22px;
  padding: 16px 0;
`;

const Timestamp = styled.div`
  color: rgb(101, 119, 134);
  font-size: 16px;
  padding-bottom: 16px;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 16px;
`;

const PostImage = styled.img`
  width: 500px;
  height: 300px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const Wrapper = styled.div`
  background: white;
  width: 780px;
  padding: 16px;
  text-align: left;
  /* padding-bottom: 0; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
`;
export default HomeFeed;
