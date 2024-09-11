import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export const DateTimePickerInput = ({ label = "MM/DD/YYYY", valueRef }) => {
  const [date, setDate] = useState(null);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    valueRef.current = currentDate;
  };
  function convertDate(date) {
    if (date instanceof Date) {
      function pad(s) {
        return s < 10 ? "0" + s : s;
      }
      return [
        pad(date.getDate()),
        pad(date.getMonth() + 1),
        date.getFullYear(),
      ].join("/");
    }
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ fontFamily: "Poppins-Regular", marginBottom: 3 }}>
        {label}
      </Text>

      <View>
        <TouchableOpacity
          onPress={showDatepicker}
          style={{
            flex: 1,
            backgroundColor: "#e5e5e5",
            justifyContent: "center",
            alignItems: "center",
            alignItems: "flex-start",
            textAlign: "left",
            padding: 5,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontFamily: !!date ? "Poppins-Regular" : "Poppins-Medium",
              marginBottom: 3,
              textAlign: "left",
              alignItems: "flex-start",
              color: !!date ? "black" : "#b4b4b4",
            }}
          >
            {!!date ? convertDate(date) : "DD/MM/YYYY"}
          </Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={!!date ? date : new Date()}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DateTimePickerInput;
