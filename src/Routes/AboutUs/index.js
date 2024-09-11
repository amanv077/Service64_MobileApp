import React from "react";
import { View, StatusBar, Image, Text, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { AppHeader, Piker, SellerListItem } from "../../Component/index"


export default ({ navigation }) => {
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }} >
            <AppHeader   navigation={navigation} onPress={() => navigation.goBack()} leftIcon={require("../../Assates/HeaderIcons/arrow.png")} />

            <View style={{ paddingTop: 15, flex: 1, }} >
                <ScrollView>
                    <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }} >About us</Text>
                    <View style={{ marginTop: 30, paddingHorizontal: 20 }} >
                        <Text style={{ fontSize: 13, lineHeight: 22 }} >
                            We connect local service providers with great people
                            Our goal is to get the people connected with the customers who are looking for them, especially the service providers who don't have an office or shop. Like the people who shift furniture from one place to another at the time, we move from one city to the next. They don't have any shop or anything to contact except the contact numbers in the electric pols, that is why we are trying to get them all together here.
                        </Text>

                        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 15 }} >24/7 Hours Support</Text>
                        <Text style={{ fontSize: 13, lineHeight: 22, marginTop:5 }} >
                            We support the service providers to get registered with an easy process. they can contact us any time with any issue.</Text>


                        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 15 }} >Admin Panel</Text>
                        <Text style={{ fontSize: 13, lineHeight: 22, marginTop:5 }} >
                            Service providers can delete their profile anytime if any problem appears. They also have their admin panel to manage it
                        </Text>



                        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 15 }} >Mobile friendly</Text>
                        <Text style={{ fontSize: 13, lineHeight: 22, marginTop:5 }} >
                        Our fast and smart mobile app helps to find the best match for your service and can detect your location to search for people.                        </Text>


                        <View style={{ height: 40, marginVertical: 20 }} >
                            <TouchableOpacity onPress={() => navigation.navigate("ContactUs")} style={{ height: 43, width: 160, borderRadius: 3, backgroundColor: "#15B7C9", justifyContent: "center", alignItems: "center" }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}  >Contact us</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
