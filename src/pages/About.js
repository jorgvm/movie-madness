import React from "react";
//
import Wysiwyg from "../components/Wysiwyg";

class About extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>About</h1>

        <Wysiwyg>
          <p>
            I built this just to have some fun with React, routing, styled
            components, API's and Firebase
            <br />
            &ndash; Jorg
          </p>

          <p style={{ marginTop: "50px" }}>
            Demo on{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://movie-madness-tm.firebaseapp.com"
            >
              Firebase
            </a>
            <br />
            Check out the{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/jorgvm/movie-madness"
            >
              Git repository on Github
            </a>
            <br />
            <br />
          </p>

          <p>Sources used:</p>

          <ul>
            <li>
              {`Cinema image: `}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.flickr.com/photos/chrisinplymouth/36966319841/in/photolist-YjA416-qVRQ4V-BSePho-J6KB2T-ZHtCeP-WXKvJT-i5EiBn-W8iR51-6skw3V-Uq3U4w-qrqjUo-cGWM59-cGWrTb-21V7v2f-cGWrHh-XXz3Ga-4JhRMc-715AAE-byiNro-bNyeGK-6WFTYc-qdeqZa-bNyeBr-Yo73uR-2ca9TP-buVwj4-XfLBWo-cGWsm7-pmAgbG-cGWs8h-WXKAVz-6a7Pfz-gvbCbM-UeB4hQ-rTraYS-VWzfyZ-WXzLhF-bvSBGF-21mGQvj-gvaNQ6-94kxVG-UsivRm-z9ZdLp-THcx9w-ebR4S5-YbbMts-7DKFWS-39tbmG-9Fy7Te-8ZsaXT"
              >
                chrisinplymouth
              </a>
            </li>
            <li>newsapi.org </li>
            <li>omdbapi.com</li>
            <li>tvmaze.com</li>
          </ul>
        </Wysiwyg>
      </div>
    );
  }
}

export default About;
