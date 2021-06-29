import React from "react";
import bullet_point from "../../../Resources/Images/feature illustrations/Bullet_Point.svg";
import "../css/features-css/EvenFeature.css";
import { Feature } from "./Feature";

interface EvenFeatureProps {
  feature: Feature
};

export default function EvenFeature(props: EvenFeatureProps) {
  return (
    <div className="even_feature d-flex justify-content-between">
      <div className="even_feature_left_side">
        <div className="feature_title">
          <span>
            <img
              src={bullet_point}
              className="feature_bullet_point_even"
              alt="bullet_point"
            />
          </span>
          &ensp;{props.feature.title}
        </div>
        <div className="even_feature_text">
          <div className="my-2">{props.feature.description_1}</div>
          <div className="mt-4">{props.feature.description_2}</div>
        </div>
      </div>
      <div className="even_feature_right_side">
        <img src={props.feature.image} alt="freelance" />
      </div>
    </div>
  );
}
