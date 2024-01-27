import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/actions/productAction";

const Slider_Width = Dimensions.get("window").width;
const Item_Width = Slider_Width;

function ProductDetails({ route: { params } }) {
  const {
    product: {
      productName,
      productPrice,
      availableStock,
      productDescription,
      productImage,
    },
  } = useSelector((state) => state.product);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const isCarousel = useRef(null);

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    if (availableStock <= quantity) return;
    setQuantity(quantity + 1);
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = () => {
    if (availableStock === 0)
      return Toast.show({
        type: "error",
        text1: "Out of stock",
        text2: "This product is out of stock",
        visibilityTime: 4000,
      });
    dispatch({
      type: "addToCart",
      payload: {
        product: params.id,
        productName,
        productPrice,
        productImage: productImage[0].url,
        availableStock,
        quantity,
      },
    });
    Toast.show({
      type: "success",
      text1: "Added to cart!",
      text2: "This product has been added to your cart",
      visibilityTime: 4000,
    });
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, isFocused]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity style={{ width: "10%" }}>
          <Icon
            name="arrow-left"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <View style={styles.carouselContainer}>
          <Carousel
            layout="stack"
            sliderWidth={Slider_Width}
            itemWidth={Item_Width}
            ref={isCarousel}
            data={productImage}
            renderItem={CarouselCardItem}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            height: "100%",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginTop: -80,
          }}
        >
          {/* Add your product details content here */}
          <Text style={{ fontSize: 25 }} numberOfLines={2}>
            {productName}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "800" }}>
            Rs. {productPrice}
          </Text>
          <Text style={{ color: "gray", marginTop: 5 }}>
            In Stock:{"  "}
            <Text>{availableStock}</Text>
          </Text>
          <Text
            style={{
              lineHeight: 20,
              marginVertical: 15,
              letterSpacing: 1,
            }}
            numberOfLines={8}
          >
            {productDescription}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "gray" }}>Quantity</Text>
            <View
              style={{
                width: 80,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity>
                <Icon
                  name="minus"
                  size={20}
                  color="white"
                  style={{ backgroundColor: "black" }}
                  onPress={decrementQuantity}
                />
              </TouchableOpacity>
              <Text style={styles.quantityLabel}>{quantity}</Text>
              <TouchableOpacity>
                <Icon
                  name="plus"
                  size={20}
                  color="white"
                  style={{ backgroundColor: "black" }}
                  onPress={incrementQuantity}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              width: "100%",
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
              marginTop: 20,
            }}
            activeOpacity={0.8}
            onPress={addToCartHandler}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              <Icon name="shopping-cart" size={20} color="white" />
              {"      "}Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#BCD4A7",
    width: Item_Width,
    paddingVertical: 40,
    height: 380,
    flex: 1,
  },
  image: {
    width: Item_Width,
    resizeMode: "cover",
    height: 250,
  },
  carouselContainer: {
    //flex: 1,
    height: 380,
  },
  quantityLabel: {
    color: "black",
    height: 25,
    width: 25,
    textAlignVertical: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
  },
});

export default ProductDetails;
