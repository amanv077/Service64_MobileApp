import React, { useEffect } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

const backgroundImage = require("../../Assates/logo/Service64-Logo-Avatar.png");
const SclaeTo = 1.2;

export default function Loader() {
  const startValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(startValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.quad,
        useNativeDriver: true,
      }),
      {}
    ).start();
  }, [startValue]);

  return (
    <Animated.View style={loaderStyle.loader}>
      <Animated.Image
        source={backgroundImage}
        resizeMode="center"
        style={{
          transform: [
            {
              scaleX: startValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, SclaeTo, 1],
              }),
            },
            {
              scaleY: startValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, SclaeTo, 1],
              }),
            },
            {
              rotateY: startValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ["0deg", "270deg", "0deg"],
              }),
            },
          ],
        }}
      />
    </Animated.View>
  );
}

const loaderStyle = StyleSheet.create({
  loader: {
    position: "absolute",
    backgroundColor: "transparent",
  },
});
