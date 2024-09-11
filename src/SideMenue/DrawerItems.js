import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { removeUser, getUser } from "../LocalStore/AuthStore";

function items(user) {
  return [
    {
      title: "Update Profile",
      startIcon: "",
      endIcon: "",
      route: "Profile",
      action: (navigation) => {},
    },
    // {
    //     title: "Privacy Policy",
    //     startIcon: "",
    //     endIcon: "",
    //     route: "Profile",
    //     action: (navigation) => {

    //     }
    // },
    {
      title: "Contact",
      startIcon: "",
      endIcon: "",
      route: "Profile",
      action: (navigation) => {
        navigation.navigate("ContactUs");
      },
    },
    {
      title: "About us",
      startIcon: "",
      endIcon: "",
      route: "Aboutus",
      action: (navigation) => {
        navigation.navigate("Aboutus");
      },
    },
    {
      title: user == null ? "Login" : "Logout",
      startIcon: "",
      endIcon: "",
      route: "Logout",
      action: (navigation) => {
        if (user == null) {
          navigation.closeDrawer();
          navigation.navigate("Login", { hideBackBtn: false });
        } else {
          removeUser().then((res) => {
            if (res == 200) {
              navigation.closeDrawer();
              navigation.navigate("Login", { hideBackBtn: true });
            }
          });
        }
      },
    },
  ];
}

export default ({ navigation }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUser().then((user) => {
        setCurrentUser(JSON.parse(user));
      });
    });
    return unsubscribe;
  }, []);

  return (
    <View>
      {items(currentUser).map((val, key) => (
        <React.Fragment key={key}>
          <View style={{ height: 40 }}>
            <View style={{ width: 40 }}>
              <View style={{ height: 20, width: 20 }} />
            </View>
            <TouchableOpacity
              onPress={() => val.action(navigation, val.title)}
              style={{ flex: 1, paddingHorizontal: 20 }}
            >
              <Text style={{ fontFamily: "Poppins-Regular", fontSize: 13 }}>
                {val.title}
              </Text>
            </TouchableOpacity>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
};
