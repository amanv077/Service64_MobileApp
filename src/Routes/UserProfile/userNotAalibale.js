import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AppHeader } from "../../Component/index";

function HrText({ text }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: 2,
          flex: 0.3,
          backgroundColor: "#aaa",
        }}
      ></View>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Poppins-Regular",
          color: "#333",
          marginHorizontal: 15,
        }}
      >
        {text}
      </Text>
      <View
        style={{
          height: 2,
          flex: 0.3,
          backgroundColor: "#aaa",
        }}
      ></View>
    </View>
  );
}

export default ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#fcfcfc" }}>
        <View style={styles.headerContainer}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: "Poppins-Regular",
              textAlign: "center",
            }}
          >
            Login or create an acount
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins-Regular",
              textAlign: "center",
              marginTop: 10,
              width: "80%",
              textAlign: "center",
            }}
          ></Text>
        </View>

        <View
          style={{ marginHorizontal: 40, flex: 2, justifyContent: "center" }}
        >
          {/* <HrText text={"Login"} /> */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{
              height: 40,
              borderRadius: 3,
              backgroundColor: "#15B7C9",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Regular",
                color: "#fff",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <HrText text={"Sign Up"} />
          <TouchableOpacity
            onPress={() => navigation.navigate("ServiceProviderSignUp")}
            style={{
              marginTop: 20,
              height: 40,
              borderRadius: 3,
              backgroundColor: "#15B7C9",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Regular",
                color: "#fff",
              }}
            >
              আপনি কি কাজ খুঁজছেন? বা কাজ করতে চান?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ServiceUserSignUp")}
            style={{
              marginTop: 20,
              height: 40,
              borderRadius: 3,
              backgroundColor: "#15B7C9",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Regular",
                color: "#fff",
              }}
            >
              আপনি কি কাউকে রিভিউ দিতে চান?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  headerContainer: {
    flex: 0,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    display: "none",
  },
});
