import { React, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../redux/actions/extraAction";
import { useMessageAndErrorExtra } from "../../utils/hooks";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loadingState = useMessageAndErrorExtra("Account");

  const submitHandler = () => {
    dispatch(updatePassword(oldPassword, newPassword));
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: "10%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon
              name="arrowleft"
              size={30}
              color="green"
              style={{ margin: "5%" }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold", margin: "5%" }}>
            Change Password
          </Text>
        </View>
        <View style={styles.buttonAndFieldContainer}>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Current Password"
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(value) => {
                setOldPassword(value);
              }}
            />
            <TextInput
              placeholder="New Password"
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(value) => {
                setNewPassword(value);
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              margin: "5%",
              padding: "5%",
              borderRadius: 10,
              alignItems: "center",
            }}
            disabled={oldPassword === "" || newPassword === ""}
            onPress={submitHandler}
          >
            {loadingState ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: "white", fontSize: 20 }}>Change</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  buttonAndFieldContainer: {
    minHeight: "70%",
    justifyContent: "center",
  },
  textInput: {
    margin: "5%",
    alignItems: "center",
    borderWidth: 1,
    minHeight: "50%",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    padding: "5%",
    margin: "5%",
    borderRadius: 10,
    width: "90%",
    backgroundColor: "white",
  },
});

export default ChangePassword;
