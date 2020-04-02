import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./SideBar";
import Profile from "./Profile";
import HomeFeed from "./HomeFeed";
import TweetDetails from "./TweetDetails";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import Tweet from "./Tweet";
import { CurrentUser } from "./CurrentUserContext";

function App() {
  const { currentUser, status } = React.useContext(CurrentUser);
  return (
    <>
      <GlobalStyles />
      <BigContainer>
        <Router>
          <SideBar />
          <Switch>
            <Route exact path="/">
              <HomeFeed currentUser={currentUser} status={status} />
            </Route>
            <Route exact path="/notifications">
              <Notifications />
            </Route>
            <Route exact path="/bookmarks">
              <Bookmarks />
            </Route>
            <Route exact path="/tweet/:tweetId">
              <TweetDetails>
                <Tweet />
              </TweetDetails>
            </Route>
            <Route exact path="/:profileId">
              <Profile currentUser={currentUser} status={status} />
            </Route>
          </Switch>
        </Router>
      </BigContainer>
    </>
  );
}

const BigContainer = styled.div`
  display: flex;
`;

export default App;
