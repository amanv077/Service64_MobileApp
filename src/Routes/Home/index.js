import React, { useState, useEffect, Context } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  ActivityIndicator,
  FlatList,
  BackHandler,
} from "react-native";
import { AppHeader, SellerListItem } from "../../Component/index";
import SearchLocation from "../Search/searchLocation";
import SearchCategory from "../Search/SearchCategory";
import request from "../../Request/request";
import { CITY_CONTEXT, CATEGORY_CONTEXT } from "../../Store/index";
import { getUser, isUserAgreed } from "../../LocalStore/AuthStore";
import WarningModal from "../../Component/Modal/WarningModal";

const CityContext = CITY_CONTEXT;
const CategoryContext = CATEGORY_CONTEXT;

const { width } = Dimensions.get("window");

export default ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [sallers, setSallers] = useState([]);
  // const [city, setCity] = useState([])
  // const [categories, setCategories] = useState([])
  const [selectLoc, setSelectLoc] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectCity, setSelectCity] = useState({});
  const [lodaingMsg, setLodaingMsg] = useState("Loading...");
  const [currentUser, setCurrentUser] = useState(null);
  const [isAgreedModalVisibility, setAgreedModalVisibility] = useState(false);

  React.useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUser().then(async (user) => {
        if (user !== null) {
          const value = JSON.parse(user);
          await setCurrentUser(value);
          console.log("CURRENT USER LOGIN");
        }
      });
    });

    isUserAgreed().then(async (isAgreed) => {
      if (!isAgreed) {
        setAgreedModalVisibility(!isAgreed);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setLodaingMsg("Loading...");
    request
      .post({ body: { skip: 0 }, url: "listing/get_listing" })
      .then(({ data }) => {
        setSallers(data.listing);
        setLodaingMsg("That's all we have");
      })
      .catch((err) => console.log(err));
  }, []);

  const modalHandler = (type) => {
    setModalVisible(true);
    setSearchType(type);
  };

  const searchSeller = () => {
    if (selectCity.label !== "" && selectLoc !== "" && selectCategory !== "") {
      navigation.navigate("SearchResult", {
        city: selectCity.label,
        location: selectLoc,
        category: selectCategory,
      });
    } else {
      alert("Select Category and Location");
    }
  };

  return (
    <View style={{ backgroundColor: !true ? "#fff" : "#f2f3f2", flex: 1 }}>
      <AppHeader
        onPress={() => navigation.openDrawer()}
        navigation={navigation}
        onAuth={
          currentUser !== null ? false : () => navigation.navigate("UserProfile")
        }
        leftIcon={require("../../Assates/HeaderIcons/menu.png")}
      />
      {/* <AppHeader onPress={() => navigation.openDrawer()}
                navigation={navigation}
                onAuth={currentUser !== null ?()=>navigation.navigate("UserProfile"): () => navigation.navigate("Signup")}
                leftIcon={require("../../Assates/HeaderIcons/menu.png")} /> */}

      <View style={{ paddingHorizontal: 5, flex: 1 }}>
        <View
          style={{
            backgroundColor: "#fff",
            height: 40,
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            padding: 0,
          }}
        >
          <TouchableOpacity
            onPress={() => modalHandler("loc")}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Image
              resizeMode={"stretch"}
              style={{ height: 20, width: 14 }}
              source={require("../../Assates/HomeIcons/location2.png")}
            />
            <Text
              style={{
                fontSize: 13,
                lineHeight: 14,
                marginLeft: 0,
                fontFamily: "Poppins-Regular",
              }}
            >
              {selectLoc == ""
                ? "Location"
                : selectLoc.length > 10
                ? selectLoc.slice(0, 8) + "..."
                : selectLoc}
            </Text>
          </TouchableOpacity>
          <View
            style={{ width: 1, height: 30, backgroundColor: "lightgray" }}
          />
          <TouchableOpacity
            onPress={() => modalHandler("cat")}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Image
              resizeMode={"stretch"}
              style={{ height: 18, width: 20 }}
              source={require("../../Assates/HomeIcons/category3.png")}
            />
            <Text
              style={{
                fontSize: 13,
                lineHeight: 14,
                marginLeft: 0,
                fontFamily: "Poppins-Regular",
              }}
            >
              {selectCategory == ""
                ? "Category"
                : selectCategory.length > 10
                ? selectCategory.slice(0, 8) + "..."
                : selectCategory}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => searchSeller()}
            style={{
              // height: 40,
              backgroundColor: "#15B7C9",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 80,
                height: "100%",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  fontFamily: "Poppins-Regular",
                  color: "#fff",
                }}
              >
                Search
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          data={sallers}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <View
              style={{
                backgroundColor: "#fff",
                marginBottom: 5,
                paddingHorizontal: 7,
                paddingTop: 7,
                paddingBottom: 7,
                borderRadius: 10,
              }}
            >
              {/* <Text style={{ fontSize: 13, color: "#2f3432", textAlign: "center" }} >That's all we have</Text> */}

              {lodaingMsg === "Loading..." ? (
                <ActivityIndicator color={"#15B7C9"} size={"small"} />
              ) : (
                <Text
                  style={{
                    fontSize: 13,
                    lineHeight: 14,
                    color: "#2f3432",
                    textAlign: "center",
                  }}
                >
                  {lodaingMsg}
                </Text>
              )}
            </View>
          )}
          onEndThreshold={0}
          renderItem={({ item, index }) => (
            <SellerListItem
              screen={"home"}
              item={item}
              index={index}
              location={selectLoc}
              sallers={sallers}
              navigation={navigation}
            />
          )}
          keyExtractor={({ _id }) => _id}
        />
      </View>

      <Modal
        onRequestClose={() => setModalVisible(false)}
        animationType={"slide"}
        visible={modalVisible}
      >
        {searchType == "loc" ? (
          <CityContext.Consumer>
            {({ cityHasSeller }) => (
              <SearchLocation
                navigation={navigation}
                filter={true}
                selectCity={selectCity}
                selectLoc={selectLoc}
                setSelectLoc={setSelectLoc}
                setSelectCity={setSelectCity}
                city={cityHasSeller}
                navigation={navigation}
                setModalVisible={setModalVisible}
              />
            )}
          </CityContext.Consumer>
        ) : (
          <CategoryContext.Consumer>
            {({ categories }) => (
              <SearchCategory
                navigation={navigation}
                selectCategory={selectCategory}
                setSelectCategory={setSelectCategory}
                categories={categories}
                navigation={navigation}
                setModalVisible={setModalVisible}
                filterByLoc={true}
                selectedCity={selectCity}
                selectedLoc={selectLoc}
              />
            )}
          </CategoryContext.Consumer>
        )}
      </Modal>

      <Modal
        visible={isAgreedModalVisibility}
        transparent={false}
        animationType={"fade"}
        onRequestClose={() => setAgreedModalVisibility(false)}
      >
        <WarningModal set_Alert_Visibility={setAgreedModalVisibility} />
      </Modal>
    </View>
  );
};
