import { StyleProp, View } from "react-native";
import React, { useState } from "react";
import Button from "../../partials/Button";
interface Props {
  buttonContainer: StyleProp<any>;
  setFloors: (floors: number[]) => void;
  floors: number[];
  setShowRoof: (showRoof: boolean) => void;
}
const ActionWrapper = ({
  buttonContainer,
  setShowRoof,
  floors,
  setFloors,
}: Props) => {
  const [i, setI] = useState(1);
  const addFloor = () => {
    setFloors([...floors, i]);
    setI(i + 1);
  };
  const removeFloor = () => {
    floors.length && setI(i - 1);
    floors.length && setFloors(floors.slice(0, -1));
  };
  return (
    <View style={buttonContainer}>
      <Button format="Add Story" handlePress={addFloor} />
      <Button format="remove Story" handlePress={removeFloor} />
      <Button format="Add Roof" handlePress={() => setShowRoof(true)} />
      <Button format="remove Roof" handlePress={() => setShowRoof(false)} />
    </View>
  );
};

export default ActionWrapper;
