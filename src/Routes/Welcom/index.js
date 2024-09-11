import React from "react";
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";
import appLogo from "../../Assates/logo/Service64-Logo-dark4.png";
import AsyncStorage from "@react-native-community/async-storage";

export default ({ navigation }) => {
  const isAlreadyOpen = async () => {
    await AsyncStorage.setItem("open", "true");
    try {
      navigation.navigate("SideMenu");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
      }}
    >
      <Image
        style={{ width: 230, height: 53.67, marginVertical: 30 }}
        source={appLogo}
      />
      <View style={{ marginVertical: 15, alignSelf: "flex-start" }}>
        <Text
          style={{
            fontSize: 19,
            fontFamily: "Poppins-SemiBold",
            color: "#000",
          }}
        >
          GET YOUR JOB DONE EASILY
        </Text>
        <Text
          style={{
            fontSize: 19,
            fontFamily: "Poppins-SemiBold",
            color: "#000",
          }}
        >
          WITH PROFESSIONAL WORKERS
        </Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Poppins-Medium",
          color: "#000",
          lineHeight: 23,
          marginVertical: 5,
        }}
      >
        We are a directory website, where we have a large number of hand vetted
        professionals to answer your call and get the problem solved.
      </Text>
      <View
        style={{
          height: 60,
          alignSelf: "flex-end",
          marginTop: 40,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
          onPress={() => isAlreadyOpen()}
        >
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 20,
              borderStyle: "solid",
              borderColor: "#EEE",
              borderWidth: 2,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Poppins-Medium",
                color: "#000",
              }}
            >
              Next
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
