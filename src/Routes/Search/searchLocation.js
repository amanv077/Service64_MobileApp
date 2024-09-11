import React, { useEffect, useState } from "react";
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { AppHeader, Collaps, SearchFiter } from "../../Component/index";

export default ({
  multiSelect,
  navigation,
  setModalVisible,
  filter,
  city,
  getData,
  setSelectCity,
  selectCity,
  selectLoc,
  setSelectLoc,
}) => {
  const [isSearchBar, setIsSearch] = useState(true);
  const [isPlusShow, setIsPlusShow] = useState(true);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [filtedItems, setFilterdItem] = useState([]);

  // useEffect(() => { }, [selectLoc]);

  const pickCity = async (item) => {
    setSelectLoc([]);
    await setIsSearch(false);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false, // Add This line
    }).start(() => {});
    await setSelectCity(item);
  };

  const pickLoc = (item, index) => {
    if (filter) {
      setSelectLoc(item.label);
      setModalVisible(false);
    } else {
      if (selectCity.locations[index].isSelected) {
        delete selectCity.locations[index].isSelected;
        setSelectLoc((p) => p.filter((x) => x !== item.label));
      } else {
        selectCity.locations[index].isSelected = true;
        setSelectCity(selectCity);
        setSelectLoc((p) => [...p, item.label]);
      }
    }
  };
  const onCancelCity = async () => {
    await Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false, // Add This line
    }).start(async () => {
      await setIsSearch(true);
      if (selectLoc.length > 0) {
        selectCity.locations.map((v, i) => {
          delete selectCity.locations[i].isSelected;
        });
        setModalVisible(false);
      }
    });
  };
  const he = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 65],
  });

  const justCityPick = (item) => {
    setSelectCity(item);
    setModalVisible(false);
    getData(item.label, "C_I");
  };

  const justLocPick = (item, index) => {
    pickCity(city[index]);
    setIsPlusShow(false);
    // setSelectLoc(item.label)
    // setModalVisible(false)
  };

  const onSelectLoc = (item) => {
    setSelectLoc(item.label);
    setModalVisible(false);
    getData(item.label, "L_U");
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
          isSearchBar={isSearchBar}
          title={"Pick Location"}
          leftIcon={
            selectLoc.length == 0 || multiSelect == undefined
              ? require("../../Assates/HeaderIcons/arrow.png")
              : require("../../Assates/HeaderIcons/tick.png")
          }
          openDrawer={navigation.openDrawer}
        />
        {isSearchBar ? (
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
                  data={city}
                  filteData={filteData}
                  placeholder={"Search for a location"}
                />
                {/* <TextInput style={{ flex: 1, fontSize: 14 }} placeholderTextColor={"#7f8584"} placeholder={"Search for a location"} /> */}
              </View>
            </View>
          </View>
        ) : (
          <Animated.View
            style={{
              height: he,
              backgroundColor: "#15B7C9",
              borderBottomColor: "#e7edee",
              borderBottomWidth: 1,
              justifyContent: "center",
              paddingHorizontal: 15,
            }}
          >
            <Text style={{ fontSize: 14, color: "#2f3432" }}>
              {selectCity.label}
            </Text>
          </Animated.View>
        )}
        {/* <FlatList data={!isSearchBar ? selectCity.locations : filtedItems.length ? filtedItems : city}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                {
                                    getData ?
                                        <View activeOpacity={1} style={{ height: 60, backgroundColor: "#fff", borderBottomColor: "#e7edee", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", paddingHorizontal: 15 }} >
                                            <TouchableOpacity onPress={() => isPlusShow ? justCityPick(item) : onSelectLoc(item)} style={{ flex: 1, justifyContent: "center" }} >
                                                <Text style={{ fontSize: 14, color: "#2f3432" }} >{item.label}</Text>
                                            </TouchableOpacity>
                                            {isPlusShow ?
                                                <TouchableOpacity onPress={() => justLocPick(item, index)} style={{ width: 60, height: 30, justifyContent: "center", alignItems: "flex-end" }} >
                                                    <Image source={require("../../Assates/plus.png")} style={{ height: 15, width: 15 }} />
                                                </TouchableOpacity> : null}
                                        </View>
                                        :
                                        <TouchableOpacity activeOpacity={1} onPress={() => !isSearchBar ? pickLoc(item, index) : pickCity(item)} style={{ height: 60, backgroundColor: "#fff", borderBottomColor: "#e7edee", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", paddingHorizontal: 15 }} >
                                            <View style={{ flex: 1, justifyContent: "center" }} >
                                                <Text style={{ fontSize: 14, color: "#2f3432" }} >{item.label}</Text>
                                            </View>
                                            {item.isSelected ?
                                                <View style={{ width: 30, height: 30, justifyContent: "center", alignItems: "flex-end" }} >
                                                    <Image source={require("../../Assates/check.png")} style={{ height: 20, width: 20 }} />
                                                </View>
                                                : null}
                                        </TouchableOpacity>
                                }
                            </>
                        )
                    }} keyExtractor={(e) => e._id + (Math.random(10.22) * 124.23 * Math.random(12.012))} /> */}
        <ScrollView>
          {(!isSearchBar
            ? selectCity.locations
              ? selectCity.locations
              : []
            : filtedItems.length
            ? filtedItems
            : city
          ).map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() =>
                  !isSearchBar ? pickLoc(item, index) : pickCity(item)
                }
                style={{
                  height: 60,
                  backgroundColor: "#fff",
                  borderBottomColor: "#e7edee",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 15,
                }}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={{ fontSize: 14, color: "#2f3432" }}>
                    {item.label}
                  </Text>
                </View>
                {item.isSelected ? (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}
                  >
                    <Image
                      source={require("../../Assates/check.png")}
                      style={{ height: 20, width: 20 }}
                    />
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
