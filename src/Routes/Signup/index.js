import React, { useState, useEffect } from "react";
import {
  CheckBox,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AppHeader, Input, DateTimePicker } from "../../Component/index";
import Loader from "../../Component/Loader";
import request from "../../Request/request";
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-crop-picker";
import auth from "@react-native-firebase/auth";
import { onUpload } from "../../functions/uploadImage";
import { signupValidation } from "./validations";
import { setUser } from "../../LocalStore/AuthStore";
import SearchLocation from "../Search/searchLocation";
import SearchCategory from "../Search/SearchCategory";
import { CITY_CONTEXT, CATEGORY_CONTEXT } from "../../Store/index";

const CityContext = CITY_CONTEXT;
const CategoryContext = CATEGORY_CONTEXT;

const IMAGE_CONFIG = {
  mediaType: "photo",
  includeBase64: true,
  maxHeight: 200,

  maxWidth: 200,
};

export default ({ navigation }) => {
  const termsAndConditionsURI = "https://service64.com/terms-conditions";
  const dob = React.useRef(null);

  const [accountType, setAccountType] = useState("Service Provider");
  const [profileModal, setModal] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    description: "",
    category: "aaa",
    city: "",
    location: "",
    phone_number: "",
    saller_img: "",
    photo_name: "",
    password: "",
    confirmpwd: "",
    email: "",
    date_of_birth: dob.current,
    national_id: "",
    current_address: "",
    permanent_address: "",
    agreed: false,
  });
  const [response, setResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [modalType, setmodalType] = useState("");
  const [selectCity, setSelectCity] = useState({});
  const [selectLoc, setSelectLoc] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // auth().signInAnonymously()
    //     .then((e) => {
    //         console.log('User signed in anonymously', e);
    //     })
    //     .catch(error => {
    //         if (error.code === 'auth/operation-not-allowed') {
    //             console.log('Enable anonymous in your firebase console.');
    //         }

    //         console.error(error);
    //     });

    setUserData({
      ...userData,
      location: selectLoc,
      city: selectCity.label,
      category: selectCategory,
    });
  }, [selectLoc, selectCategory]);

  const closeModal = (locs) => {
    setModal(false);
  };

  const launchCamera = () => {
    setModal(false);
    ImagePicker.openCamera({
      cropping: true,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType: "photo",
      includeBase64: true,
      includeExif: true,
    })
      .then((image) => {
        setResponse({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
      })
      .catch((e) => alert(e));
  };

  const launchImageLibrary = () => {
    setModal(false);
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      cropperCircleOverlay: false,
      sortOrder: "none",
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: "MediumQuality",
      includeExif: true,
      cropperStatusBarColor: "white",
      cropperToolbarColor: "white",
      cropperActiveWidgetColor: "white",
      cropperToolbarWidgetColor: "#3498DB",
    })
      .then((image) => {
        setResponse({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onSubmit = async () => {
    setErrorMsg("");
    userData.saller_img = response == null ? null : response.uri;
    userData.user_type = accountType == "Service Provider" ? "Seller" : "Buyer";
    userData.date_of_birth = dob.current;
    let isValid = signupValidation(userData);
    if (isValid == "ok") {
      setShowLoader(true);
      onUpload(response)
        .then(async (res) => {
          userData.saller_img = res.photo;
          userData.photo_name = res.photo_name;
          userData.saller_name = userData.fullName;
          console.log(userData, "USER DATA");
          saveUser(userData);
          navigation.navigate("HomeScreen");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShowLoader(false);
      setErrorMsg(isValid);
    }
  };

  const saveUser = (user) => {
    if (accountType == "Service User") {
      request
        .post({ body: user, url: "auth/signup" })
        .then(({ data }) => {
          console.log(data);
          if (data.message == "User Created") {
            request
              .post({
                body: { number: user.phone_number, password: user.password },
                url: "auth/signin",
              })
              .then(({ data }) => {
                if (data.message == "Login Successful") {
                  setUser(data.user).then((res) => {
                    if (res == 200) {
                      console.log(res);
                      setShowLoader(false);
                    }
                  });
                }
              })
              .catch((error) => {
                console.log(error);
                setShowLoader(false);
                setErrorMsg("Somthing went to wrong!");
              });
          } else {
            setErrorMsg(data.message);
            setShowLoader(false);
          }
        })
        .catch((error) => {
          console.log("Error: " + error);
          setShowLoader(false);
          setErrorMsg("Somthing went to wrong!");
        });
    } else {
      request
        .post({ body: user, url: "listing/add_listing" })
        .then(({ data }) => {
          console.log(data, "000");
          if (!data.message) {
            // request.post({ body: { number: user.phone_number, password: user.password }, url: "auth/signin" })
            //     .then(({ data }) => {
            //         if (data.message == "Login Successful") {
            setUser(data).then((res) => {
              if (res == 200) {
                setShowLoader(false);
                console.log(res);
                // navigation.navigate("SideMenu")
              }
            });
            //             }
            //         }).catch(error => {
            //             setShowLoader(false)
            //             console.log(error)
            //             setErrorMsg("Somthing went to wrong!")
            //         });
            // } else {
            //     setShowLoader(false)
            //     setErrorMsg(data.message)
          } else {
            setShowLoader(false);

            setErrorMsg(data.message);
          }
        })
        .catch((error) => {
          setShowLoader(false);
          console.log(error);
          setErrorMsg("Somthing went to wrong!");
        });
    }
  };

  const modalHandler = (type) => {
    setModal(true);
    setmodalType(type);
  };

  let locs = "";
  selectLoc.map((v, i) => {
    locs = i == 0 ? locs + v : locs + " | " + v;
  });

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <AppHeader
        navigation={navigation}
        onPress={() => navigation.goBack()}
        leftIcon={require("../../Assates/HeaderIcons/arrow.png")}
        openDrawer={navigation.openDrawer}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 15 }}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: "Poppins-Regular",
              textAlign: "center",
            }}
          >
            Sign up
          </Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              marginTop: 10,
              fontFamily: "Poppins-Medium",
            }}
          >
            Signup to our app to get calls from our
          </Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              fontFamily: "Poppins-Medium",
            }}
          >
            valuable users and get jobs easily.
          </Text>
        </View>
        {showLoader ? (
          <View
            style={{
              marginTop: 128,
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </View>
        ) : (
          <>
            <View
              style={{
                marginVertical: 40,
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <View
                style={{
                  height: 40,
                  borderColor: "#15B7C9",
                  borderWidth: 1,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.2}
                  onPress={() => setAccountType("Service Provider")}
                  style={{
                    flex: 1,
                    backgroundColor:
                      accountType == "Service Provider" ? "#15B7C9" : "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      // lineHeight: 14,
                      fontFamily: "Poppins-Regular",
                      color:
                        accountType == "Service Provider" ? "#fff" : "#000",
                    }}
                  >
                    Service Provider
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.2}
                  onPress={() => setAccountType("Service User")}
                  style={{
                    flex: 1,
                    backgroundColor:
                      accountType == "Service User" ? "#15B7C9" : "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      // lineHeight: 14,
                      fontFamily: "Poppins-Regular",
                      color: accountType == "Service User" ? "#fff" : "#000",
                    }}
                  >
                    Service User
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              {/* <View style={{ height: 80 }}> */}
              <Input
                value={userData.fullName}
                label={"Name"}
                onChange={(e) => setUserData({ ...userData, fullName: e })}
              />
              {/* </View> */}
              {accountType == "Service Provider" ? (
                <>
                  <TouchableOpacity
                    onPress={() => modalHandler("cat")}
                    activeOpacity={0.8}
                    // style={{ height: 80 }}
                  >
                    <Input
                      editable={false}
                      value={userData.category}
                      label={"Category"}
                      onChange={(e) =>
                        setUserData({ ...userData, category: e })
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => modalHandler("loc")}
                    // style={{ height: 80 }}
                  >
                    <Input
                      editable={false}
                      value={selectCity.label || ""}
                      label={"City"}
                      onChange={(e) => setUserData({ ...userData, city: e })}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    // onPress={() => modalHandler("")}
                    // style={{ height: 80 }}
                  >
                    <Input
                      value={locs}
                      editable={false}
                      label={"Location"}
                      onChange={(e) =>
                        setUserData({ ...userData, location: e })
                      }
                    />
                  </TouchableOpacity>
                </>
              ) : null}
              {/* <View style={{ height: 100 }}> */}
              <Input
                keyboardType={"phone-pad"}
                value={userData.phone_number}
                label={"Phone Number"}
                onChange={(e) => setUserData({ ...userData, phone_number: e })}
              />

              {accountType == "Service Provider" ? (
                <>
                  <DateTimePicker label="Date Of Birth" valueRef={dob} />

                  <Input
                    label={"National Id Number"}
                    value={userData.national_id}
                    onChange={(e) =>
                      setUserData({ ...userData, national_id: e })
                    }
                  />

                  <Input
                    label={"Current Address"}
                    value={userData.current_address}
                    multiline={true}
                    height={"auto"}
                    onChange={(e) =>
                      setUserData({ ...userData, current_address: e })
                    }
                  />

                  <Input
                    label={"Permanent Address"}
                    value={userData.permanent_address}
                    multiline={true}
                    height={"auto"}
                    onChange={(e) =>
                      setUserData({ ...userData, permanent_address: e })
                    }
                  />
                </>
              ) : null}

              {/* </View> */}
              {accountType == "Service User" ? (
                // <View style={{ height: 80 }}>
                <Input
                  keyboardType={"email-address"}
                  value={userData.email}
                  label={"Email"}
                  onChange={(e) => setUserData({ ...userData, email: e })}
                />
              ) : // </View>
              null}

              {accountType == "Service Provider" ? (
                <View>
                  <Input
                    // height={60}
                    multiline={true}
                    label={"About"}
                    value={userData.description}
                    onChange={(e) =>
                      setUserData({ ...userData, description: e })
                    }
                  ></Input>
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      backgroundColor: "#e5e5e5",
                      borderRadius: 250,
                      padding: 3,
                      paddingHorizontal: 6,
                      fontFamily: "Poppins-SemiBold",
                    }}
                  >
                    {userData.description.length}
                  </Text>
                </View>
              ) : null}

              {/* <View style={{ height: 80 }}> */}
              <Input
                secureTextEntry={true}
                label={"Password"}
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e })}
              />
              {/* </View> */}
              {/* <View style={{ height: 80 }}> */}
              <Input
                secureTextEntry={true}
                label={"Confirm Password"}
                value={userData.confirmpwd}
                onChange={(e) => setUserData({ ...userData, confirmpwd: e })}
              />
              {/* </View> */}
              <TouchableOpacity
                onPress={() => modalHandler("profile")}
                style={{ height: 100, marginTop: 5, flexDirection: "row" }}
              >
                <View style={{ height: 100, width: 100 }}>
                  {response == null ? (
                    <Image
                      resizeMode="stretch"
                      style={{ borderRadius: 2, height: 100, width: 100 }}
                      source={require("../../Assates/uploadprofile.png")}
                    />
                  ) : (
                    <Image
                      resizeMode="stretch"
                      style={{ borderRadius: 2, height: 100, width: 100 }}
                      source={{ uri: response.uri }}
                    />
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    paddingHorizontal: 10,
                  }}
                >
                  <Text style={{ fontSize: 13, fontFamily: "Poppins-Medium" }}>
                    Upload your recent
                  </Text>
                  <Text style={{ fontSize: 13, fontFamily: "Poppins-Medium" }}>
                    photo here
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "Poppins-Medium",
                      color: "#15B7C9",
                    }}
                  >
                    Browse Photo
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <CheckBox
                  value={userData.agreed}
                  onValueChange={(e) => setUserData({ ...userData, agreed: e })}
                  tintColors={{ true: "#15B7C9", false: "black" }}
                />
                <Text style={{ fontFamily: "Poppins-Regular" }}>
                  Agree with the{" "}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(termsAndConditionsURI).catch((err) =>
                      console.error(
                        "An error occurred while redirecting to service64 terms and conditions webpage",
                        err
                      )
                    )
                  }
                >
                  <Text
                    style={{ fontFamily: "Poppins-Regular", color: "#15b7c9" }}
                  >
                    terms and conditions
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => (showLoader ? null : onSubmit())}
                  style={{
                    marginTop: 30,
                    height: 43,
                    width: 160,
                    borderRadius: 3,
                    backgroundColor: "#15B7C9",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {showLoader ? (
                    <ActivityIndicator size={"small"} color={"#fff"} />
                  ) : (
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Poppins-Regular",
                        color: "#fff",
                        // lineHeight: 14,
                      }}
                    >
                      Sign up
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ fontSize: 13 }}>Already have an account?</Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "Poppins-Regular",
                      color: "#15B7C9",
                    }}
                  >
                    {" "}
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 50,
                  marginBottom: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Poppins-Regular",
                    color: "red",
                  }}
                >
                  {errorMsg}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <Modal
        testID={"modal"}
        onBackButtonPress={() => setModal()}
        onBackdropPress={() => setModal()}
        backdropTransitionOutTiming={0}
        backdropTransitionInTiming={0}
        isVisible={profileModal}
        onSwipeComplete={() => ""}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        {modalType == "profile" ? (
          <View
            style={{
              height: 140,
              backgroundColor: "#fff",
              paddingHorizontal: 20,
              justifyContent: "space-around",
            }}
          >
            <View style={{}}>
              <Text
                style={{
                  fontSize: 20,
                  lineHeight: 20,
                  fontFamily: "Poppins-Regular",
                }}
              >
                Profile Phone
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => launchCamera()}
                style={{ height: 50, width: 70, alignItems: "center" }}
              >
                <Image
                  style={{ height: 50, width: 50 }}
                  source={require("../../Assates/camera.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => launchImageLibrary()}
                style={{ height: 50, width: 70, alignItems: "center" }}
              >
                <Image
                  style={{ height: 50, width: 50 }}
                  source={require("../../Assates/gallery.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : modalType == "loc" ? (
          <CityContext.Consumer>
            {({ city }) => (
              <SearchLocation
                navigation={navigation}
                multiSelect={true}
                selectCity={selectCity}
                selectLoc={selectLoc}
                setSelectLoc={setSelectLoc}
                setSelectCity={setSelectCity}
                city={city}
                navigation={navigation}
                setModalVisible={closeModal}
              />
            )}
          </CityContext.Consumer>
        ) : (
          <CategoryContext.Consumer>
            {({ categories }) => (
              <SearchCategory
                navigation={navigation}
                selectCategory={selectCategory}
                setSelectCategory={setSelectCategory}
                categories={categories}
                navigation={navigation}
                setModalVisible={closeModal}
              />
            )}
          </CategoryContext.Consumer>
        )}
      </Modal>
    </View>
  );
};
