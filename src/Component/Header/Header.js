import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import logo from "../../Assates/logo/Service64-Logo-dark4.png";
import menuIcon from "../../Assates/HeaderIcons/menu.png";
import profileAddIcon from "../../Assates/HeaderIcons/Vector.png";
import { getUser } from "../../LocalStore/AuthStore";

export default ({
  onAuth,
  onPress,
  leftIcon,
  hideMenuIcon,
  title,
  navigation,
}) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUser().then(async (user) => {
        if (user !== null) {
          const value = JSON.parse(user);
          await setCurrentUser(value);
        }
      });
    });
    return unsubscribe;
  }, []);
  return (
    <View
      style={{
        height: title ? 60 : 65,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 0,
        elevation: 1,
      }}
    >
      {hideMenuIcon ? (
        <View style={{ height: 40, width: 40 }} />
      ) : (
        <TouchableOpacity
          onPress={() => onPress()}
          style={{
            marginTop: 2,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image style={{ height: 17, width: 19 }} source={leftIcon} />
        </TouchableOpacity>
      )}
      {/* <TouchableOpacity onPress={() => onPress()} style={{ height: 40, width: 40, justifyContent: "center", alignItems: "center" }} >
                <Image resizeMode={"contain"} source={leftIcon} />
            </TouchableOpacity> */}
      <View style={{ flex: 1, alignItems: "center" }}>
        {title ? (
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Poppins-Regular",
              textAlign: "center",
            }}
          >
            {title}
          </Text>
        ) : (
          <Image
            style={{ width: 230, height: 33.67, marginTop: 3 }}
            resizeMode={"center"}
            source={logo}
          />
        )}
      </View>
      {!onAuth ? (
        <View style={{ height: 40, width: 40 }}></View>
      ) : (
        <TouchableOpacity
          onPress={() => (onAuth ? onAuth() : null)}
          style={{
            marginTop: 2,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentUser !== null ? (
            <View
              style={{
                backgroundColor: "#15B7C9",
                padding: 1,
                borderRadius: 50,
                marginRight: 6,
              }}
            >
              {currentUser.seller_img ? (
                <Image
                  style={{ height: 30, width: 30, borderRadius: 50 }}
                  source={{ uri: currentUser.seller_img }}
                />
              ) : null}
            </View>
          ) : (
            <Image style={{ height: 18, width: 22 }} source={profileAddIcon} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};
