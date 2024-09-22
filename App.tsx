import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { Suspense, useState } from "react";
import { Canvas, RootState } from "@react-three/fiber/native";
import useControls from "r3f-native-orbitcontrols";
import ModelGLB from "./assets/components/modelRender/ModelGLB";
import ModelTwoGLB from "./assets/components/modelRender/ModelTwoGLB";
import Button from "./assets/partials/Button";
import { Environment } from "@react-three/drei";
import Model from "./assets/components/modelRender/Model";
import ModelSTL from "./assets/components/modelRender/ModelSTL";
import ModelThreeSTL from "./assets/components/modelRender/modelThreeSTL";
import ModelTwoSTL from "./assets/components/modelRender/ModelTwoSTL";
import EditableModel from "./assets/ui/EditableModel";

const Model3DScreen = () => {
  const [OrbitControls, events] = useControls();
  const [isLoading, setIsLoading] = useState(true);
  const [format, setFormat] = useState("glb");

  const onCreated = (state: RootState) => {
    const _gl = state.gl.getContext();
    const pixelStorei = _gl.pixelStorei.bind(_gl);
    _gl.pixelStorei = function (...args) {
      const [parameter] = args;
      if (parameter === _gl.UNPACK_FLIP_Y_WEBGL) {
        return pixelStorei(...args);
      }
    };
  };

  const handleModelLoaded = () => {
    setIsLoading(false);
  };

  const renderModel = () => {
    switch (format) {
      case "glb":
        return <ModelGLB onLoaded={handleModelLoaded} />;
      case "glb2":
        return <ModelTwoGLB onLoaded={handleModelLoaded} />;
      case "stl":
        return <Model onLoaded={handleModelLoaded} />;
      case "stl2":
        return <ModelSTL onLoaded={handleModelLoaded} />;
      case "stl3":
        return <ModelThreeSTL onLoaded={handleModelLoaded} />;
      case "stlTwo":
        return <ModelTwoSTL onLoaded={handleModelLoaded} />;
      default:
        return null;
    }
  };
  // return <EditableModel />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modelContainer} {...events}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="black" />
            <Text style={styles.loadingText}>Loading 3D Model...</Text>
          </View>
        )}
        <Canvas onCreated={onCreated}>
          <OrbitControls enablePan={false} />
          <directionalLight
            position={[10, 10, 10]}
            intensity={1}
            color="black"
          />
          <Suspense fallback={null}>
            {renderModel()}
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
        {!isLoading && (
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              This is a 3D model of a{" "}
              {format === "glb"
                ? "Dollar Sign"
                : format === "glb2"
                ? "wheel"
                : format === "stl"
                ? "roof"
                : "nothing"}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          format="glb"
          handlePress={() => {
            setIsLoading(true);
            setFormat("glb");
          }}
        />
        <Button
          format="glb2"
          handlePress={() => {
            setIsLoading(true);
            setFormat("glb2");
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <Button
          format="stl"
          handlePress={() => {
            setIsLoading(true);
            setFormat("stl");
          }}
        />
        <Button
          format="stl"
          handlePress={() => {
            setIsLoading(true);
            setFormat("stl2");
          }}
        />
        <Button
          format="stl"
          handlePress={() => {
            setIsLoading(true);
            setFormat("stl3");
          }}
        />
        <Button
          format="stl"
          handlePress={() => {
            setIsLoading(true);
            setFormat("stlTwo");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Model3DScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3e3e3",
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "black",
  },
  modelContainer: {
    flex: 2,
  },
  textContainer: {
    margin: 20,
    marginBottom: 0,
  },
  text: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});
