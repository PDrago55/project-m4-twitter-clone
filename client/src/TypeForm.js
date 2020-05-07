import React, { useState } from "react";
import styled from "styled-components";
import CircularProgress from "material-ui-core/CircularProgress";
import { CurrentUser } from "./CurrentUserContext";
import ErrorPage from "./ErrorPage";
function TypeForm() {
  const { currentUser, status } = React.useContext(CurrentUser);
  const [tweet, setTweet] = useState("");
  const [error, setError] = useState("error");
  const handleSubmit = e => {
    e.preventDefault();
    const data = JSON.stringify({ status: tweet });

    fetch("/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        return setTweet("");
      })
      .catch(error => {
        setError("error");
        console.log(error);
      });
  };
  const cheapRefresh = () => {
    window.location.reload(false);
  };
  return (
    <Wrapper>
      <div></div>
      {status === "loading" ? (
        <CircularProgress />
      ) : error === "error" && status === "loading" ? (
        <ErrorPage />
      ) : (
        Object.values(currentUser).map(value => {
          return (
            <UserWrapper>
              <CurrentAvatar src={value.avatarSrc}></CurrentAvatar>
              <div>@{value.handle}</div>
            </UserWrapper>
          );
        })
      )}
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          <InputText
            type="text"
            placeholder="Something on your mind?"
            value={tweet}
            maxLength="280"
            onChange={e => setTweet(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" className="Button" onClick={cheapRefresh}>
        </input>
      </form>
      <Divider />
    </Wrapper>
  );
}

const UserWrapper = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
border: 1px solid #ededed;
  form {
    display: flex;
    flex-direction: column;
    border-bottom: 8px solid #ededed;
    .Button {
      padding: 20px;
      align-self: flex-end;
      height: 50px;
      width: 100px;
      color: white;
      font-weight: 800:
      font-size: 14px;
      font-family: sans-serif;
      background-color: blue;
      border-radius: 50px;
      text-transform: uppercase;
    }
  }

`;
const InputText = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 5%;
  font-size: 1.5em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  color: ${tweet => {
    const limit = tweet.value;
    if (limit.length > 40 && limit.length <= 99) {
      return "green";
    } else if (limit.length >= 100 && limit.length <= 199) {
      return "orange";
    } else if (limit.length >= 200 && limit.length <= 280) {
      return "red";
    }
  }};
`;

const Divider = styled.div`
  height: 5px;
  background: rgb(230, 236, 240);
`;
const Button = styled.button`
  padding: 20px;
  align-self: flex-end;
  height: 50px;
  width: 50px;
  color: white;
  font-weight: bold:
  font-family: sans-serif;
  background-color: blue;
  border-radius: 27%;
  text-transform: uppercase;
  font-size: 1em;
`;

const CurrentAvatar = styled.img`
  width: 58px;
  height: 58px;
  border-radius: 50%;
`;
export default TypeForm;
