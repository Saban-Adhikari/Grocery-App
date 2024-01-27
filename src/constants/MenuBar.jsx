import { React } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/AntDesign";

import Icon2 from "react-native-vector-icons/Feather";



const MenuBar = () => {
  const navigation = useNavigation();
  return (  
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon
              name="home"
              size={'30%'}
              color="black"
              style={ {alignSelf: 'center'}}
            />
        <Text style={{alignSelf: 'center'}}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("Cart")}
      >
        <Icon
              name="shoppingcart"
              size={'30%'}
              color="black"
              style={ {alignSelf: 'center'}}
            />
        <Text style={{alignSelf: 'center'}}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("Orders")}
      >
        <Icon2
              name="shopping-bag"
              size={'30%'}
              color='black'
              style={ {alignSelf: 'center'}}
            />
        <Text style={{alignSelf: 'center'}}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("Account")}
      >
        <Icon2
              name="user"
              size={'30%'}
              color='black'
              style={ {alignSelf: 'center'}}
            />
        <Text style={{alignSelf: 'center'}}>Account</Text>
      </TouchableOpacity>
  
    </View>
  );
};

const styles = StyleSheet.create({
    menuContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginHorizontal: '1%',
      backgroundColor: 'white',
      margin: '5%',
    }
})

export default MenuBar;
