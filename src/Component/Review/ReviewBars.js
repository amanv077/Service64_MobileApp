import React from "react";
import { View, Text } from "react-native";
import ReviewBar from "./ReviewBar";

function ReviewBars({ totalRating, total }) {
  return (
    <View
      style={{
        borderBottomColor: "#EEE",
        borderBottomWidth: 1,
        paddingBottom: 30,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontFamily: "Poppins-SemiBold",
          textAlign: "center",
        }}
      >
        {(totalRating.avg_rating * 0.0125).toFixed(2)}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Poppins-Regular",
          textAlign: "center",
        }}
      >
        {`based on ${total} review${total > 1 ? "s" : ""}`}
      </Text>

      <ReviewBar type="Behaviour" value={totalRating.star_reviews.behaviour} />
      <ReviewBar
        type="Communication"
        value={totalRating.star_reviews.communication}
      />
      <ReviewBar
        type="Recommendation"
        value={totalRating.star_reviews.recommendation}
      />
      <ReviewBar type="Service" value={totalRating.star_reviews.expertise} />
    </View>
  );
}

export default ReviewBars;
