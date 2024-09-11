import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AppHeader, Input, DateTimePicker } from "../../Component/index";
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
    category: "aaa",
    city: "",
    location: "",
    phone_number: "",
    saller_img: "",
    photo_name: "",
    password: "",
    confirmpwd: "",
    email: "",
    date_of_birth: "",
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
    userData.user_type = "Seller";
    userData.date_of_birth = convertToDate(dob.current);
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
      .post({ body: user, url: "listing/add_listing" })
      .then(({ data }) => {
        console.log(data, "000");
        if (!data.message) {
          setUser(data).then((res) => {
            if (res == 200) {
              setShowLoader(false);
              console.log(res);
            }
          });
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
  };

  const modalHandler = (type) => {
    setModal(true);
    setmodalType(type);
  };

  /**
   * DateString recieves DD/MM/YYYY format String and convert it to Date Obj
   * @param {String} dateString
   * @returns {Date} dateString is valid
   *
   */
  const convertToDate = (dateString) => {
    if (
      !!dateString &&
      typeof dateString === "string" &&
      /[^0-9]+/.test(dateString)
    ) {
      let format;
      let d = dateString.split(/[^0-9]+/);
      if (d.length > 0) format = d[2] + "/" + d[1] + "/" + d[0]; //YYYY/MM/DD
      return new Date(format);
    }
    return "Invalid Date";
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
          heading={"রেজিস্ট্রেশন করুন"}
          text={
            "এখানে সাইন আপ এর মাধ্যমে আপনার সিলেক্ট করা এলাকার লোকজন সহজেই আপনার সাথে যোগাযোগ করতে পারবে।"
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
              label={"আপনার নাম"}
              onChange={(e) => setUserData({ ...userData, fullName: e })}
            />
            <TouchableOpacity
              onPress={() => modalHandler("cat")}
              activeOpacity={0.8}
            >
              <Input
                editable={false}
                value={userData.category}
                label={"যে ক্যাটাগরিতে কাজ করবেন"}
                onChange={(e) => setUserData({ ...userData, category: e })}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => modalHandler("loc")}
            >
              <Input
                editable={false}
                value={selectCity.label || ""}
                label={"যে শহরে কাজ করতে চান"}
                onChange={(e) => setUserData({ ...userData, city: e })}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Input
                value={locs}
                editable={false}
                label={"যে এলাকায় কাজ করবেন"}
                onChange={(e) => setUserData({ ...userData, location: e })}
              />
            </TouchableOpacity>
            <Input
              keyboardType={"phone-pad"}
              value={userData.phone_number}
              label={"আপনার মোবাইল নম্বর"}
              onChange={(e) => setUserData({ ...userData, phone_number: e })}
            />
            <Input
              value={dob.current}
              label={"জন্ম তারিখ"}
              placeholder="DD/MM/YYYY"
              onChange={(e) => {
                setUserData({ ...userData, date_of_birth: e });
                dob.current = e;
                console.log(e);
              }}
            />
            {/* <DateTimePicker label="জন্ম তারিখ" valueRef={dob} /> */}
            <Input
              label={"জাতীয় পরিচয়পত্র নম্বর"}
              value={userData.national_id}
              onChange={(e) => setUserData({ ...userData, national_id: e })}
            />
            <Input
              label={"বর্তমান ঠিকানা"}
              value={userData.current_address}
              multiline={true}
              height={"auto"}
              onChange={(e) => setUserData({ ...userData, current_address: e })}
            />
            <Input
              label={"স্থায়ী ঠিকানা"}
              value={userData.permanent_address}
              multiline={true}
              height={"auto"}
              onChange={(e) =>
                setUserData({ ...userData, permanent_address: e })
              }
            />
            <View>
              <Input
                multiline={true}
                label={"আপনার কাজ সম্পর্কে লিখুন"}
                value={userData.description}
                onChange={(e) => setUserData({ ...userData, description: e })}
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
            <Input
              secureTextEntry={true}
              label={"পাসওয়ার্ড দিন"}
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e })}
            />
            <Input
              secureTextEntry={true}
              label={"পুনরায় পাসওয়ার্ড দিন"}
              value={userData.confirmpwd}
              onChange={(e) => setUserData({ ...userData, confirmpwd: e })}
            />
            <UserImageField modalHandler={modalHandler} response={response} />
            <TermsAndConditionsField
              setUserData={setUserData}
              userData={userData}
            />
            <SignUpButton
              showLoader={showLoader}
              onSubmit={onSubmit}
              text={"সাইন আপ"}
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
