import React, { useState } from "react";
import { View, StatusBar, Image, Text, TouchableOpacity, Modal, Dimensions, StyleSheet, ScrollView, TextInput } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { AppHeader, Piker, SellerListItem } from "../../Component/index"
// https://stackoverflow.com/questions/47308089/react-native-how-to-open-route-from-push-notification
const { width } = Dimensions.get("window")

export default ({ navigation,setModalVisible }) => {
    return (
        <View style={{ backgroundColor: "#f2f3f2", flex: 1 }} >
   
                <View style={{ flex: 1, backgroundColor: "#fcfcfc" }} >
                    <AppHeader onPress={() => setModalVisible(false)} title={"Pick Location"} leftIcon={require("../../Assates/HeaderIcons/arrow.png")} openDrawer={navigation.openDrawer} />
                    <View style={{ height: 60, backgroundColor: "#fff", justifyContent: "center", elevation: 1, paddingHorizontal: 15 }} >
                        <View style={{ height: 40, backgroundColor: "#e7edee", borderRadius: 3, flexDirection: "row", alignItems: "center", }} >
                            <View style={{ width: 40, alignItems: "center", }} >
                                <Image resizeMode={"center"} source={require("../../Assates/HomeIcons/search.png")} />
                            </View>
                            <View style={{ flex: 1 }} >
                                <TextInput style={{ flex: 1, fontSize: 14 }} placeholderTextColor={"#7f8584"} placeholder={"Search for a location"} />
                            </View>
                        </View>
                    </View>

                    <View style={{ height: 50, backgroundColor: "#fff", borderBottomColor: "#e7edee", borderBottomWidth: 1, justifyContent: "center", paddingHorizontal: 15 }} >
                        <Text style={{fontSize: 14, color:"#2f3432"}} >Karachi</Text>
                    </View>
                    <View style={{ height: 50, backgroundColor: "#fff", borderBottomColor: "#e7edee", borderBottomWidth: 1, justifyContent: "center", paddingHorizontal: 15 }} >
                        <Text style={{fontSize: 14, color:"#2f3432"}} >Karachi</Text>
                    </View>
                    <View style={{ height: 50, backgroundColor: "#fff", borderBottomColor: "#e7edee", borderBottomWidth: 1, justifyContent: "center", paddingHorizontal: 15 }} >
                        <Text style={{fontSize: 14, color:"#2f3432"}} >Karachi</Text>
                    </View>
                    <View style={{ height: 50, backgroundColor: "#fff", borderBottomColor: "#e7edee", borderBottomWidth: 1, justifyContent: "center", paddingHorizontal: 15 }} >
                        <Text style={{fontSize: 14, color:"#2f3432"}} >Karachi</Text>
                    </View>
                    <View style={{ height: 50, backgroundColor: "#fff", borderBottomColor: "#e7edee", borderBottomWidth: 1, justifyContent: "center", paddingHorizontal: 15 }} >
                        <Text style={{fontSize: 14, color:"#2f3432"}} >Karachi</Text>
                    </View>
                    <View style={{ height: 50, backgroundColor: "#fff", borderBottomColor: "#e7edee", borderBottomWidth: 1, justifyContent: "center", paddingHorizontal: 15 }} >
                        <Text style={{fontSize: 14, color:"#2f3432"}} >Karachi</Text>
                    </View>
                    <View style={{ height: 50, backgroundColor: "#fff", borderBottomColor: "#e7edee", borderBottomWidth: 1, justifyContent: "center", paddingHorizontal: 15 }} >
                        <Text style={{fontSize: 14, color:"#2f3432"}} >Karachi</Text>
                    </View>
                </View>
        </View>
    )
}
