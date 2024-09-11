import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import starFilled from "../../Assates/Stars/star-filled.png";
import starHalf from "../../Assates/Stars/star-half.png";
import starUnFilled from "../../Assates/Stars/star-unfilled.png";

export default function ReviewStarsRow({
  stars = 0,
  totalStars = 5,
  pressHandler = null,
  showCount,
}) {
  let [starsArray, setStarsArray] = React.useState([]);

  React.useEffect(() => {
    const fullStar = Math.floor(stars);
    let newStarArray = [];
    for (let i = 0; i < fullStar; i++) {
      newStarArray.push(
        <ReviewStar
          value={newStarArray.length + 1}
          key={newStarArray.length + 1}
          type="full"
          pressHandler={pressHandler}
        />
      );
    }

    let halfStar = Math.round(stars - fullStar);
    if (fullStar !== totalStars) {
      newStarArray.push(
        <ReviewStar
          value={newStarArray.length + 1}
          key={newStarArray.length + 1}
          type={halfStar === 0 ? "outline" : "half"}
          pressHandler={pressHandler}
        />
      );
    }

    let outlineStar = totalStars - newStarArray.length;
    if (outlineStar > 0) {
      for (let i = 0; i < outlineStar; i++) {
        newStarArray.push(
          <ReviewStar
            value={newStarArray.length + 1}
            key={newStarArray.length + 1}
            type="outline"
            pressHandler={pressHandler}
          />
        );
      }
    }

    if (showCount) {
      newStarArray.push(
        <Text
          key={"REVIEW TEXT"}
          style={{
            fontSize: 14,
            fontFamily: "Poppins-SemiBold",
            marginLeft: 25,
          }}
        >
          {stars.toFixed(1)}
        </Text>
      );
    }

    setStarsArray(newStarArray);
  }, [stars, totalStars]);

  return <View style={styles.starRow}>{starsArray}</View>;
}

function ReviewStar({ value = 0, pressHandler = null, type = "outline" }) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (!!pressHandler) pressHandler(+value);
      }}
    >
      {type === "full" && <Image style={styles.image} source={starFilled} />}
      {type === "half" && <Image style={styles.image} source={starHalf} />}
      {type === "outline" && (
        <Image style={styles.image} source={starUnFilled} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  starRow: {
    display: "flex",
    flexDirection: "row",
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 3,
  },
});
