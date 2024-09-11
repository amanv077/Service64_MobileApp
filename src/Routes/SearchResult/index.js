import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  FlatList,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { AppHeader, Piker, SellerListItem } from "../../Component/index";
import SearchLocation from "../Search/searchLocation";
import SearchCategory from "../Search/SearchCategory";
import { CITY_CONTEXT, CATEGORY_CONTEXT } from "../../Store/index";
import request from "../../Request/request";
import SelerList from "../../Component/SellerList/SelerList";
import { getUser } from "../../LocalStore/AuthStore";

const CityContext = CITY_CONTEXT;
const CategoryContext = CATEGORY_CONTEXT;
let stattLoading = true;
export default ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [selectLoc, setSelectLoc] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectCity, setSelectCity] = useState({});
  const [noDataOnLocation, setNoDataOnLocation] = useState(false);
  const [sallers, setSallers] = useState([]);
  const [lodaingMsg, setLodaingMsg] = useState("Loading...");
  const [filterItem, setFilterItem] = useState(
    route.params ? route.params : undefined
  );
  const [currentUser, setCurrentUser] = useState(null);
  //**************************** */
  const [selectLoc2, setSelectLoc2] = useState("");

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUser().then(async (user) => {
        if (user !== null) {
          const value = JSON.parse(user);
          setCurrentUser(value);
        }
      });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (route.params) {
      setSelectCity(route.params.city);
      setSelectLoc(route.params.location);
      setSelectLoc2(route.params.location);
      setSelectCategory(route.params.category);
    }
    if (filterItem) {
      setLodaingMsg("Loading...");
      request
        .post({ body: filterItem, url: "search" })
        .then(({ data }) => {
          console.log(data, "----");
          if (data.listing !== null) {
            setSallers(data.listing);
            setLodaingMsg("That's all we have");
          } else {
            setNoDataOnLocation(true);
            request
              .post({ body: { city: filterItem.city }, url: "searchbycity" })
              .then((res) => {
                console.log(res.data, "----");
                if (res.data.listing) {
                  const filtered = res.data.listing.filter(
                    (x) => x.category === filterItem.category
                  );
                  setSallers(filtered);
                  setSelectLoc(filterItem.city);
                  setSelectLoc2(filterItem.city);
                  if (filtered < 1) {
                    setLodaingMsg(
                      "Still, we don't have anyone in this area, please try later."
                    );
                  } else {
                    setLodaingMsg("That's all we have");
                  }
                } else {
                  setLodaingMsg(
                    "Still, we don't have anyone in this area, please try later."
                  );
                }
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      request
        .post({ body: { skip: 0 }, url: "listing/get_listing" })
        .then(({ data }) => {
          setSallers(data.listing);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const modalHandler = (type) => {
    setModalVisible(true);
    setSearchType(type);
  };

  const fetchOnScoll = async (filtersData, list) => {
    setLodaingMsg("Loading...");
    setFilterItem(filtersData);
    if (filtersData) {
      if (stattLoading) {
        stattLoading = false;
        if (noDataOnLocation) {
          request
            .post({
              body: { city: filtersData.city, skip: filtersData.skip },
              url: "searchbycity",
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.listing) {
                const filtered = res.data.listing.filter(
                  (x) => x.category === filterItem.category
                );
                setSallers(filtered);
                setSelectLoc(filterItem.city);
              }
            })
            .catch((err) => console.log(err));
        } else {
          request
            .post({ body: filtersData, url: "search" })
            .then(({ data }) => {
              console.log(data, filtersData);
              stattLoading = true;
              if (data.listing) {
                setSallers(sallers.concat(data.listing));
              } else {
                setLodaingMsg("That's all we have");
              }
            })
            .catch((err) => console.log(err));
        }
      }
    } else {
      request
        .post({ body: { skip: list }, url: "listing/get_listing" })
        .then(({ data }) => {
          if (data.listing.length > 0 && sallers) {
            setSallers(sallers.concat(data.listing));
          } else {
            setLodaingMsg("That's all we have");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const searchSeller = () => {
    setLodaingMsg("Loading...");
    const obj = {
      city: selectCity.label || selectCity,
      location: selectLoc,
      category: selectCategory,
    };
    setFilterItem(obj);
    console.log(obj);
    if (obj.city && obj.location && obj.category) {
      request
        .post({ body: obj, url: "search" })
        .then(({ data }) => {
          console.log(data);
          if (data.listing !== null) {
            setSallers(data.listing);
            setNoDataOnLocation(false);
            setSelectLoc2(selectLoc);
            setLodaingMsg("That's all we have");
          } else {
            request
              .post({ body: { city: obj.city }, url: "searchbycity" })
              .then((res) => {
                console.log(res);
                if (res.data.listing) {
                  const filtered = res.data.listing.filter(
                    (x) => x.category === obj.category
                  );
                  setSallers(filtered);
                  setNoDataOnLocation(true);
                  setSelectLoc(obj.city);
                  setSelectLoc2(obj.city);
                  console.log(filtered);
                  if (filtered < 1) {
                    setLodaingMsg(
                      "Still, we don't have anyone in this area, please try later."
                    );
                  } else {
                    setLodaingMsg("That's all we have");
                  }
                } else {
                  setSallers([]);
                  setLodaingMsg(
                    "Still, we don't have anyone in this area, please try later."
                  );
                }
              })
              .catch((err) => console.log(err));
            // setLodaingMsg("That's all we have")
            // setSallers([])
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Select Category and Location");
    }
  };

  const getData = () => {};

  return (
    <View style={{ backgroundColor: "#f2f3f2", flex: 1 }}>
      {console.log("*********************")}
      {navigation.openDrawer == undefined ? (
        <AppHeader
          navigation={navigation}
          onPress={() => navigation.goBack()}
          leftIcon={require("../../Assates/HeaderIcons/arrow.png")}
          openDrawer={navigation.openDrawer}
        />
      ) : (
        // <AppHeader navigation={navigation} onPress={() => navigation.openDrawer()}
        //     onAuth={currentUser !== null ? () => navigation.navigate("UserProfile") : () => navigation.navigate("Signup")}
        //     leftIcon={require("../../Assates/HeaderIcons/menu.png")} />
        <AppHeader
          onPress={() => navigation.openDrawer()}
          navigation={navigation}
          onAuth={
            currentUser !== null ? false : () => navigation.navigate("UserProfile")
          }
          leftIcon={require("../../Assates/HeaderIcons/menu.png")}
        />
      )}

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
              {(selectLoc == "" ? "Location" : selectLoc) || selectCity}
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
                : selectCategory.length > 8
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
          ListFooterComponent={() => (
            <View
              style={{
                backgroundColor: "#fff",
                marginBottom: 5,
                paddingHorizontal: 15,
                paddingTop: 7,
                paddingBottom: sallers.length < 4 ? 7 : 25,
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              {lodaingMsg === "Loading..." ? (
                <ActivityIndicator color={"#15B7C9"} size={"small"} />
              ) : (
                <Text
                  style={{
                    fontSize: 13,
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
          onScroll={(e) => {
            var windowHeight = Dimensions.get("window").height,
              height = e.nativeEvent.contentSize.height,
              offset = e.nativeEvent.contentOffset.y;
            if (windowHeight + offset > height) {
              if (sallers && sallers.length && filterItem) {
                fetchOnScoll(
                  {
                    location: selectLoc,
                    category: selectCategory,
                    city: selectCity.label || selectCity,
                    skip: sallers.length,
                  },
                  true,
                  sallers
                );
              } else {
                fetchOnScoll(undefined, sallers && sallers.length);
              }
            }
          }}
          renderItem={({ item, index }) => (
            <SellerListItem
              item={item}
              index={index}
              location={selectLoc2}
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
            {({ city, cityHasSeller }) => (
              <SearchLocation
                navigation={navigation}
                getData={false}
                filter={true}
                selectCity={selectCity}
                selectLoc={selectLoc}
                setSelectLoc={setSelectLoc}
                setSelectCity={setSelectCity}
                // city={city}
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
                getData={false}
                selectCategory={selectCategory}
                setSelectCategory={setSelectCategory}
                categories={categories}
                navigation={navigation}
                setModalVisible={setModalVisible}
                //Remove below 3 options to remove filter option
                filterByLoc={true}
                selectedCity={selectCity}
                selectedLoc={selectLoc}
              />
            )}
          </CategoryContext.Consumer>
        )}
      </Modal>
    </View>
  );
};

// import React, { useState, useEffect } from "react";
// import { View, StatusBar, Image, Text, TouchableOpacity, Modal, Dimensions, FlatList, StyleSheet, ScrollView, TextInput } from "react-native";
// import RNPickerSelect from 'react-native-picker-select';
// import { AppHeader, Piker, SellerListItem } from "../../Component/index";
// import SearchLocation from "../Search/searchLocation"
// import SearchCategory from "../Search/SearchCategory"
// import { CITY_CONTEXT, CATEGORY_CONTEXT } from "../../Store/index";
// import request from "../../Request/request"
// import SelerList from "../../Component/SellerList/SelerList";

// const CityContext = CITY_CONTEXT;
// const CategoryContext = CATEGORY_CONTEXT;

// export default ({ route, navigation }) => {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [searchType, setSearchType] = useState("");
//     const [selectLoc, setSelectLoc] = useState("")
//     const [selectCategory, setSelectCategory] = useState("")
//     const [selectCity, setSelectCity] = useState({})
//     const [sallers, setSallers] = useState([])
//     const [filterKey, setFilterKey] = useState("")
//     const [filterItem, setFilterItem] = useState(route.params ? route.params : undefined)

//     useEffect(() => {
//         // if (filterItem) {
//         //     setSelectLoc(filterItem.location)
//         //     setSelectCategory(filterItem.category)
//         //     request.post({ body: filterItem, url: "search" }).then(({ data }) => {
//         //         setSallers(data.listing)
//         //     }).catch(err => console.log(err))
//         // } else {
//         //     request.get({ body: { skip: 0 }, url: "listing/get_listing" }).then(({ data }) => {
//         //         setSallers(data.listing)
//         //     }).catch(err => console.log(err))
//         // }
//         console.log("**********************")
//         console.log("**********************")
//         console.log("**********************")
//         console.log("**********************")
//         if (route.params) {
//             setSelectCity(route.params.city)
//             setSelectLoc(route.params.location)
//             setSelectCategory(route.params.category)
//         }
//         fetchOnScoll(filterItem)
//     }, [])

//     const modalHandler = (type) => {
//         setModalVisible(true)
//         setSearchType(type)
//     }

//     let allowFetchData = true
//     const fetchOnScoll = async (filtersData, scrolled, _sallers) => {
//         if (filtersData) {
//             setSelectLoc(filtersData.location)
//             setSelectCategory(filtersData.category)
//             let obj = {
//                 city: filtersData.city,
//                 location: filtersData.location,
//                 category: filtersData.category,
//                 skip: sallers ? sallers.length : 0
//             }
//             if (allowFetchData) {
//                 console.log(filtersData, "- --",allowFetchData)
//                 allowFetchData = false
//                 await request.post({ body: obj, url: "search", })
//                 .then(({ data }) => {
//                     allowFetchData = true
//                     console.log(data.listing)
//                     if (data.listing !== null) {
//                         if (scrolled) {
//                             let a = sallers.concat(data.listing)
//                             setSallers(a)
//                         } else {
//                             setSallers(data.listing)
//                         }
//                     }
//                     else {
//                         setSallers([])
//                     }
//                 }).catch(err => console.log(err, "-"))
//             }

//         }

//         else {
//             if (allowFetchData) {
//                 alert("")
//                 allowFetchData = false
//                 await request.post({ body: { skip: sallers ? sallers.length : 0 }, url: "listing/get_listing" })
//                     .then(({ data }) => {
//                         allowFetchData = true
//                         console.log(scrolled, data)
//                         if (data.listing) {
//                             if (scrolled) {
//                                 let a = sallers.concat(data.listing)
//                                 setSallers(a)
//                             } else {
//                                 setSallers(data.listing)
//                             }
//                         }
//                     }).catch(err => console.log(err))
//             }
//         }
//     }

//     const searchSeller = () => {
//         const obj = { city: selectCity.label || selectCity, location: selectLoc, category: selectCategory }
//         setFilterItem(obj)
//         fetchOnScoll(obj)
//     }

//     const getData = () => {

//     }

//     return (
//         <View style={{ backgroundColor: "#f2f3f2", flex: 1 }} >
//             {navigation.openDrawer == undefined ?
//                 <AppHeader onPress={() => navigation.goBack()} leftIcon={require("../../Assates/HeaderIcons/arrow.png")} openDrawer={navigation.openDrawer} />
//                 :
//                 <AppHeader onPress={() => navigation.openDrawer()}
//                     onAuth={() => navigation.navigate("Signup")}
//                     leftIcon={require("../../Assates/HeaderIcons/menu.png")} />
//             }
//             <FlatList
//                 onScroll={(e) => {
//                     var windowHeight = Dimensions.get('window').height,
//                         height = e.nativeEvent.contentSize.height,
//                         offset = e.nativeEvent.contentOffset.y;
//                     if (windowHeight + offset > height) {
//                         if (route.params) {
//                             fetchOnScoll({ location: selectLoc, category: selectCategory, city: selectCity.label || selectCity }, true, sallers)
//                         } else {
//                             fetchOnScoll(undefined, true, sallers)
//                         }

//                     }
//                 }}

//                 renderItem={() => {
//                     return (
//                         <>
//                             <View style={{ backgroundColor: "#fff", height: 40, marginVertical: 10, marginHorizontal: 5, flexDirection: "row", alignItems: "center" }} >
//                                 <TouchableOpacity onPress={() => modalHandler("loc")}
//                                     style={{
//                                         flex: 1, flexDirection: "row", alignItems: "center",
//                                         justifyContent: "space-evenly",
//                                     }} >
//                                     <Image resizeMode={"stretch"} style={{ height: 20, width: 14 }} source={require("../../Assates/HomeIcons/location2.png")} />
//                                     <Text style={{ fontSize: 13, lineHeight: 14, marginLeft: 0, fontFamily: "Poppins-Regular" }}  >{(selectLoc == "" ? "Location" : selectLoc) || selectCity}</Text>
//                                 </TouchableOpacity>
//                                 <View style={{ width: 1, height: 30, backgroundColor: "lightgray" }} />
//                                 <TouchableOpacity onPress={() => modalHandler("cat")} style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }} >
//                                     <Image resizeMode={"stretch"} style={{ height: 18, width: 20 }} source={require("../../Assates/HomeIcons/category3.png")} />
//                                     <Text style={{ fontSize: 13, lineHeight: 14, marginLeft: 0, fontFamily: "Poppins-Regular" }}  >{selectCategory == "" ? "Categoty" : selectCategory}</Text>
//                                 </TouchableOpacity>
//                                 <View style={{ width: 80 }} >
//                                     <TouchableOpacity
//                                         onPress={() => searchSeller()}
//                                         style={{ height: 40, backgroundColor: "#15B7C9", justifyContent: "center", alignItems: "center" }} >
//                                         <Text style={{ fontSize: 13, fontWeight: "bold", fontFamily: "Poppins-Regular" }}  >Search</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                             <View style={{ flex: 1, zIndex: -1 }} >
//                                 <SellerListItem location={selectLoc} sallers={sallers} navigation={navigation} />
//                             </View>
//                         </>
//                     )
//                 }} data={[1]} keyExtractor={() => 1 + 234234 * 4545 + "a"} />
//             <Modal onRequestClose={() => setModalVisible(false)} animationType={"slide"} visible={modalVisible}>
//                 {
//                     searchType == "loc" ?
//                         <CityContext.Consumer>
//                             {value => <SearchLocation getData={false} filter={true} selectCity={selectCity} selectLoc={selectLoc} setSelectLoc={setSelectLoc} setSelectCity={setSelectCity} city={value} navigation={navigation} setModalVisible={setModalVisible} />}
//                         </CityContext.Consumer>
//                         :
//                         <CategoryContext.Consumer>
//                             {value => <SearchCategory getData={false} selectCategory={selectCategory} setSelectCategory={setSelectCategory} categories={value} navigation={navigation} setModalVisible={setModalVisible} />
//                             }</CategoryContext.Consumer>}
//             </Modal>

//         </View>
//     )
// }

// import React, { useState, useEffect } from "react";
// import { View, StatusBar, Image, Text, TouchableOpacity, Modal, Dimensions, FlatList, StyleSheet, ScrollView, TextInput } from "react-native";
// import RNPickerSelect from 'react-native-picker-select';
// import { AppHeader, Piker, SellerListItem } from "../../Component/index";
// import SearchLocation from "../Search/searchLocation"
// import SearchCategory from "../Search/SearchCategory"
// import { CITY_CONTEXT, CATEGORY_CONTEXT } from "../../Store/index";
// import request from "../../Request/request"
// import SelerList from "../../Component/SellerList/SelerList";

// const CityContext = CITY_CONTEXT;
// const CategoryContext = CATEGORY_CONTEXT;

// let stopFatch = true

// export default ({ route, navigation }) => {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [searchType, setSearchType] = useState("");
//     const [selectLoc, setSelectLoc] = useState("")
//     const [selectCategory, setSelectCategory] = useState("")
//     const [selectCity, setSelectCity] = useState({})
//     const [sallers, setSallers] = useState([])
//     const [filterKey, setFilterKey] = useState("")

//     useEffect(() => {
//         if (route.params) {
//             setSelectLoc(route.params.location)
//             setSelectCategory(route.params.category)
//             request.post({ body: route.params, url: "search" }).then(({ data }) => {
//                 setSallers(data.listing)
//             }).catch(err => console.log(err))
//         } else {
//             request.get({ body: { skip: 0 }, url: "listing/get_listing" }).then(({ data }) => {
//                 setSallers(data.listing)
//             }).catch(err => console.log(err))
//         }
//     }, [])

//     const modalHandler = (type) => {
//         setModalVisible(true)
//         setSearchType(type)
//     }

//     const getData = (param, key, scrolled) => {

//         console.log(param)
//         setFilterKey(key)
//         if (param && key == "C_I") {
//             setSelectLoc(param.city ? param.city.label : param)
//             if (stopFatch) {
//                 console.log( sallers.length )
//                 stopFatch = false
//                 request.post({ body: { city: param.city ? param.city.label : param, skip: sallers.length }, url: "searchbycity" }).then(({ data }) => {
//                     console.log(data)
//                     stopFatch = true
//                     // if(data.listing){
//                     //     console.log(data.listing)
//                     //     // setSallers(selectCategory == "" ? data.listing : data.listing.filter(x => x.category == selectCategory))
//                     //     setSallers(data.listing)
//                     // } else{
//                     //     setSallers([])
//                     // }
//                     if (scrolled) {
//                         let a = sallers.concat(data.listing ? data.listing : [])
//                         setSallers(a)
//                     } else {
//                         setSallers(data.listing ? data.listing : [])
//                     }
//                 }).catch(err => console.log(err))
//             }
//         }
//         if (param && key == "C_T") {
//             setSelectCategory(param.category || param)
//             console.log(param.city)
//             if (param.city && param.city.label) {
//                 if (param.city.label && param.location && param.category) {
//                     const body = {
//                         category: param.category || param,
//                         city: param.city.label || param,
//                         location: param.location || param,
//                         skip: param.category ? sallers.length : 0
//                     }
//                     request.post({
//                         body, url: "search"
//                     }).then(({ data }) => {
//                         console.log(data)
//                         if (data.listing !== null) {
//                             if (scrolled) {
//                                 let a = sallers.concat(data.listing)
//                                 setSallers(a)
//                             } else {
//                                 setSallers(data.listing)
//                             }

//                         }
//                     }).catch(err => console.log(err))
//                 }
//             }
//             else {
//                 request.post({
//                     body: {
//                         category: param.category || param,
//                         skip: param.category ? sallers.length : 0
//                     }, url: "searchbycategory"
//                 }).then(({ data }) => {
//                     // if (data.listing) {
//                     if (scrolled) {
//                         let a = sallers.concat(data.listing)
//                         setSallers(a)
//                     } else {
//                         setSallers(data.listing && data.listing)
//                     }
//                     // }
//                 }).catch(err => console.log(err))

//             }
//         }

//         if (param && key == "L_U") {
//             console.log(selectLoc)
//             setSelectLoc(param.location ? param.location : param)
//             const body = {
//                 location: param.location ? param.location : param,
//                 city: selectCity.label,
//                 skip: sallers.length
//             }
//             request.post({ body: body, url: "searchbylocation", skip: param.location ? sallers.length : 0 }).then(({ data }) => {
//                 // setSallers(data.listing)
//                 // console.log(data)
//                 if (scrolled) {
//                     let a = sallers.concat(data.listing)
//                     setSallers(a)
//                 } else {
//                     setSallers(data.listing && data.listing)
//                 }
//             }).catch(err => console.log(err))
//         }
//     }

//     const fetchOnScoll = () => {
//         if (route.params) {
//             setSelectLoc(route.params.location)
//             setSelectCategory(route.params.category)
//             let obj = {
//                 city: route.params.city,
//                 location: route.params.location,
//                 category: route.params.category,
//                 skip: sallers.length
//             }
//             request.post({ body: obj, url: "search", }).then(({ data }) => {
//                 console.log(data.listing)
//                 if (data.listing !== null) {
//                     let a = sallers.concat(data.listing)
//                     setSallers(a)
//                 }
//             }).catch(err => console.log(err))
//         } else {
//             request.get({ body: { skip: sallers.length }, url: "listing/get_listing" }).then(({ data }) => {
//                 setSallers(data.listing)
//             }).catch(err => console.log(err))
//         }
//     }

//     return (
//         <View style={{ backgroundColor: "#f2f3f2", flex: 1 }} >
//             {navigation.openDrawer == undefined ?
//                 <AppHeader onPress={() => navigation.goBack()} leftIcon={require("../../Assates/HeaderIcons/arrow.png")} openDrawer={navigation.openDrawer} />
//                 :
//                 <AppHeader onPress={() => navigation.openDrawer()}
//                     onAuth={() => navigation.navigate("Signup")}
//                     leftIcon={require("../../Assates/HeaderIcons/menu.png")} />
//             }
//             <FlatList
//                 onScroll={(e) => {
//                     var windowHeight = Dimensions.get('window').height,
//                         height = e.nativeEvent.contentSize.height,
//                         offset = e.nativeEvent.contentOffset.y;
//                     if (windowHeight + offset > height) {
//                         if (filterKey !== "") {
//                             console.log({ location: selectLoc, category: selectCategory, city: selectCity })
//                             getData({
//                                 location: selectLoc,
//                                 category: selectCategory,
//                                 city: selectCity
//                             },
//                                 filterKey, true)
//                         } else {
//                             fetchOnScoll()
//                         }

//                     }
//                 }}
//                 renderItem={() => {
//                     return (
//                         <>
//                             <View style={{ backgroundColor: "#fff", height: 40, marginVertical: 10, marginHorizontal: 5, flexDirection: "row", alignItems: "center" }} >
//                                 <TouchableOpacity onPress={() => modalHandler("loc")}
//                                     style={{
//                                         flex: 1, flexDirection: "row", alignItems: "center",
//                                         justifyContent: "space-evenly",
//                                     }} >
//                                     <Image resizeMode={"stretch"} style={{ height: 20, width: 14 }} source={require("../../Assates/HomeIcons/location2.png")} />
//                                     <Text style={{ fontSize: 13, lineHeight: 14, marginLeft: 0, fontFamily: "Poppins-Regular" }}  >{(selectLoc == "" ? "Location" : selectLoc) || selectCity}</Text>
//                                 </TouchableOpacity>
//                                 <View style={{ width: 1, height: 30, backgroundColor: "lightgray" }} />
//                                 <TouchableOpacity onPress={() => modalHandler("cat")} style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }} >
//                                     <Image resizeMode={"stretch"} style={{ height: 18, width: 20 }} source={require("../../Assates/HomeIcons/category3.png")} />
//                                     <Text style={{ fontSize: 13, lineHeight: 14, marginLeft: 0, fontFamily: "Poppins-Regular" }}  >{selectCategory == "" ? "Categoty" : selectCategory}</Text>
//                                 </TouchableOpacity>
//                                 {/* <View style={{ width: 80 }} >
//                         <TouchableOpacity style={{ height: 40, backgroundColor: "#15B7C9", justifyContent: "center", alignItems: "center" }} >
//                             <Text style={{ fontSize: 13, fontWeight: "bold", fontFamily: "Poppins-Regular" }}  >Search</Text>
//                         </TouchableOpacity>
//                     </View> */}
//                             </View>
//                             <View style={{ flex: 1, zIndex: -1 }} >
//                                 <SellerListItem location={selectLoc} sallers={sallers} navigation={navigation} />
//                             </View>
//                         </>
//                     )
//                 }} data={[1]} keyExtractor={() => 1 + 234234 * 4545+"a"} />
//             <Modal onRequestClose={() => setModalVisible(false)} animationType={"slide"} visible={modalVisible}>
//                 {
//                     searchType == "loc" ?
//                         <CityContext.Consumer>
//                             {value => <SearchLocation getData={getData} filter={true} selectCity={selectCity} selectLoc={selectLoc} setSelectLoc={setSelectLoc} setSelectCity={setSelectCity} city={value} navigation={navigation} setModalVisible={setModalVisible} />}
//                         </CityContext.Consumer>
//                         :
//                         <CategoryContext.Consumer>
//                             {value => <SearchCategory getData={getData} selectCategory={selectCategory} setSelectCategory={setSelectCategory} categories={value} navigation={navigation} setModalVisible={setModalVisible} />
//                             }</CategoryContext.Consumer>}
//             </Modal>

//         </View>
//     )
// }
