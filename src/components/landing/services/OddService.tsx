import React from "react";
import bullet_point from "../../../Resources/Images/feature illustrations/Bullet_Point.svg";
import "../css/services-css/OddService.css";

export default function OddService(props: any) {
  return (
    <div className="odd_service d-flex justify-content-between">
      <div className="odd_service_left_side">
        <img src={props.service.image} alt="dashboard reports" />
      </div>
      <div className="odd_service_right_side" style={{ backgroundImage: `url(${props.service.background})` }}>
        <div className="service_title d-flex justify-content-start">
          <span>
            <img
              src={bullet_point}
              className="feature_bullet_point_odd"
              alt="bullet_point"
            />
          </span>
          &ensp;{props.service.title}
        </div>
        <div className="odd_service_text">
          <div className="mb-5 text-left">{props.service.description_1}</div>
          <div className="mb-5 text-left">{props.service.description_2}</div>
          <div className="mb-4 text-left">{props.service.description_3}</div>
        </div>
      </div>
    </div>
  );
}
