import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { userAgreed } from "../../LocalStore/AuthStore";
import logo from "../../Assates/logo/Service64-Logo-Avatar.png";

const logoURI = Image.resolveAssetSource(logo).uri;
const termsAndConditionsURI = "https://service64.com/terms-conditions";

export default function TermsAndConditionsUpdateModal({
  set_Alert_Visibility,
}) {
  let ok_Button = () => {
    userAgreed().then((res) => {
      if (res == 200) {
        console.log(res);
        // setShowLoader(false);
      }
    });
    set_Alert_Visibility(false);
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        style={[styles.Alert_Close, { color: "#15b7c9" }]}
        onPress={() => set_Alert_Visibility(false)}
      >
        <Text
          style={[
            styles.Alert_Linking_Text,
            { color: "#15b7c9", marginTop: 0 },
          ]}
        >
          X
        </Text>
      </TouchableOpacity>
      <View style={styles.Alert_Main_View}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode={"stretch"}
            style={styles.image}
            source={{ uri: logoURI }}
          />
        </View>
        <Text style={styles.Alert_Title}>
          Service64 is updating its terms and conditions.
        </Text>

        <View style={styles.Alert_Linking}>
          <Text style={styles.Alert_Linking_Text}>Agree with the </Text>
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
            <Text style={[styles.Alert_Linking_Text, { color: "#15b7c9" }]}>
              terms and conditions
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.Alert_Message}>
          By tapping Agree, you accept the service64 terms and conditions.
          You'll need to accept these updates to continue using Service64. You
          can alse visit the Help Center if you would prefer to delete your
          account and would like more information.
        </Text>

        <View style={styles.Alert_Button}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={ok_Button}
            activeOpacity={0.7}
          >
            <Text style={styles.TextStyle}> Agree </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Alert_Main_View: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  Alert_Title: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },

  Alert_Linking: {
    flexDirection: "row",
    alignItems: "center",
  },

  Alert_Linking_Text: {
    marginTop: 15,
    fontSize: 16,
    color: "#000",
    fontFamily: "Poppins-Regular",
  },

  Alert_Message: {
    fontSize: 12,
    marginTop: 15,
    color: "#333",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },

  Alert_Button: { flexDirection: "row" },

  Alert_Close: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    right: 20,
    top: 20,
    backgroundColor: "#eee",
    borderRadius: 50,
    padding: 7,
    paddingHorizontal: 16,
    fontFamily: "Poppins-ExtraBold",
  },

  buttonStyle: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    width: 150,
    height: 150,
    backgroundColor: "transparent",
    marginBottom: 20,
  },

  image: {
    flex: 1,
  },

  TextStyle: {
    fontSize: 18,
    padding: 7,
    borderRadius: 7,
    marginTop: 15,
    color: "#fff",
    backgroundColor: "#15b7c9",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
});
