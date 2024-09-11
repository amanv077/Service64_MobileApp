import React, { useState, useEffect } from "react";
import {
  Button,
  Dimensions,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Modal,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import YoutubePlayer from "react-native-youtube-iframe";
import Share from "react-native-share";
import { AppHeader } from "../../Component/index";
import Swiper from "react-native-swiper";
import AddReview from "../../Component/Review/AddReview";
import { getUser } from "../../LocalStore/AuthStore";
import SellerReview from "../../Component/Review/SellerReview";
import request from "../../Request/request";
import ReviewStarsRow from "../../Component/Review/ReviewStarsRow";
import ReviewBars from "../../Component/Review/ReviewBars";

const screenWidth = Dimensions.get("window").width;
const paddingAroundContent = 20;
const contentWidth = screenWidth - 2 * paddingAroundContent;
const videoHeight = (contentWidth * 23) / 41;
const initalUserDetails = {
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
};
const initialTotalRating = {
  avg_rating: 0,
  star_reviews: {
    behaviour: 0,
    communication: 0,
    expertise: 0,
    recommendation: 0,
  },
  no_of_reviews: { five: 0, four: 0, three: 0, two: 0, one: 0 },
};

const Saller = ({ value, navigation, sallerIndex, currentSallerIndex }) => {
  const [locations, setLocations] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState(null);
  const [sellerDetails, setSellerDetails] = React.useState(initalUserDetails);
  const [totalRating, setTotalRating] = React.useState(initialTotalRating);
  const [isSellerDetailsLoaded, setSellerDetailsLoad] = React.useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState(false);

  let scroll = React.useRef(null);

  let ShareSeller = async () => {
    try {
      let shareOption = {
        message: `Hey , I'm ${value.fullname} : ${value.category}`,
        title: "Service64 Seller Share",
        url: `https://service64.com/profile/${value._id}`,
        subject: "Service64 Seller Share",
      };

      const result = await Share.open(shareOption);

      if (result.action === Share.sharedAction) {
        // alert("Post Shared");
        console.log("Post Shared");
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        // alert("Post cancelled");
        console.log("Post cancelled");
      }
    } catch (error) {
      // alert(error.message);
      console.log(error.message, "SHARE SELLER PROFILE URL");
    }
  };

  let matchYoutubeUrl = (url) => {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return url.match(p) ? RegExp.$1 : false;
  };

  useEffect(() => {
    let locationString = "";
    value.locations.map((v, i) => {
      locationString = i == 0 ? locationString + v : locationString + " | " + v;
    });

    setLocations(locationString);
    getUser().then((user) => {
      setCurrentUser(JSON.parse(user));
    });
    if (value.videoUrl !== undefined && value.videoUrl !== null) {
      setVideoUrl(matchYoutubeUrl(value.videoUrl));
    }
  }, []);

  useEffect(() => {
    if (!isSellerDetailsLoaded && currentSallerIndex === sallerIndex) {
      request
        .get({ body: { skip: 0 }, url: `reviews/${value._id}` })
        .then(async ({ data }) => {
          let { reviewsCollection } = data;
          if (
            !(reviewsCollection === undefined || reviewsCollection === null)
          ) {
            setSellerDetails(reviewsCollection);
            let {
              behaviour,
              communication,
              expertise,
              recommendation,
            } = reviewsCollection;
            setTotalRating({
              avg_rating:
                behaviour + communication + expertise + recommendation,
              star_reviews: {
                behaviour,
                communication,
                expertise,
                recommendation,
              },
              no_of_reviews: { five: 0, four: 0, three: 0, two: 0, one: 0 },
            });
            setSellerDetailsLoad(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [currentSallerIndex]);

  let scrollTo = (index) => {
    scroll.current.scrollTo({ x: index * screenWidth, y: 0, animated: true });
    setScrollIndex(index);
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      {/* <AppHeader onPress={() => navigation.goBack()} leftIcon={require("../../Assates/HeaderIcons/arrow.png")} /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} > */}
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 15,
            paddingHorizontal: paddingAroundContent,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              height: 150,
              width: 160,
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Image
              resizeMode={"stretch"}
              style={{
                borderRadius: 2,
                height: 130,
                width: 130,
                alignSelf: "flex-start",
              }}
              source={{ uri: value.seller_img }}
            />
          </View>

          <View style={{ display: "flex", flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Poppins-SemiBold",
                lineHeight: 22,
              }}
            >
              {value.fullname}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Poppins-Medium",
                marginTop: 5,
                lineHeight: 17,
              }}
            >
              {value.category}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Poppins-Medium",
                marginTop: 5,
              }}
            >
              {locations}
            </Text>
            <View>
              <ReviewStarsRow stars={totalRating.avg_rating * 0.0125} />
            </View>
            <View
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${value.user_number}`)}
                style={{
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
                  Call Now
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => ShareSeller()}
                style={{ paddingHorizontal: 15 }}
              >
                <Image
                  style={{ height: 22, width: 20 }}
                  resizeMode={"stretch"}
                  source={require("../../Assates/share.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* </ScrollView> */}

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            padding: 2,
            backgroundColor: "white",
            paddingHorizontal: paddingAroundContent,
            shadowColor: "#15B7C9",
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.67,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => scrollTo(0)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: 5,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins-Regular",
                color: `${scrollIndex === 0 ? "#15B7C9" : "#000"}`,
                padding: 5,
              }}
            >
              ABOUT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => scrollTo(1)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: 5,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins-Regular",
                color: `${scrollIndex === 1 ? "#15B7C9" : "#000"}`,
                padding: 5,
              }}
            >
              REVIEWS
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          ref={scroll}
        >
          <View
            style={{
              flexGrow: 1,
              width: screenWidth,
              paddingHorizontal: paddingAroundContent,
            }}
          >
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                About Me
              </Text>
              {!!value.videoUrl && (
                <View
                  style={{
                    marginTop: 5,
                  }}
                >
                  <YoutubePlayer
                    play={false}
                    videoId={videoUrl}
                    height={videoHeight}
                    width={contentWidth}
                  />
                </View>
              )}
              <View style={{ marginTop: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "left",
                    fontFamily: "Poppins-Regular",
                    lineHeight: 20,
                  }}
                >
                  {value.description}
                </Text>
              </View>
            </View>

            <View
              style={{ marginTop: 5, display: "flex", alignItems: "center" }}
            >
              {!!currentUser && currentUser.user_type === "Buyer" && (
                <TouchableOpacity
                  onPress={() => setReviewModalVisible(true)}
                  style={{
                    marginVertical: 15,
                    flex: 1,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "#eee",
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    padding: 5,
                    width: contentWidth,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Poppins-Regular",
                      color: "#15B7C9",
                      padding: 5,
                    }}
                  >
                    Write a Review
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              flexGrow: 1,
              width: screenWidth,
              paddingHorizontal: paddingAroundContent,
            }}
          >
            <View style={{ marginTop: 20 }}>
              {!sellerDetails ||
                (!!sellerDetails.reviews &&
                  sellerDetails.reviews.length === 0 && (
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
                  <>
                    <ReviewBars
                      totalRating={totalRating}
                      total={sellerDetails.reviews.length}
                    />
                    <View style={{ marginTop: 10 }}>
                      {sellerDetails.reviews.map((review) => (
                        <SellerReview
                          key={review._id}
                          review={review}
                          showCount={true}
                        />
                      ))}
                    </View>
                  </>
                )}
            </View>
          </View>
        </ScrollView>

        <Modal
          onRequestClose={() => setReviewModalVisible(false)}
          animationType={"fade"}
          visible={reviewModalVisible}
          transparent={true}
        >
          {!!currentUser && currentUser.user_type === "Buyer" && (
            <View
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "#00000040",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flex: 1,
                  position: "absolute",
                  alignItems: "center",
                  bottom: 0,
                  padding: 20,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    alignSelf: "flex-start",
                  }}
                >
                  Add Reviews
                </Text>
                <AddReview
                  currentUser={currentUser}
                  sellerId={value._id}
                  reviewsLength={sellerDetails.reviews?.length}
                  setRating={setTotalRating}
                  setReviews={setSellerDetails}
                  closeModal={setReviewModalVisible}
                />
              </View>
            </View>
          )}
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default ({ route, navigation }) => {
  const [initIndex, setInitIndex] = useState(
    route.params.index ? route.params.index + 1 : 1
  );
  console.log(route);

  return (
    <View style={{ flex: 1 }}>
      <AppHeader
        navigation={navigation}
        onPress={() => navigation.goBack()}
        leftIcon={require("../../Assates/HeaderIcons/arrow.png")}
      />

      {route.params.sallers ? (
        <Swiper
          onIndexChanged={(e) => setInitIndex(e + 1)}
          index={route.params.index}
          showsPagination={false}
          style={styles.wrapper}
          loop={false}
          loadMinimal={true}
        >
          {route.params.sallers.map((v, i) => {
            return (
              <View key={i} style={styles.slide1}>
                <Saller
                  value={v}
                  currentSallerIndex={initIndex - 1}
                  sallerIndex={i}
                />
              </View>
            );
          })}
        </Swiper>
      ) : null}
      <View
        style={{
          height: 40,
          backgroundColor: "#fff",
          elevation: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 14 }}>
          {initIndex} | {route.params.sallers ? route.params.sallers.length : 0}
        </Text>
      </View>
    </View>
  );
};
