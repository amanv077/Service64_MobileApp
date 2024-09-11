import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

export default ({
  navigation,
  sallers = [],
  location = "",
  item,
  index,
  screen,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate("SellerPofile", { sallers, index })}
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        borderTopColor: "#c1c1c1",
        borderTopWidth: 0,
        marginBottom: 5,
        elevation: 1,
        alignItems: "center",
        paddingHorizontal: 7,
        paddingVertical: 7,
        borderRadius: 7,
      }}
    >
      <View
        style={{
          width: 110,
          height: 110,
          backgroundColor: "white",
          borderTopLeftRadius: 7,
          borderBottomLeftRadius: 7,
        }}
      >
        <Image
          resizeMode={"stretch"}
          style={{ flex: 1, borderRadius: 5 }}
          source={{ uri: item.seller_img }}
        />
      </View>
      <View
        style={{
          flex: 1,
          minHeight: 110,
          backgroundColor: "#fff",
          justifyContent: "space-around",
          borderTopRightRadius: 7,
          borderBottomRightRadius: 7,
        }}
      >
        <View style={{ flex: 1, paddingLeft: 7, paddingVertical: 5 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    fontFamily: "Poppins-Medium",
                    lineHeight: 20,
                  }}
                >
                  {item.fullname.length >= 20
                    ? item.fullname.slice(0, 20) + "..."
                    : item.fullname}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "Poppins-Medium",
                    marginTop: 0,
                    lineHeight: 14,
                  }}
                >
                  {item.category}
                </Text>
              </View>
              {screen === "home" ? null : location ? (
                location.location == "object" ? null : (
                  <View
                    style={{
                      flex: 1,
                      height: 20,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        lineHeight: 12,
                        fontFamily: "Poppins-Medium",
                        color: "#393e42",
                        marginRight: 5,
                      }}
                    >
                      {location ? location : ""}
                    </Text>
                    <Image
                      resizeMode={"stretch"}
                      style={{ height: 12, width: 8 }}
                      source={require("../../Assates/HomeIcons/location2.png")}
                    />
                  </View>
                )
              ) : null}
            </View>

            <View
              style={{ marginTop: 10, flex: 1, justifyContent: "flex-start" }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Poppins-Medium",
                  color: "#393e42",
                }}
              >
                {item.description.length > 100
                  ? item.description.slice(0, 100) + " ... "
                  : item.description}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// import React from "react";
// import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from "react-native"

// export default ({ navigation, sallers = [], location = "" }) => {
//     const list = ({ item, index }) => {
//         return (
//             <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("SellerPofile", { sallers, index })} style={{ backgroundColor: "#fff", flexDirection: "row", borderTopColor: "#c1c1c1", borderTopWidth: 0, marginBottom: 5, elevation: 1, alignItems: "center", paddingHorizontal: 7, paddingVertical: 7, borderRadius: 7, }} >
//                 <View style={{ width: 100, height: 100, backgroundColor: "#fff", borderTopLeftRadius: 7, borderBottomLeftRadius: 7 }} >
//                     <Image resizeMode={"stretch"} style={{ flex: 1, borderRadius: 5, }} source={{ uri: item.seller_img }} />
//                 </View>
//                 <View style={{ flex: 1, height: 100, backgroundColor: "#fff", justifyContent: "center", borderTopRightRadius: 7, borderBottomRightRadius: 7, }} >
//                     <View style={{ flex: 1, paddingLeft: 7, paddingVertical: 5 }} >
//                         <View style={{ flex: 1 }} >
//                             <View style={{ flexDirection: "row" }} >
//                                 <View style={{ flex: 1 }} >
//                                     <Text style={{ fontSize: 16, fontFamily: "Poppins-Regular", lineHeight: 16 }} >{item.fullname.length >= 10 ? item.fullname.slice(0, 10) + "..." : item.fullname}</Text>
//                                     <Text style={{ fontSize: 10, fontFamily: "Poppins-Medium" }} >{item.category}</Text>
//                                 </View>
//                                 {location ? location.location == "object" ?
//                                     // <View style={{ flex: 1, height: 20, alignItems: "center", flexDirection: "row", justifyContent: "flex-end" }} >
//                                     //     <Text style={{ fontSize: 10, lineHeight: 10, fontFamily: "Poppins-Medium", color: "#393e42", marginRight: 5 }} >{item.locations[0]}</Text>
//                                     //     <Image resizeMode={"stretch"} style={{ height: 12, width: 8, }} source={require("../../Assates/HomeIcons/location2.png")} />
//                                     // </View>
//                                     null :
//                                     <View style={{ flex: 1, height: 20, alignItems: "center", flexDirection: "row", justifyContent: "flex-end" }} >
//                                         <Text style={{ fontSize: 10, lineHeight: 10, fontFamily: "Poppins-Medium", color: "#393e42", marginRight: 5 }} >{location ? location : ""}</Text>
//                                         <Image resizeMode={"stretch"} style={{ height: 12, width: 8, }} source={require("../../Assates/HomeIcons/location2.png")} />
//                                     </View>
//                                     : null}
//                             </View>
//                             <View style={{ marginTop: 20, flex: 1, justifyContent: "flex-end" }} >
//                                 <Text style={{ fontSize: 11, fontFamily: "Poppins-Medium", color: "#393e42" }} >{item.description.length > 90 ? item.description.slice(1, 90) + " ... " : item.description}</Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         )
//     }

//     return <FlatList
//         renderItem={list}
//         keyExtractor={({ _id }) => _id + (Math.random() * 140*12)}
//         data={sallers} />
// }
