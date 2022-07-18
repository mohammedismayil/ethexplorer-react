import React from "react";

export default function Footer() {
  return (
    <div className="flex align-center justify-center  bottom-10 fixed inset-x-0 text-center bg-center">
      <div className="flex">
        Made with&nbsp;
        <g-emoji
          className="g-emoji"
          alias="heart"
          fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png"
        >
          <img
            className="emoji"
            alt="heart"
            height={21}
            width={21}
            src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png"
          />
        </g-emoji>{" "}
        &nbsp;by&nbsp;
        <a href="https://mohammedismayil.github.io"> Ismayil</a>
      </div>
    </div>
  );
}
