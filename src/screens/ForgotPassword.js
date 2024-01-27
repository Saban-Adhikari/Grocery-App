import { React, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/actions/extraAction";

function ForgotPassword() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const sendOTP = () => {
    dispatch(forgotPassword(email));
    navigation.navigate("Reset password");
    alert("if an account with this email exists, an OTP will be sent to it");
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.textFieldAndButton}>
            <TextInput
              style={styles.textInputEmail}
              placeholder="E-mail"
              onChangeText={(value) => {
                setEmail(value);
              }}
            />
            <TouchableOpacity style={styles.button}>
              <Button title="Send OTP" color="white" onPress={sendOTP} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textFieldAndButton: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    minHeight: "60%",
    marginTop: "2%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.25,
  },
  textInputEmail: {
    borderWidth: 1,
    width: "80%",
    borderRadius: 10,
    padding: "5%",
  },
  button: {
    borderWidth: 5,
    marginTop: "10%",
    backgroundColor: "black",
    borderRadius: 10,
  },
});

export default ForgotPassword;
