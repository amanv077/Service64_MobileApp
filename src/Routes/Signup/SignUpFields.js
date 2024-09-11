import React from "react";
import {
  CheckBox,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";

const IMAGE_CONFIG = {
  mediaType: "photo",
  includeBase64: true,
  maxHeight: 200,
  maxWidth: 200,
};

const termsAndConditionsURI = "https://service64.com/terms-conditions";

export function HeadingField({ heading, text }) {
  return (
    <View style={{ paddingTop: 15 }}>
      <Text
        style={{
          fontSize: 25,
          fontFamily: "Poppins-Regular",
          textAlign: "center",
        }}
      >
        {heading}
      </Text>
      <Text
        style={{
          fontSize: 14,
          textAlign: "center",
          marginTop: 10,
          fontFamily: "Poppins-Medium",
        }}
      >
        {text}
      </Text>
    </View>
  );
}

export function UserImageField({ response, modalHandler }) {
  return (
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
          এখানে আপনার একটি  ছবি
        </Text>
        <Text style={{ fontSize: 13, fontFamily: "Poppins-Medium" }}>
          আপলোড করুন
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: "Poppins-Medium",
            color: "#15B7C9",
          }}
        >
          ছবি খুঁজে নিন
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export function TermsAndConditionsField({ setUserData, userData }) {
  return (
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
      <Text style={{ fontFamily: "Poppins-Regular" }}>Agree with the </Text>
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
        <Text style={{ fontFamily: "Poppins-Regular", color: "#15b7c9" }}>
          terms and conditions
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function SignUpButton({ showLoader, onSubmit, text }) {
  return (
    <TouchableOpacity
      onPress={() => (showLoader ? null : onSubmit())}
      style={{
        marginTop: 20,
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
          }}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export function JumpToLoginSection({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Login")}
      style={{
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Text style={{ fontSize: 13 }}>Already have an account? </Text>
      <Text
        style={{
          fontSize: 13,
          fontFamily: "Poppins-Regular",
          color: "#15B7C9",
        }}
      >
        Login
      </Text>
    </TouchableOpacity>
  );
}

export function ErrorField({ text }) {
  return (
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
        {text}
      </Text>
    </View>
  );
}

export function ProfileModal({ setModal, setResponse }) {
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
  return (
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
  );
}
