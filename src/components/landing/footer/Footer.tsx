import React from "react";
import "../css/footer-css/Footer.css";

import fb_icon from "../../../Resources/Icons/Facebook_icon.svg";
import insta_icon from "../../../Resources/Icons/Instagram_icon.svg";
import tweet_icon from "../../../Resources/Icons/Twitter_icon.svg";
import linkd_icon from "../../../Resources/Icons/Linkedin_icon.svg";

export default function Footer() {
  const mail = "includetype@gmail.com";
  const contacts = ["+91 76860-69410", "+91 89610-73588", "+91 62903-59434"];

  return (
    <div className="footer">
      <div className="footer_container d-flex align-items-end justify-content-between">
        <div className="left_footer">
          <div className="brand_name py-4">#include&lt;TYPE&gt;</div>
          <div className="subscribe">
            <div className="footer_text1">Subscribe to mail: </div>
            <div className="input-group">
              <input
                type="email"
                className="form-control subscribe_input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <div className="input-group-append">
                <button className="subscribe-btn" type="button">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="documentation">
            <span className="footer_text1">Documentation:</span>
            <button className="click_here">Click Here!</button>
          </div>
          <div className="d-flex align-items-center justify-content-between terms">
            <span>&#169;2021 #include&lt;TYPE&gt;&emsp;</span>
            <span>All Rights Reserved&emsp;</span>
            <span className="underline_pointer">Terms & Privacy Policy</span>
          </div>
        </div>
        <div className="right_footer">
          <div className="mail_us me-4">
            <div className="footer_text1 underline_yellow mt-4 mb-2">
              Mail Us:
            </div>
            <div className="footer_mail_contacts">{mail}</div>
          </div>
          <div className="contact_us me-4">
            <div className="footer_text1 underline_yellow mt-4 mb-2">
              Contact Us:
            </div>
            <div className="footer_mail_contacts">
              {contacts.map((contact) => (
                <div key={contact}>{contact}</div>
              ))}
            </div>
          </div>
          <div className="footer_social_icons mt-5">
            <img src={fb_icon} alt="fb_icon" />
            <img src={insta_icon} alt="fb_icon" />
            <img src={tweet_icon} alt="fb_icon" />
            <img src={linkd_icon} alt="fb_icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
