import React from "react";
import {
  Button,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ReviewStarsRow from "./ReviewStarsRow";
import logo from "../../Assates/logo/Service64-Logo-Circular-Avatar.png";

const logoURI = Image.resolveAssetSource(logo).uri;

export default ({
  review,
  showReportButton = false,
  reportButtonCallback = null,
  showCount = false,
}) => {
  let [isExpanded, setExpand] = React.useState(false);
  let { behaviour, communication, expertise, recommendation } = review;
  let stars = (behaviour + communication + expertise + recommendation) * 0.0125;

  return (
    <TouchableOpacity onPress={() => setExpand((exp) => !exp)}>
      <View style={styles.reviewContainer}>
        <View style={styles.reviewImageContainer}>
          <Image
            resizeMode={"stretch"}
            style={styles.reviewImage}
            source={{ uri: !!review.image_uri ? review.image_uri : logoURI }}
          />
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.dataRow}>
            <View style={styles.dataRight}>
              <Text style={styles.reviewerName}>
                {review.reviewer_name.length >= 20
                  ? review.reviewer_name.slice(0, 20) + "..."
                  : review.reviewer_name}
              </Text>
              <ReviewStarsRow stars={stars} showCount={showCount} />
            </View>
            {showReportButton && (
              <Button
                disabled={review.isReported}
                onPress={() => reportButtonCallback(review._id)}
                title={review.isReported ? "Reported" : "Report"}
                style={styles.reportButton}
                color="#fa383e"
              />
            )}
          </View>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          {!!review.description &&
          review.description.length > 100 &&
          !isExpanded
            ? review.description.slice(0, 100) + " ... "
            : review.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    marginTop: 10,
  },

  reviewImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },

  reviewImage: {
    flex: 1,
    borderRadius: 250,
  },

  dataContainer: {
    display: "flex",
    flex: 1,
    minHeight: 90,
    backgroundColor: "#fff",
    justifyContent: "space-around",
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    paddingLeft: 10,
    paddingVertical: 5,
  },

  dataRow: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },

  dataRight: {
    flexDirection: "column",
    justifyContent: "space-around",
    height: "100%",
  },

  reportButton: {
    backgroundColor: "#DB2D20",
    padding: 5,
    borderRadius: 3,
  },

  reviewerName: {
    fontSize: 17,
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
    lineHeight: 20,
  },

  descriptionContainer: {
    flex: 1,
    justifyContent: "flex-start",
    borderBottomColor: "#EEE",
    borderBottomWidth: 1,
    marginTop: 5,
    padding: 5,
    backgroundColor: "#FFF",
  },

  descriptionText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#393e42",
  },
});
