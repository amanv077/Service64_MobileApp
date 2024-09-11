// import React, { useState } from "react";
// import { View, StatusBar, Image, Text, TouchableOpacity, FlatList, Modal, Dimensions, StyleSheet, ScrollView, TextInput } from "react-native";
// import RNPickerSelect from 'react-native-picker-select';
// import { AppHeader, Piker, SellerListItem } from "../../Component/index"
// // https://stackoverflow.com/questions/47308089/react-native-how-to-open-route-from-push-notification
// const { width } = Dimensions.get("window")

// export default ({ navigation, setModalVisible, categories }) => {
//     return (
//         <View style={{ backgroundColor: "#f2f3f2", flex: 1 }} >
//             <View style={{ flex: 1, backgroundColor: "#fcfcfc" }} >
//                 <AppHeader onPress={() => setModalVisible(false)} title={"Pick Category"} leftIcon={require("../../Assates/HeaderIcons/arrow.png")} openDrawer={navigation.openDrawer} />
//                 <View style={{ height: 60, backgroundColor: "#fff", justifyContent: "center", elevation: 1, paddingHorizontal: 15 }} >
//                     <View style={{ height: 40, backgroundColor: "#e7edee", borderRadius: 3, flexDirection: "row", alignItems: "center", }} >
//                         <View style={{ width: 40, alignItems: "center", }} >
//                             <Image resizeMode={"center"} source={require("../../Assates/HomeIcons/search.png")} />
//                         </View>
//                         <View style={{ flex: 1 }} >
//                             <TextInput style={{ flex: 1, fontSize: 14 }} placeholderTextColor={"#7f8584"} placeholder={"Search for a Category"} />
//                         </View>
//                     </View>
//                 </View>
//                 <FlatList data={categories} renderItem={({ item }) => {
//                     return (
//                         <View style={{ height: 50, backgroundColor: "#fff", borderBottomColor: "#e7edee", borderBottomWidth: 1, justifyContent: "center", paddingHorizontal: 15 }} >
//                             <Text style={{ fontSize: 14, color: "#2f3432" }} >{item.label}</Text>
//                         </View>
//                     )
//                 }} keyExtractor={(e) => e._id} />
//             </View>
//         </View>
//     )
// }

import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { AppHeader, Collaps, SearchFiter } from "../../Component/index";
// https://stackoverflow.com/questions/47308089/react-native-how-to-open-route-from-push-notification
const { width } = Dimensions.get("window");

export default ({
  navigation,
  setModalVisible,
  getData,
  categories,
  selectCategory,
  setSelectCategory,
  filterByLoc = false,
  selectedCity,
  selectedLoc,
}) => {
  // const [selectCategory, setSelectCategory] = useState({})
  const [isSearchBar, setIsSearch] = useState(true);
  const [filtedItems, setFilterdItem] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);

  useEffect(() => {
    if (filterByLoc) {
      if (selectedCity?.label) {
        let filterCategories = categories.filter((category) => {
          let city = category.areas.find((area) => {
            if (area.city === selectedCity.label) {
              let loc = area.locations.find((loc) => loc.label === selectedLoc);
              if (!!loc) return true;
            }
          });
          if (!!city) return true;
          return false;
        });
        console.log(filterCategories);
        setFilterCategories(filterCategories);
      }
    } else {
      setFilterCategories(categories);
    }
  }, []);

  const pickCat = (item) => {
    if (getData) {
      getData(item.label, "C_T");
    }
    setModalVisible(false);
    setSelectCategory(item.label);
  };

  const onCancelCity = () => {
    setIsSearch(true);
    // setSelectCategory({})
  };

  const filteData = (data) => {
    setFilterdItem(data);
  };

  return (
    <View style={{ backgroundColor: "#f2f3f2", flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#fcfcfc" }}>
        <AppHeader
          navigation={navigation}
          onPress={() =>
            !isSearchBar ? onCancelCity() : setModalVisible(false)
          }
          title={"Pick Category"}
          leftIcon={require("../../Assates/HeaderIcons/arrow.png")}
          openDrawer={navigation.openDrawer}
        />
        <View
          style={{
            height: 60,
            backgroundColor: "#fff",
            justifyContent: "center",
            elevation: 1,
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              // height: 40,
              backgroundColor: "#e7edee",
              borderRadius: 3,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ width: 40, alignItems: "center" }}>
              <Image
                resizeMode={"center"}
                source={require("../../Assates/HomeIcons/search.png")}
              />
            </View>
            <View style={{ flex: 1 }}>
              <SearchFiter
                data={filterCategories}
                filteData={filteData}
                placeholder={"Search for a Category"}
              />
              {/* <TextInput style={{ flex: 1, fontSize: 14 }} placeholderTextColor={"#7f8584"} placeholder={"Search for a location"} /> */}
            </View>
          </View>
        </View>
        {filterByLoc &&
          !(selectedCity && selectedLoc && selectedLoc.length > 0) && (
            <TouchableOpacity
              onPress={() => null}
              style={{
                height: 60,
                backgroundColor: "#fff",
                borderBottomColor: "#e7edee",
                borderBottomWidth: 1,
                justifyContent: "center",
                paddingHorizontal: 15,
              }}
            >
              <Text
                style={{ fontSize: 14, color: "#2f3432", textAlign: "center" }}
              >
                First select the Location
              </Text>
            </TouchableOpacity>
          )}
        <FlatList
          data={filtedItems.length ? filtedItems : filterCategories}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => pickCat(item)}
                style={{
                  height: 60,
                  backgroundColor: "#fff",
                  borderBottomColor: "#e7edee",
                  borderBottomWidth: 1,
                  justifyContent: "center",
                  paddingHorizontal: 15,
                }}
              >
                <Text style={{ fontSize: 14, color: "#2f3432" }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(e) => e._id}
        />
      </View>
    </View>
  );
};
