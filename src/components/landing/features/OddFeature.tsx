import React from "react";
import bullet_point from "../../../Resources/Images/feature illustrations/Bullet_Point.svg";
import "../css/features-css/OddFeature.css";
import { Feature } from "./Feature";

interface OddFeatureProps {
  feature: Feature
};

export default function OddFeature(props: OddFeatureProps) {
  return (
    <div className="odd_feature d-flex justify-content-between">
      <div className="odd_feature_left_side">
        <img src={props.feature.image} alt="dashboard reports" />
      </div>
      <div className="odd_feature_right_side">
        <div className="feature_title">
          {props.feature.title}&ensp;
          <span>
            <img
              src={bullet_point}
              className="feature_bullet_point_odd"
              alt="bullet_point"
            />
          </span>
        </div>
        <div className="odd_feature_text">
          <div className="my-2">{props.feature.description_1}</div>
          <div className="mt-4">{props.feature.description_2}</div>
        </div>
      </div>
    </div>
  );
}
