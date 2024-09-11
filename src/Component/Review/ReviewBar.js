import React from "react";
import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";

const ReviewBar = ({
  type,
  value,
  showPercentage = false,
  showCount = false,
  reviewTypeStyle = {},
  barStyle = {},
  barFillStyle = {},
  rightTextStyle = {},
}) => {
  let getBgColor = (point) => {
    if (point > 74) {
      return "#3CB371";
    } else if (point > 59) {
      return "#9ACD32";
    } else if (point > 39) {
      return "#FFD700";
    } else {
      return "#DB2D20";
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
      }}
    >
      <View style={{ flex: 0.4, paddingHorizontal: 10 }}>
        <Animatable.Text
          animation={"fadeInLeft"}
          style={[
            { flex: 1, fontSize: 12, fontFamily: "Poppins-Regular" },
            reviewTypeStyle,
          ]}
        >
          {type}
        </Animatable.Text>
      </View>
      <View
        style={[
          {
            flex: 0.5,
            height: 8,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            whiteSpace: "nowrap",
            backgroundColor: "#eee",
            borderRadius: 5,
          },
          barStyle,
        ]}
      >
        {value > 0 && (
          <Animatable.View
            animation={"fadeInLeft"}
            style={[
              {
                width: `${value}%`,
                height: 5,
                backgroundColor: getBgColor(value),
                paddingHorizontal: 10,
                borderRadius: 5,
              },
              barFillStyle,
            ]}
          />
        )}
      </View>
      <View
        style={{
          flex: +`${showPercentage || showCount ? 0.15 : 0}`,
          marginLeft: 5,
        }}
      >
        {showPercentage && !showCount && (
          <Text style={[{ fontSize: 12, fontFamily: "Poppins-SemiBold", }, rightTextStyle]}>
            {value.toFixed(2)} %
          </Text>
        )}
        {showCount && !showPercentage && (
          <Text style={[{ fontSize: 12, fontFamily: "Poppins-SemiBold", }, rightTextStyle]}>
            {value}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ReviewBar;
