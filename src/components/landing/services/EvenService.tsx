import React from "react";
import bullet_point from "../../../Resources/Images/feature illustrations/Bullet_Point.svg";
import "../css/services-css/EvenService.css";

export default function EvenService(props: any) {
  return (
    <div className="even_service d-flex justify-content-between">
      <div
        className="even_service_left_side"
        style={{ backgroundImage: `url(${props.service.background})` }}
      >
        <div className="service_title d-flex justify-content-end">
          {props.service.title}&ensp;
          <span>
            <img
              src={bullet_point}
              className="feature_bullet_point_even"
              alt="bullet_point"
            />
          </span>
        </div>
        <div className="even_service_text">
          <div className="mb-5 text-right">{props.service.description_1}</div>
          <div className="mb-5 text-right">{props.service.description_2}</div>
          <div className="mb-4 text-right">{props.service.description_3}</div>
        </div>
      </div>
      <div className="even_service_right_side">
        <img src={props.service.image} alt="dashboard reports" />
      </div>
    </div>
  );
}
