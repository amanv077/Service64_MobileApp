import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { AppHeader, Input } from "../../Component/index";
import request from "../../Request/request";
import Loader from "../../Component/Loader";

export default ({ navigation }) => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loader, setLoadr] = useState(false);

  const submit = () => {
    setLoadr(true);
    // console.log(contactData);
    if (
      contactData.name !== "" &&
      contactData.email !== "" &&
      contactData.message !== ""
    ) {
      request
        .post({ body: contactData, url: "mail/mailtoadmin" })
        .then((res) => {
          console.log(res);
          setLoadr(false);
        })
        .catch((e) => console.log(e));
    } else {
      setLoadr(false);
    }
  };
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <AppHeader
        navigation={navigation}
        onPress={() => navigation.goBack()}
        leftIcon={require("../../Assates/HeaderIcons/arrow.png")}
      />
      <ScrollView>
        {/* <AppHeader onPress={() => navigation.openDrawer()} leftIcon={require("../../Assates/HeaderIcons/menu.png")} /> */}
        <View style={{ marginVertical: 45 }}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: "Poppins-Regular",
              textAlign: "center",
            }}
          >
            Feel free to contact us
          </Text>
        </View>
        {loader ? (
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
          <View
            style={{
              paddingHorizontal: 20,
              justifyContent: "center",
            }}
          >
            {/* <View style={{ height: 80 }}> */}
            <Input
              value={contactData.name}
              label={"Full Name"}
              onChange={(e) => setContactData({ ...contactData, name: e })}
            />
            {/* </View> */}
            {/* <View style={{ height: 80 }}> */}
            <Input
              value={contactData.email}
              label={"Email"}
              onChange={(e) => setContactData({ ...contactData, email: e })}
            />
            {/* </View> */}
            {/* <View style={{ height: 100 }}> */}
            <Input
              value={contactData.message}
              multiline={true}
              label={"Message"}
              onChange={(e) => setContactData({ ...contactData, message: e })}
            />
            {/* </View> */}
            <View>
              <TouchableOpacity
                onPress={() => (loader ? null : submit())}
                style={{
                  marginTop: 10,
                  height: 45,
                  width: 160,
                  borderRadius: 3,
                  backgroundColor: "#15B7C9",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loader ? (
                  <ActivityIndicator size={"small"} color={"#fff"} />
                ) : (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Poppins-Regular",
                      color: "#fff",
                    }}
                  >
                    Send Message
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
