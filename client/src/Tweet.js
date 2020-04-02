import React, { useEffect } from "react";

function Tweet() {
  useEffect(() => {
    fetch("/api/tweet/")
      .then(res => {
        console.log(res);
        res.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  });
  return (
    <div>
      fsfds
      <div> Will this show somewhere?</div>
    </div>
  );
}

export default Tweet;
