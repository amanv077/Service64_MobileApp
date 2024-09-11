import React from "react";
import { View, Text, TextInput } from "react-native";

export default ({
  label,
  onChange,
  multiline,
  height = 180,
  value,
  keyboardType,
  secureTextEntry,
  editable,
  placeholder,
}) => {
  return label == "Phone Number" ? (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ fontFamily: "Poppins-Regular", marginBottom: 3 }}>
        {label}
      </Text>
      <TextInput
        textAlignVertical={"top"}
        value={value}
        editable={editable}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={(e) => onChange(e)}
        multiline={multiline}
        placeholder={!placeholder ? label : placeholder}
        style={{
          backgroundColor: "#e5e5e5",
          height: multiline ? height : "auto",
          borderRadius: 2,
          paddingHorizontal: 10,
          fontFamily: "Poppins-Medium",
        }}
      />
    </View>
  ) : (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ fontFamily: "Poppins-Regular", marginBottom: 3 }}>
        {label}
      </Text>
      <TextInput
        textAlignVertical={"top"}
        value={value}
        editable={editable}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={(e) => onChange(e)}
        multiline={multiline}
        placeholder={!placeholder ? label : placeholder}
        style={{
          backgroundColor: "#e5e5e5",
          height: multiline ? height : "auto",
          borderRadius: 2,
          paddingHorizontal: 10,
          fontFamily: "Poppins-Medium",
          color: "black",
        }}
      />
    </View>
  );
};
