import { React, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/actions/userAction";
import { useMessageAndError } from "../../utils/hooks";

//const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function SignupScreen(props) {
  const navigation = useNavigation();

  const inputs = [
    { placeholder: "E-mail" },
    { placeholder: "Full Name" },
    { placeholder: "Phone Number", keyboardType: "numeric" },
    { placeholder: "Password" },
  ];

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("SignupScreen mounted");
  }, []);

  const submit = async () => {
    const data = new FormData();

    data.append("email", email);
    data.append("fullName", fullName);
    data.append("phoneNumber", phoneNumber);
    data.append("password", password);

    await dispatch(signup(data));
    navigation.navigate("Login");
  };

  const disableButton =
    email === "" || fullName === "" || phoneNumber === "" || password === "";

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView>
        <View style={styles.parentTextContainer}>
          <Text style={styles.childText}>Signup</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/signup_illustration.png")}
            resizeMode="center"
            style={styles.image}
          />
        </View>
        <View style={styles.textInput}>
          {inputs.map((input, index) => (
            <TextInput
              key={index}
              placeholder={input.placeholder}
              keyboardType={input.keyboardType || "default"}
              secureTextEntry={input.placeholder === "Password"}
              style={[
                styles.input,
                index === inputs.length - 1 ? styles.lastInput : null,
              ]}
              onChangeText={(value) => {
                if (input.placeholder === "E-mail") {
                  setEmail(value);
                } else if (input.placeholder === "Password") {
                  setPassword(value);
                } else if (input.placeholder === "Full Name") {
                  setFullName(value);
                } else if (input.placeholder === "Phone Number") {
                  setPhoneNumber(value);
                }
              }}
              value={
                input.placeholder === "E-mail"
                  ? email
                  : input.placeholder === "Password"
                  ? password
                  : input.placeholder === "Full Name"
                  ? fullName
                  : phoneNumber
              }
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={submit}
          disabled={disableButton}
        >
          <Text style={styles.signupText}>Signup</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginTop: "-5%",
          }}
        >
          <Text style={{ fontFamily: "Arial", fontSize: 15 }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "blue", fontFamily: "Arial", fontSize: 15 }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  parentTextContainer: {
    padding: "5%",
  },
  childText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "green",
  },
  imageContainer: {
    flexDirection: "row",
  },
  image: {
    width: "100%",
    height: screenHeight * 0.5,
  },
  textInput: {
    margin: 10,
    marginTop: "-6%",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginVertical: 10,
    padding: "2%",
  },
  lastInput: {
    marginBottom: 0,
  },
  signupButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    height: "5%",
    alignSelf: "center",
    margin: "8%",
    padding: "2%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    shadowColor: "#228b22",
    backgroundColor: "white",
    shadowOpacity: 1,
  },
  signupText: {
    fontWeight: "bold",
    color: "green",
    fontFamily: "Arial",
  },
});
