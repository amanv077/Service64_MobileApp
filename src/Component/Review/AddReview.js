import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AddReviewStars from "./AddReviewStars";
import request from "../../Request/request";

export default function AddReview({
  currentUser,
  totalStars = 5,
  sellerId,
  reviewsLength,
  setReviews,
  setRating,
  closeModal,
}) {
  let [commStar, setCommStar] = React.useState(0);
  let [recomStar, setRecomStar] = React.useState(0);
  let [experStar, setExperStar] = React.useState(0);
  let [behaStar, setBehaStar] = React.useState(0);
  let [reviewDesc, setReviewDesc] = React.useState("");
  let [error, setError] = React.useState("");

  let errorTimer = React.useRef(null);

  let handleChange = (text) => {
    setReviewDesc(text);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();

    if (!(commStar && recomStar && experStar && behaStar)) {
      console.log("ERROR");
      clearTimeout(errorTimer.current);
      setError("Every field must have a star");
      errorTimer.current = setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    let body = {
      seller_id: sellerId,
      reviewer_id: currentUser._id,
      reviewer_name: currentUser.fullname,
      image_uri: currentUser.seller_img,
      communication: (commStar / totalStars) * 100,
      behaviour: (behaStar / totalStars) * 100,
      expertise: (experStar / totalStars) * 100,
      recommendation: (recomStar / totalStars) * 100,
      description: reviewDesc,
    };

    let response = await request.patch({ body, url: `reviews/addreview` });

    if (response.data.error) {
      clearTimeout(errorTimer.current);
      setError(response.data.error);
      errorTimer.current = setTimeout(() => {
        setError("");
      }, 5000);
      setClear();
      return;
    }

    let currentUserRatingAvg =
      (body.behaviour +
        body.communication +
        body.expertise +
        body.recommendation) /
      4;

    setRating((prevRating) => {
      let avg_rating =
        (prevRating.avg_rating * reviewsLength + currentUserRatingAvg * 4) /
        (reviewsLength + 1);
      console.log(
        "current prev_avg_rating",
        prevRating.avg_rating,
        reviewsLength,
        currentUserRatingAvg
      );
      console.log("current avg_rating", avg_rating);

      let star_reviews = {
        behaviour:
          (prevRating.star_reviews.behaviour * reviewsLength + body.behaviour) /
          (reviewsLength + 1),
        communication:
          (prevRating.star_reviews.communication * reviewsLength +
            body.communication) /
          (reviewsLength + 1),
        expertise:
          (prevRating.star_reviews.expertise * reviewsLength + body.expertise) /
          (reviewsLength + 1),
        recommendation:
          (prevRating.star_reviews.recommendation * reviewsLength +
            body.recommendation) /
          (reviewsLength + 1),
      };

      let currentUserStarRating = Math.round(
        (currentUserRatingAvg * totalStars) / 100
      );
      let starsString = "zero";
      if (currentUserStarRating === 0) starsString = "one";
      if (currentUserStarRating === 1) starsString = "one";
      if (currentUserStarRating === 2) starsString = "two";
      if (currentUserStarRating === 3) starsString = "three";
      if (currentUserStarRating === 4) starsString = "four";
      if (currentUserStarRating === 5) starsString = "five";

      prevRating.no_of_reviews[starsString] += 1;

      return {
        avg_rating,
        star_reviews,
        no_of_reviews: prevRating.no_of_reviews,
      };
    });

    setReviews((prevReviews) => {
      let reviews = { ...prevReviews };
      reviews.reviews.unshift({ ...body, date: "date" });
      return reviews;
    });
    setClear();
    closeModal(false);
  };

  let setClear = () => {
    setCommStar("");
    setRecomStar("");
    setExperStar("");
    setBehaStar("");
    setReviewDesc("");
  };

  return (
    <View>
      <View>
        <View style={styles.starsContainer}>
          <AddReviewStars
            heading={"Communication"}
            stars={commStar}
            pressHandler={(newStars) => {
              setCommStar((prev) => newStars);
            }}
          />
          <AddReviewStars
            heading={"Recommend"}
            stars={recomStar}
            pressHandler={(newStars) => {
              setRecomStar((prev) => newStars);
            }}
          />
          <AddReviewStars
            heading={"Service"}
            stars={experStar}
            pressHandler={(newStars) => {
              setExperStar((prev) => newStars);
            }}
          />
          <AddReviewStars
            heading={"Behaviour"}
            stars={behaStar}
            pressHandler={(newStars) => {
              setBehaStar((prev) => newStars);
            }}
          />
        </View>

        <TextInput
          style={styles.customInput}
          onChangeText={handleChange}
          multiline={true}
          placeholder="Enter brief description about your experience with the seller"
        />

        {!!error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error! {`${error}`}</Text>
            <TouchableOpacity
              style={styles.errorButton}
              onPress={() => {
                clearTimeout(errorTimer.current);
                setError("");
              }}
            >
              <Text style={styles.errorText}>x</Text>
            </TouchableOpacity>
          </View>
        )}

        <Button onPress={handleSubmit} title="Post Review" color="#15B7C9" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  starsContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginVertical: 5,
  },
  customInput: { marginVertical: 5, backgroundColor: "#e5e5e570" },
  errorContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fa383e",
    padding: 5,
    marginBottom: 5,
  },
  errorText: {
    color: "white",
    maxWidth: "80%",
  },
  errorButton: {
    minWidth: 15,
    textAlign: "center",
  },
});
