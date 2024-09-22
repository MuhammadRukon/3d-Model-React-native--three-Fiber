import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import ActionWrapper from "../components/EditableModel/ActionWrapper";
import CanvasWrapper from "../components/EditableModel/CanvasWrapper";
import useControls from "r3f-native-orbitcontrols";
const EditableModel = () => {
  const [floors, setFloors] = useState([0]);
  const [showRoof, setShowRoof] = useState(false);
  const [OrbitControls, events] = useControls();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modelContainer} {...events}>
        <CanvasWrapper
          floors={floors}
          showRoof={showRoof}
          OrbitControls={OrbitControls}
        />
      </View>
      <ActionWrapper
        buttonContainer={styles.buttonContainer}
        setShowRoof={setShowRoof}
        floors={floors}
        setFloors={setFloors}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3e3e3",
  },
  modelContainer: {
    flex: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 20,
  },
});

export default EditableModel;
