import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  BackHandler,
  ScrollView,
} from "react-native";
import { AppHeader, Input } from "../../Component/index";
import request from "../../Request/request";
import { setUser } from "../../LocalStore/AuthStore";
import Loader from "../../Component/Loader";

export default ({ route, navigation }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    number: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  React.useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const onChangeEmail = (e) => {
    if (isNaN(Number(e))) {
      setLoginData({ ...loginData, email: e, number: undefined });
    } else {
      setLoginData({ ...loginData, number: e, email: undefined });
    }
  };

  const loginNow = () => {
    setErrorMsg("");
    setShowLoader(true);
    console.log(loginData);
    request
      .post({ body: loginData, url: "auth/signin" })
      .then(({ data }) => {
        if (data.message == "Login Successful") {
          setUser(data.user).then((res) => {
            if (res == 200) {
              console.log(res);
              navigation.navigate("HomeScreen");
            }
          });
        } else {
          setErrorMsg(data.message);
        }
        setShowLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setShowLoader(false);
        setErrorMsg("Somthing went to wrong!");
      });
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <AppHeader
        navigation={navigation}
        hideMenuIcon={route.params ? route.params.hideBackBtn : false}
        onPress={() => navigation.goBack()}
        leftIcon={require("../../Assates/HeaderIcons/arrow.png")}
        openDrawer={navigation.openDrawer}
      />
      <ScrollView>
        <View style={{ paddingTop: 40 }}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: "Poppins-Regular",
              textAlign: "center",
            }}
          >
            Login to your account
          </Text>
          {/* <Text style={{ fontSize: 14, textAlign: "center", fontFamily: "Poppins-Medium", marginTop: 10 }} >
                        Lorem ispum is simplly dummy text of the
               </Text>
                    <Text style={{ fontSize: 14, textAlign: "center", fontFamily: "Poppins-Medium" }} >
                        printing and typesetting industry
               </Text> */}
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
            {/* <ActivityIndicator size={"large"} color={"red"} /> */}
          </View>
        ) : (
          <View style={{ paddingHorizontal: 20, marginTop: 128, flex: 1 }}>
            {/* <View style={{ height: 100 }}> */}
            <Input
              keyboardType={"phone-pad"}
              label={"Phone Number"}
              onChange={(e) => onChangeEmail(e)}
            />
            {/* </View> */}
            {/* <View style={{ height: 80 }}> */}
            <Input
              secureTextEntry={true}
              label={"Password"}
              onChange={(e) => setLoginData({ ...loginData, password: e })}
            />
            {/* </View> */}
            <View>
              <TouchableOpacity
                onPress={() => (showLoader ? null : loginNow())}
                style={{
                  marginTop: 5,
                  height: 45,
                  width: 160,
                  borderRadius: 3,
                  backgroundColor: "#15B7C9",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* {showLoader ? (
                <ActivityIndicator size={"small"} color={"#fff"} />
              ) : ( */}
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins-Regular",
                    color: "#fff",
                    // lineHeight: 14,
                  }}
                >
                  Login Now
                </Text>
                {/* )} */}
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("UserProfile")}
                style={{ flexDirection: "row", marginTop: 5 }}
              >
                <Text style={{ fontSize: 13, fontFamily: "Poppins-Medium" }}>
                  Not a member?{" "}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Poppins-Regular",
                    color: "#15B7C9",
                  }}
                >
                  {" "}
                  Signup
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
        )}
      </ScrollView>
    </View>
  );
};
