import React, { useState } from "react";
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { AppHeader, Piker, SellerListItem } from "../../Component/index";
import { getUser } from "../../LocalStore/AuthStore";
import { CATEGORY_CONTEXT } from "../../Store/index";
const CategoryContext = CATEGORY_CONTEXT;

const { width } = Dimensions.get("window");

export default ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUser().then(async (user) => {
        if (user !== null) {
          // onAuth={currentUser !== null ? false : () => navigation.navigate("Signup")}
          const value = JSON.parse(user);
          setCurrentUser(value);
        }
      });
    });
    return unsubscribe;
  }, []);

  return (
    <View style={{ backgroundColor: "#f2f3f2", flex: 1 }}>
      {/* <AppHeader navigation={navigation} onPress={() => navigation.openDrawer()}
                onAuth={currentUser !== null ? () => navigation.navigate("UserProfile") : () => navigation.navigate("Signup")}
                leftIcon={require("../../Assates/HeaderIcons/menu.png")} /> */}
      <AppHeader
        onPress={() => navigation.openDrawer()}
        navigation={navigation}
        onAuth={
          currentUser !== null ? false : () => navigation.navigate("UserProfile")
        }
        leftIcon={require("../../Assates/HeaderIcons/menu.png")}
      />
      <ScrollView>
        <View
          style={{
            marginVertical: 3,
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* {[1, 2, 3, 4, 5, 6, 7, 8,4,,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,].map(() => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate("SearchResult")} style={{ height: width / 3, width: "33%", padding: 3, }}>
                                <View style={{ flex: 1, backgroundColor: "#fff", elevation: 0, borderRadius: 5, justifyContent: "center", alignItems: "center" }} >
                                    <Text style={{ fontSize: 16, fontFamily: "Poppins-Regular", textAlign: "center", marginTop: 15 }} >Category</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })} */}
          <CategoryContext.Consumer>
            {({ categories }) => (
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={3}
                data={categories}
                renderItem={({ item }) => {
                  console.log(item);
                  return (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("SearchResult")}
                      style={{ height: width / 3, width: "33%", padding: 3 }}
                    >
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: "#fff",
                          elevation: 0,
                          borderRadius: 5,
                          justifyContent: "center",
                          alignItems: "center",
                          paddingHorizontal: 3,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: "Poppins-Regular",
                            textAlign: "center",
                          }}
                        >
                          {item.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                key={({ _id }) => _id}
              />
            )}
          </CategoryContext.Consumer>
        </View>
      </ScrollView>
    </View>
  );
};
