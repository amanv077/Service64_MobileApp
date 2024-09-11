import React from "react";
import Svg, { Circle, Rect, Defs, Mask } from "react-native-svg";

function BottomTabBar() {
  return (
    <Svg height="50" width="100%">
      <Defs>
        <Mask id="hole">
          <Rect x="0" y="5" width="100%" height="50" fill="white" />
          <Circle cx="50%" cy="0" r="35" fill="black" />
        </Mask>
      </Defs>
      <Rect
        x="0"
        y="5"
        width="100%"
        height="50"
        fill="white"
        mask="url(#hole)"
      />
    </Svg>
  );
}

export default BottomTabBar;
