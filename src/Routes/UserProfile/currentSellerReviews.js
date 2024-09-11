import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import request from "../../Request/request";
import SellerReview from "../../Component/Review/SellerReview";
import ReviewBars from "../../Component/Review/ReviewBars";

function CurrentSellerReviews({
  currentSellerId,
  totalRating,
  setTotalRating,
  sellerReviewsStyle,
}) {
  const [sellerDetails, setSellerDetails] = React.useState({
    _id: "",
    userId: "",
    behaviour: 0,
    communication: 0,
    expertise: 0,
    recommendation: 0,
    reviewBars: {
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
    },
    reviews: [],
  });
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewToReport, setReviewToReport] = useState("");
  const [error, setError] = useState("");
  const [reportDesc, setReportDesc] = useState("");

  let errorTimer = React.useRef(null);

  useEffect(() => {
    setSellerDetails({
      _id: "",
      userId: currentSellerId,
      behaviour: 0,
      communication: 0,
      expertise: 0,
      recommendation: 0,
      reviewBars: {
        five: 0,
        four: 0,
        three: 0,
        two: 0,
        one: 0,
      },
      reviews: [],
    });

    request
      .get({ body: { skip: 0 }, url: `reviews/${currentSellerId}` })
      .then(async ({ data }) => {
        let { reviewsCollection } = data;
        if (!(reviewsCollection === undefined || reviewsCollection === null)) {
          setSellerDetails(reviewsCollection);
          let {
            behaviour,
            communication,
            expertise,
            recommendation,
          } = reviewsCollection;
          setTotalRating({
            avg_rating: behaviour + communication + expertise + recommendation,
            star_reviews: {
              behaviour,
              communication,
              expertise,
              recommendation,
            },
            no_of_reviews: { five: 0, four: 0, three: 0, two: 0, one: 0 },
          });
        }
      })
      .catch((err) => console.log(err));
  }, [currentSellerId]);

  let openReviewModal = (id) => {
    setReviewToReport(id);
    setReviewModalVisible(true);
  };

  let reportReview = async (event) => {
    event.preventDefault();
    let body = {
      seller_id: currentSellerId,
      review_id: reviewToReport,
      description: reportDesc,
    };
    let response = await request.post({ body, url: `reviews/reportreview` });
    if (response.data.error) {
      clearTimeout(errorTimer.current);
      setError(response.data.error);
      errorTimer.current = setTimeout(() => {
        setError("");
      }, 5000);
      // setReportDesc("");
      return;
    }

    let review = sellerDetails.reviews.find(
      (rev) => rev._id === reviewToReport
    );
    review.isReported = true;
    setReportDesc("");
    setReviewModalVisible(false);
  };

  return (
    <View style={[{ paddingBottom: 30 }, sellerReviewsStyle]}>
      {!!sellerDetails &&
        !!sellerDetails.reviews &&
        sellerDetails.reviews.length > 0 && (
          <View style={{ padding: 20 }}>
            {!sellerDetails ||
              (!!sellerDetails.reviews && sellerDetails.reviews.length === 0 && (
                <Text
                  style={{
                    fontSize: 25,
                    color: "#EEE",
                    fontFamily: "Poppins-SemiBold",
                  }}
                >
                  NO REVIEWS
                </Text>
              ))}

            {!!sellerDetails &&
              !!sellerDetails.reviews &&
              sellerDetails.reviews.length > 0 && (
                <ReviewBars
                  totalRating={totalRating}
                  total={sellerDetails.reviews.length}
                />
              )}
            <View style={{ marginTop: 5 }}>
              {sellerDetails.reviews.map((review) => (
                <SellerReview
                  key={review._id}
                  review={review}
                  showReportButton={true}
                  reportButtonCallback={openReviewModal}
                />
              ))}
            </View>
            <Modal
              onRequestClose={() => {
                setReportDesc("");
                setReviewModalVisible(false);
              }}
              animationType={"fade"}
              visible={reviewModalVisible}
              transparent={true}
            >
              <View
                style={{
                  display: "flex",
                  flex: 1,
                  backgroundColor: "#00000040",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    alignItems: "center",
                    bottom: 0,
                    right: 0,
                    left: 0,
                    // backgroundColor: "white",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      textAlign: "center",
                      padding: 5,
                    }}
                  >
                    <TextInput
                      autoFocus={true}
                      style={{
                        flex: 1,
                        backgroundColor: "white",
                        marginRight: 5,
                        borderRadius: 7,
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                      }}
                      value={reportDesc}
                      onChangeText={(text) => setReportDesc(text)}
                      multiline={true}
                      placeholder="Enter brief description for the report"
                    />

                    <TouchableOpacity
                      onPress={reportReview}
                      style={{
                        borderRadius: 7,
                        backgroundColor: "#15B7C9",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        padding: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Poppins-Regular",
                          color: "#fff",
                          padding: 5,
                        }}
                      >
                        REPORT
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {!!error && (
                    <View
                      style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#fa383e",
                        padding: 10,
                        marginTop: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          maxWidth: "80%",
                        }}
                      >
                        Error! {`${error}`}
                      </Text>
                      <TouchableOpacity
                        style={{
                          minWidth: 15,
                          textAlign: "center",
                        }}
                        onPress={() => {
                          clearTimeout(errorTimer.current);
                          setError("");
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            maxWidth: "80%",
                          }}
                        >
                          x
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </Modal>
          </View>
        )}
    </View>
  );
}

export default CurrentSellerReviews;
