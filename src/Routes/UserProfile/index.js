import React, { useState } from "react";
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AppHeader } from "../../Component/index";
import NoUser from "./userNotAalibale";
import { getUser } from "../../LocalStore/AuthStore";
import { Value } from "react-native-reanimated";
import CurrentSellerReviews from "./currentSellerReviews";
import ReviewStarsRow from "../../Component/Review/ReviewStarsRow";

const screenWidth = Dimensions.get("window").width;
const paddingAroundContent = 20;
const contentWidth = screenWidth - 2 * paddingAroundContent;

export default ({ navigation }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [locations, setLocations] = React.useState("");
  const [totalRating, setTotalRating] = React.useState({
    avg_rating: 0,
    star_reviews: {
      behaviour: 0,
      communication: 0,
      expertise: 0,
      recommendation: 0,
    },
    no_of_reviews: { five: 0, four: 0, three: 0, two: 0, one: 0 },
  });

  const [scrollIndex, setScrollIndex] = useState(0);
  let scroll = React.useRef(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUser().then(async (user) => {
        if (user !== null) {
          const value = JSON.parse(user);
          setCurrentUser(value);
          let locationString = "";
          await value.locations.map((v, i) => {
            locationString =
              i == 0 ? locationString + v : locationString + " | " + v;
          });
          setLocations(locationString);
        }
      });
    });
    return unsubscribe;
  }, []);

  let scrollTo = (index) => {
    scroll.current.scrollTo({ x: index * screenWidth, y: 0, animated: true });
    setScrollIndex(index);
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {/* <AppHeader   navigation={navigation} onPress={() => navigation.openDrawer()}
                onAuth={currentUser !== null ? ()=>navigation.navigate("UserProfile") : () => navigation.navigate("Signup")}
                leftIcon={require("../../Assates/HeaderIcons/menu.png")} /> */}
      {navigation.openDrawer == undefined ? (
        <AppHeader
          navigation={navigation}
          onPress={() => navigation.goBack()}
          leftIcon={require("../../Assates/HeaderIcons/arrow.png")}
          openDrawer={navigation.openDrawer}
        />
      ) : (
        <AppHeader
          onPress={() => navigation.openDrawer()}
          navigation={navigation}
          onAuth={
            currentUser !== null ? false : () => navigation.navigate("UserProfile")
          }
          leftIcon={require("../../Assates/HeaderIcons/menu.png")}
        />
      )}
      {currentUser == null ? (
        <NoUser navigation={navigation} />
      ) : (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
          {currentUser.user_type === "Seller" ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  height: 200,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View style={{ height: 150, width: 180 }}>
                  <Image
                    resizeMode={"stretch"}
                    style={{
                      borderRadius: 5,
                      height: 150,
                      width: 150,
                      alignSelf: "center",
                    }}
                    source={{ uri: currentUser.seller_img }}
                  />
                </View>
              </View>
              <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontFamily: "Poppins-Regular" }}>
                  {currentUser.fullname}
                </Text>
                <Text style={{ fontSize: 13, fontFamily: "Poppins-Medium" }}>
                  {currentUser.category}
                </Text>
                <Text style={{ fontSize: 13 }}>{currentUser.user_number}</Text>
                <Text style={{ fontSize: 13, textAlign: "center" }}>
                  {locations}
                </Text>
              </View>
              {/* {!!totalRating.avg_rating && ( */}
              <View style={{ alignItems: "center", marginVertical: 5 }}>
                <ReviewStarsRow stars={totalRating.avg_rating * 0.0125} />
              </View>
              {/* )} */}

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
                onMomentumScrollEnd={(e) => {
                  let pageIndex = Math.round(
                    e.nativeEvent.contentOffset.x / screenWidth
                  );
                  setScrollIndex(pageIndex);
                }}
              >
                <View
                  style={{
                    marginVertical: 25,
                    flexGrow: 1,
                    width: screenWidth,
                    paddingHorizontal: paddingAroundContent,
                  }}
                >
                  <Text style={{ fontSize: 18, fontFamily: "Poppins-Regular" }}>
                    About Me
                  </Text>
                  <View style={{ marginTop: 5 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: "left",
                        fontFamily: "Poppins-Regular",
                        lineHeight: 20,
                      }}
                    >
                      {currentUser.description}
                    </Text>
                  </View>
                </View>

                <CurrentSellerReviews
                  currentSellerId={currentUser._id}
                  totalRating={totalRating}
                  setTotalRating={setTotalRating}
                  sellerReviewsStyle={{
                    flexGrow: 1,
                    width: screenWidth,
                    // paddingHorizontal: paddingAroundContent,
                  }}
                />
              </ScrollView>
            </ScrollView>
          ) : (
            <View
              style={{
                backgroundColor: "#fff",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 25, fontFamily: "Poppins-Regular" }}>
                You are a Buyer
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
