// import { Suspense, useState } from "react";
// import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
// import { Canvas, RootState } from "@react-three/fiber/native";
// import { Environment, OrbitControls, useGLTF } from "@react-three/drei/native";
// import { PrimitiveProps } from "@react-three/fiber/dist/declarations/src/three-types";

// // Import the wheel model
// import wheelPath from "./assets/models/wheel.glb"; // 5.7MB

// type ModelProps = {
//   modelPath: string;
//   scale?: number;
//   onLoaded?: () => void;
// } & Omit<PrimitiveProps, "object">;

// function Model({ modelPath, scale = 1, onLoaded, ...props }: ModelProps) {
//   const gltf = useGLTF(modelPath);

//   // Call onLoaded once the model is loaded
//   if (onLoaded) onLoaded();

//   return <primitive {...props} object={gltf.scene} scale={scale} />;
// }

// export default function App() {
//   const [isLoading, setIsLoading] = useState(true);

//   const onCreated = (state: RootState) => {
//     const _gl = state.gl.getContext();
//     const pixelStorei = _gl.pixelStorei.bind(_gl);
//     _gl.pixelStorei = function (...args) {
//       const [parameter] = args;
//       switch (parameter) {
//         case _gl.UNPACK_FLIP_Y_WEBGL:
//           return pixelStorei(...args);
//       }
//     };
//   };

//   // Function to handle when the model is loaded
//   const handleModelLoaded = () => {
//     setIsLoading(false);
//   };

//   return (
//     <View style={styles.flex}>
//       {/* Show ActivityIndicator and loading text while the model is loading */}
//       {isLoading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="black" />
//           <Text style={styles.loadingText}>Loading 3D Model...</Text>
//         </View>
//       )}

//       {/* 3D Canvas for the wheel model */}
//       <Canvas onCreated={onCreated}>
//         <OrbitControls />
//         <ambientLight />
//         <Suspense fallback={null}>
//           <Model
//             modelPath={wheelPath}
//             scale={1.6}
//             onLoaded={handleModelLoaded}
//           />
//           <Environment preset={"sunset"} />
//         </Suspense>
//       </Canvas>

//       {/* Text displayed at the bottom of the wheel */}
//       {!isLoading && (
//         <View style={styles.textContainer}>
//           <Text style={styles.text}>This is a 3D model of a wheel</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   flex: {
//     flex: 1,
//   },
//   loadingContainer: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: [{ translateX: -50 }, { translateY: -50 }],
//     alignItems: "center",
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "black",
//   },
//   textContainer: {
//     position: "absolute",
//     bottom: 20,
//     width: "100%",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 18,
//     color: "white",
//   },
// });

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
import ModelDollar from "./assets/Model";
import { Environment } from "@react-three/drei";

const Model3DScreen = () => {
  const [OrbitControls, events] = useControls();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onCreated = (state: RootState) => {
    const _gl = state.gl.getContext();
    const pixelStorei = _gl.pixelStorei.bind(_gl);
    _gl.pixelStorei = function (...args) {
      const [parameter] = args;
      switch (parameter) {
        case _gl.UNPACK_FLIP_Y_WEBGL:
          return pixelStorei(...args);
      }
    };
  };

  const handleModelLoaded = () => {
    setIsLoading(false);
  };

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
          {/* <ambientLight intensity={0} /> */}
          <directionalLight
            position={[10, 10, 10]}
            intensity={1}
            color="white"
          />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="white" />
          <Suspense fallback={null}>
            <ModelDollar onLoaded={handleModelLoaded} />
            <Environment preset={"sunset"} />
          </Suspense>
        </Canvas>

        {!isLoading && (
          <View style={styles.textContainer}>
            <Text style={styles.text}>This is a 3D model of a dollar sign</Text>
          </View>
        )}
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
    left: "45%",
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
  bottomContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textContainer: {
    margin: 20,
    marginBottom: 0,
  },
  textTitle: {
    fontSize: 28,
    color: "#051E47",
    fontWeight: "bold",
  },
  textPrice: {
    fontSize: 28,
    color: "#3F6900",
    fontWeight: "bold",
  },
  text: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3F6900",
    padding: 18,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
});
