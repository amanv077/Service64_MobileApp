import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AppHeader, Input } from "../../Component/index";
import Loader from "../../Component/Loader";
import request from "../../Request/request";
import Modal from "react-native-modal";
import { onUpload } from "../../functions/uploadImage";
import { signupValidation } from "./validations";
import { setUser } from "../../LocalStore/AuthStore";
import SearchLocation from "../Search/searchLocation";
import SearchCategory from "../Search/SearchCategory";
import { CITY_CONTEXT, CATEGORY_CONTEXT } from "../../Store/index";
import {
  HeadingField,
  UserImageField,
  ErrorField,
  ProfileModal,
  TermsAndConditionsField,
  SignUpButton,
  JumpToLoginSection,
} from "./SignUpFields";

const CityContext = CITY_CONTEXT;
const CategoryContext = CATEGORY_CONTEXT;

export default ({ navigation }) => {
  const dob = React.useRef(null);

  const [profileModal, setModal] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    description: "",
    category: "",
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

  const onSubmit = async () => {
    setErrorMsg("");
    userData.saller_img = response == null ? null : response.uri;
    userData.user_type = "Buyer";
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
        <HeadingField
          heading={"Sign Up"}
          text={
            "SignUp to our app to get calls from our valuable users and get jobs easily"
          }
        />
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
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Input
              value={userData.fullName}
              label={"Name"}
              onChange={(e) => setUserData({ ...userData, fullName: e })}
            />

            <Input
              keyboardType={"phone-pad"}
              value={userData.phone_number}
              label={"Phone Number"}
              onChange={(e) => setUserData({ ...userData, phone_number: e })}
            />

            <Input
              keyboardType={"email-address"}
              value={userData.email}
              label={"Email"}
              onChange={(e) => setUserData({ ...userData, email: e })}
            />

            <Input
              secureTextEntry={true}
              label={"Password"}
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e })}
            />

            <Input
              secureTextEntry={true}
              label={"Confirm Password"}
              value={userData.confirmpwd}
              onChange={(e) => setUserData({ ...userData, confirmpwd: e })}
            />
            <UserImageField response={response} modalHandler={modalHandler} />
            <TermsAndConditionsField
              setUserData={setUserData}
              userData={userData}
            />
            <SignUpButton
              showLoader={showLoader}
              onSubmit={onSubmit}
              text={"Sign Up"}
            />
            <JumpToLoginSection navigation={navigation} />
            <ErrorField text={errorMsg} />
          </View>
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
          <ProfileModal setModal={setModal} setResponse={setResponse} />
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
