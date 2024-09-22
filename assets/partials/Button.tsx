import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
interface Props {
  format: string;
  handlePress: () => void;
}
const Button = ({ format, handlePress }: Props) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          backgroundColor: "black",
          padding: 18,
          borderRadius: 6,
          width: 90,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
          {format}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
