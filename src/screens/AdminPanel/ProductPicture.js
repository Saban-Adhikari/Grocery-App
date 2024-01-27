import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ImageContainer from "../ImageContainer";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { isIphone6SOrSE } from "../AddCategory";
import { useDispatch } from "react-redux";
import mime from "mime";
import {
  deleteProductImage,
  updateProductImage,
} from "../../../redux/actions/extraAction";

function ProductPicture({ route }) {
  const [images] = useState(route.params.images);
  const [productID] = useState(route.params.id);
  const [image, setProductImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append("file", {
      uri: image,
      type: mime.getType(image),
      name: image.split("/").pop(),
    });
    dispatch(updateProductImage(productID, myForm));
    alert("New Image Added!");
    navigation.goBack();
  };

  const deleteHandler = (id) => {
    dispatch(deleteProductImage(productID, id));
    alert("Image Deleted");
    navigation.navigate("Admin Panel");
    console.log(productID);
  };

  useEffect(() => {
    if (route.params?.image) {
      setProductImage(route.params.image);
      setImageChanged(true);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 20,
          borderRadius: 0,
          backgroundColor: "black",
        }}
      >
        <Image
          style={{
            backgroundColor: "white",
            width: 100,
            height: 100,
            alignSelf: "center",
            resizeMode: "contain",
          }}
          source={{ uri: image }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Camera", { updateProduct: true })
            }
          >
            <Icon
              name="camerao"
              size={30}
              color="white"
              style={{
                margin: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              left: isIphone6SOrSE ? 250 : 260,
              bottom: 70,
              position: "absolute",
              borderRadius: 10,
              padding: 10,
            }}
            onPress={submitHandler}
            disabled={!imageChanged}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Add Image
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          marginTop: 50,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 40,
            minHeight: 400,
          }}
        >
          {images.map((i) => (
            <ImageContainer
              key={i._id}
              src={i.url}
              id={i._id}
              deleteHandler={deleteHandler}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ProductPicture;
