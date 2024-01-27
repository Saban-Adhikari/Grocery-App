import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import Icon from "react-native-vector-icons/AntDesign";
import { isIphone6SOrSE } from "../screens/AddCategory";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

function OpenCamera({ route }) {
  const navigation = useNavigation();

  const [confirmPermission, setConfirmPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);

  console.log(route.params);

  const openImageChooser = async () => {
    const permissionStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionStatus.granted === false)
      return alert("Permission to access camera roll is required!");

    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (route.params?.newProduct)
      return navigation.navigate("Add Products", {
        image: data.assets[0].uri,
      });

    if (route.params?.updateProduct)
      return navigation.navigate("Product Pictures", {
        image: data.assets[0].uri,
      });
  };

  const takePicture = async () => {
    const data = await camera.takePictureAsync();

    if (route.params?.newProduct)
      return navigation.navigate("Add Products", {
        image: data.uri,
      });

    if (route.params?.updateProduct)
      return navigation.navigate("Product Pictures", {
        image: data.uri,
      });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setConfirmPermission(status === "granted");
    })();
  }, []);

  if (confirmPermission === null) return <View />;

  if (confirmPermission === false) {
    return (
      <View>
        <SafeAreaView>
          <Text>"Permission to access camera is required!"</Text>;
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        type={type}
        style={{
          flex: 1,
          aspectRatio: 1,
        }}
        ratio={"1:1"}
        ref={(e) => setCamera(e)}
      />
      <View
        style={{
          flexDirection: "row",
          bottom: isIphone6SOrSE ? 10 : 80,
          width: "100%",
          justifyContent: "space-evenly",
          position: "absolute",
        }}
      >
        <TouchableOpacity onPress={openImageChooser}>
          <Icon name="picture" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={takePicture}>
          <Icon name="camera" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          handler={() => {
            setType((prevType) =>
              prevType === CameraType.back ? CameraType.front : CameraType.back
            );
          }}
        >
          <Icon name="swap" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OpenCamera;
