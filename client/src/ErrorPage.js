import React from "react";
import { u1F4A3 as Bomb } from "react-icons-kit/noto_emoji_regular/u1F4A3";
import Icon from "react-icons-kit";
export default function ErrorPage() {
  return (
    <div>
      <h1>Sorry Bruh, Random Error</h1>
      <h2>Please Refresh the Page to get what you want </h2>
      <Icon icon={Bomb} size={550}></Icon>
    </div>
  );
}
