import * as React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  UserProfile,
  SearchResult,
  Category,
  ContactUs,
} from "../../index";
import { useNavigation } from "@react-navigation/native";

//replace as image in bottomNavBar
// import BottomTabBar from "../../Component/Menu/BottomTabBar";
function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs({ currentUser }) {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "transparent", flex: 1 }}>
      <Tab.Navigator
        tabBarOptions={{
          adaptive: true,
          showLabel: false,
          style: {
            height: 48,
            // borderTopColor: "#fff",
            borderTopWidth: 0,
            backgroundColor: "white",
            // elevation: 5,
          },
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                style={{ height: 22, width: 20 }}
                resizeMode={"stretch"}
                source={require("../../Assates/bottomtabIcons/home4.png")}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Categories"
          component={Category}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                style={{ height: 21, width: 22 }}
                resizeMode={"stretch"}
                source={require("../../Assates/bottomtabIcons/category3.png")}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchResult}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} activeOpacity={0.9}>
                <View
                  style={{
                    marginTop: 0,
                    alignItems: "center",
                    flex: 1,
                    backgroundColor: "transparent",
                  }}
                >
                  <View
                    style={{
                      height: 35,
                      width: 59,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#f2f3f2",
                      // backgroundColor: "transparent",
                      position: "absolute",
                      borderBottomRightRadius: 50,
                      borderBottomLeftRadius: 50,
                      position: "absolute",
                      bottom: 13,
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 100,
                        height: 50,
                        width: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#15B7C9",
                        position: "absolute",
                        bottom: 5,
                      }}
                    >
                      <Image
                        style={{ height: 22, width: 20 }}
                        resizeMode={"stretch"}
                        source={require("../../Assates/bottomtabIcons/search3.png")}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        
        <Tab.Screen
          name="AddAcount"
          component={UserProfile}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                style={{ height: 22, width: 20 }}
                resizeMode={"stretch"}
                source={require("../../Assates/bottomtabIcons/user2.png")}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ContactUs"
          component={ContactUs}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                style={{ height: 18, width: 22 }}
                resizeMode={"stretch"}
                source={require("../../Assates/bottomtabIcons/contact.png")}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export default function App({ currentUser }) {
  return <MyTabs currentUser={currentUser} />;
}
