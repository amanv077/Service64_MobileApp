import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ReviewStarsRow from "./ReviewStarsRow";

export default function AddReviewStars({
  heading,
  stars,
  pressHandler = null,
  totalStars = 5,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <ReviewStarsRow
        stars={stars}
        pressHandler={pressHandler}
        totalStars={totalStars}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 14, fontFamily: "Poppins-Medium", marginTop: 5 },
  container: {
    display: "flex",
    width: "50%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    marginVertical: 2,
  },
});
