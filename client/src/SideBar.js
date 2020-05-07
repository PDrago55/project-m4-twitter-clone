import React from "react";
import { ReactComponent as Cat } from "../src/assets/logo.svg";
import styled from "styled-components";
import { COLORS } from "./constants";
import { Icon } from "react-icons-kit";
import { home } from "react-icons-kit/feather/home";
import { user } from "react-icons-kit/feather/user";
import { bell } from "react-icons-kit/feather/bell";
import { bookmark } from "react-icons-kit/feather/bookmark";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <StyledContainer>
      <ul>
        <StyledLinks>
          <Cat />
        </StyledLinks>
        <StyledLinks>
          <StyledLink to="/">
            <Icon size={32} icon={home}></Icon>
            Home
          </StyledLink>
        </StyledLinks>
        <StyledLinks>
          <StyledLink to="/:profileId">
            <Icon size={32} icon={user}></Icon>
            Profile
          </StyledLink>
        </StyledLinks>
        <StyledLinks>
          <StyledLink to="/notifications">
            <Icon size={32} icon={bell}></Icon>
            Notifications
          </StyledLink>
        </StyledLinks>
        <StyledLinks>
          <StyledLink to="/bookmarks">
            <Icon size={32} icon={bookmark}></Icon>
            Bookmarks
          </StyledLink>
        </StyledLinks>
      </ul>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 0.25;
`;
const StyledLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  margin: 7px;
  color: black;
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
  display: flex;

  &.active {
    color: ${COLORS.primary};
  }
`;

const StyledLinks = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  font-family: sans-serif;
  display: flex;
  padding-right: 16px;
  margin-top: -6px;

  &:hover {
    background-color: ${COLORS.secondary};
    border: 2px solid ${COLORS.secondary};
    border-radius: 50px;
  }
`;

export default SideBar;
