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
import logo from "../../Assates/logo/Service64-Logo-Avatar-old.png";
import warning from "../../Assates/warning.jpg";

const logoURI = Image.resolveAssetSource(logo).uri;
const WarningURI = Image.resolveAssetSource(warning).uri;

const fraudWarningURI = "https://service64.com/fraud-warning";

export default function WarningModal({ set_Alert_Visibility }) {
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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      <View style={styles.warningImageContainer}>
        <Image
          resizeMode={"stretch"}
          style={styles.warningImage}
          source={{ uri: WarningURI }}
        />
      </View>
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
      <View style={styles.Alert_Main_View}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode={"stretch"}
            style={styles.image}
            source={{ uri: logoURI }}
          />
        </View>
        <Text style={styles.Alert_Title}>FRAUD WARNING</Text>

        <View style={styles.Alert_Linking}>
          <Text style={styles.Alert_Linking_Text}>
            Protect yourself from fraud{" "}
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(fraudWarningURI).catch((err) =>
                console.error(
                  "An error occurred while redirecting to service64 fraud warning webpage",
                  err
                )
              )
            }
          >
            <Text style={[styles.Alert_Linking_Text, { color: "#15b7c9" }]}>
              Tap here to know more about Frauds
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.Alert_Message}>
          By tapping Next, you understand the potential frauds.
          <Text style={[styles.Alert_Message, { color: "#15b7c9" }]}>
            {" "}
            No Sellers or Buyers are physically verified.
          </Text>{" "}
          Never send money to someone you do not know. Service64 isn't
          responsible for any agreement between seller and buyer. You can also
          visit the Help Center if you would like more information.
        </Text>

        <View style={styles.Alert_Button}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={ok_Button}
            activeOpacity={0.7}
          >
            <Text style={styles.TextStyle}> Next </Text>
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
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },

  Alert_Linking: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  Alert_Linking_Text: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins-Regular",
  },

  Alert_Message: {
    fontSize: 12,
    marginTop: 15,
    color: "#eee",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },

  Alert_Button: { flexDirection: "row" },

  warningImageContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    marginBottom: 20,
    backgroundColor: "#000",
  },

  warningImage: {
    flex: 1,
    opacity: 0.4,
  },

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
