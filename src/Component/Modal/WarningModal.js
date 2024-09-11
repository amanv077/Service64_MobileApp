import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { userAgreed } from "../../LocalStore/AuthStore";

export default function WarningModal({ set_Alert_Visibility }) {
  let ok_Button = () => {
    userAgreed().then((res) => {
      if (res == 200) {
        console.log(res);
        // setShowLoader(false);
      }
    });
    set_Alert_Visibility(false);
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
      }}
    >
      <Text style={styles.Alert_Message}>
        সম্মানিত ব্যবহারকারী, service64 এ রেজিস্ট্রেশন করা সকল কর্মীগণ অনেক দক্ষ
        ও অভিজ্ঞ। কিন্তু তারা কেউই service64 এর নিজস্ব কর্মী বা চাকরিজীবী নন,
        এমতাবস্থায় যেকোনো কর্মীর সাথে কাজ করার ক্ষেত্রে অবশ্যই সতর্কতা অবলম্বন
        করুন। যেকোনো প্রকার অনাকাঙ্খিত দুর্ঘটনার জন্য service64 কর্তৃপক্ষ দায়ী
        নন।
      </Text>

      <View style={styles.Alert_Button_Row}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={ok_Button}
          activeOpacity={0.7}
        >
          <View style={styles.Alert_Button}>
            <Text style={styles.TextStyle}> Done </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Alert_Main_View: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },

  Alert_Message: {
    fontSize: 18,
    color: "#000",
    fontFamily: "Poppins-Regular",
  },

  Alert_Button_Row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width:"100%",
    marginTop: 60,
  },

  Alert_Button: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderStyle: "solid",
    borderColor: "#EEE",
    borderWidth: 2,
  },

  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
  },

  TextStyle: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    color: "#000",
  },
});
