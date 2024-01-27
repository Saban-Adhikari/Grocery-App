import { React, useState, useEffect } from "react";
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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/userAction";
import { useMessageAndError } from "../../utils/hooks";

const screenHeight = Dimensions.get("window").height;

function LoginScreen() {
  const navigation = useNavigation();
  const IsFocused = useIsFocused();

  const inputs = [{ placeholder: "E-mail" }, { placeholder: "Password" }];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loadingState = useMessageAndError(navigation, dispatch, "Home");

  const loginHandler = () => {
    dispatch(login(email, password));
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView>
        <View style={styles.parentTextTitle}>
          <Text style={styles.childTextTitle}>Login</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/welcomeIllustration.png")}
            resizeMode="center"
            style={styles.image}
          />
        </View>
        <View style={styles.textInput}>
          {inputs.map((input, index) => (
            <View key={index}>
              <Text>{input.placeholder}</Text>
              <TextInput
                //key={index}
                placeholder={input.placeholder}
                secureTextEntry={input.placeholder === "Password"}
                style={[
                  styles.input,
                  index === inputs.length - 1 ? styles.lastInput : null,
                ]}
                keyboardType={
                  input.placeholder === "E-mail" ? "email-address" : "default"
                }
                onChangeText={(value) => {
                  if (input.placeholder === "E-mail") {
                    setEmail(value);
                  } else if (input.placeholder === "Password") {
                    setPassword(value);
                  }
                }}
                value={input.placeholder === "E-mail" ? email : password}
              />
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={{ alignSelf: "flex-end", margin: "3%" }}
          onPress={() => navigation.navigate("Forgot Password")}
        >
          <Text style={{ fontSize: 15 }}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            style={styles.login}
            onPress={loginHandler}
            disabled={email == "" || password == ""}
          >
            {loadingState ? (
              <ActivityIndicator size="small" color="blue" />
            ) : (
              <Text style={styles.buttonLabel}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginTop: "2%",
          }}
        >
          <Text style={{ fontSize: 15 }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ fontSize: 15, color: "blue" }}>Signup</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  parentTextTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: "5%",
  },
  childTextTitle: {
    alignSelf: "flex-start",
    fontSize: 30,
    fontWeight: "bold",
    color: "green",
    marginLeft: "3%",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: screenHeight * 0.5,
  },
  textInput: {
    margin: 10,
    marginTop: "-2%",
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 10,
    padding: "5%",
  },
  lastInput: {
    marginBottom: 0,
  },
  loginButtonContainer: {
    alignItems: "center",
  },
  login: {
    alignSelf: "center",
    padding: "4%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "white",
    shadowColor: "#228b22",
    backgroundColor: "white",
    shadowOpacity: 1,
  },
  buttonLabel: {
    fontFamily: "Arial",
    fontWeight: "bold",
    color: "green",
  },
});
export default LoginScreen;
