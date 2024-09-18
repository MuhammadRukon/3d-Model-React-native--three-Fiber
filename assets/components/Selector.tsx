import { View, Text } from "react-native";
import React from "react";
import Button from "../partials/Button";

const Selector = (handleFormat: any) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
      <Button format="glb" handlePress={handleFormat} />
      <Button format="glb" handlePress={handleFormat} />
      <Button format="stl" handlePress={handleFormat} />
      <Button format="stl" handlePress={handleFormat} />
      {/* <Button format="STL" handlePress={() => handleFormat('STL')} /> */}
    </View>
  );
};

export default Selector;
