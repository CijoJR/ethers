import "./Footer.css";

import React from "react";

 const Footer = React.memo(() => {
  return (
    <>
      <div className="Footer">
        <div className="FLeft">
          <p>ETHER LABS. Born to create. Create to inspire</p>
          <div className="FooterMotto">
            Born to Create.
            <br />
            &ensp;&ensp;&ensp; Create to Inspire.
          </div>
        </div>
        <div className="FRight">
          <div className="FRTop">
            <div className="FRTLeft">
              <div className="H"> DIRECTORY </div>
              <p> Home </p>
              <p> Profile </p>
              <p> Roadmap </p>
              <p> Gallery </p>
              <p> About </p>
            </div>
            <div className="FRTRight">
              <div className="H"> SOCIALS </div>
              <p> Ether.site </p>
              <p> X/Twitter </p>
              <p> Discord </p>
              <p> Instagram </p>
            </div>
          </div>
        </div>
      </div>
      <div className="FooterBlock">
        <p>ETHER LABS</p>
        <div className="FRBottom">
          <p>Website created by Cijo. Not affiliated with Project ETHER.</p>
        </div>
        <div className="FooterBall" />
      </div>
    </>
  );
});
Footer.displayName = "Footer";
export default Footer;
