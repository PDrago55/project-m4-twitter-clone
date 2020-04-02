import React, { useState } from "react";
import styled from "styled-components";
import CircularProgress from "material-ui-core/CircularProgress";
import { CurrentUser } from "./CurrentUserContext";

function TypeForm() {
  const { currentUser, status } = React.useContext(CurrentUser);
  const [tweet, setTweet] = useState("");
  const handleSubmit = e => {
    const data = JSON.stringify({ status: tweet });
    console.log(data);
    e.preventDefault();
    fetch("/api/tweet", {
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      body: data
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        setTweet("");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Wrapper>
      {status === "loading" ? (
        <CircularProgress />
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
            onChange={e => setTweet(e.target.value)}
          />
        </label>
        <Button type="submit">Submit Tweet</Button>
      </form>
      <Divider />
    </Wrapper>
  );
}

const UserWrapper = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 250px;
  position: left;
`;
const InputText = styled.input`
  width: 500px;
  height: 200px;
  border-radius: 12%;
  font-size: 1.5em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
`;

const Divider = styled.div`
  height: 5px;
  background: rgb(230, 236, 240);
`;
const Button = styled.button`
  padding: 10px;
  color: white;
  background-color: blue;
  border-radius: 27%;
  font-size: 1em;
`;

const CurrentAvatar = styled.img`
  width: 58px;
  height: 58px;
  border-radius: 50%;
`;
export default TypeForm;
