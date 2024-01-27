import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "../../redux/actions/userAction";
import MenuBar from "../constants/MenuBar";

function Account() {
  //using navigation using hooks
  const navigation = useNavigation();

  //using useDispatch hook to dispatch actions
  const dispatch = useDispatch();

  const IsFocused = useIsFocused();

  //getting user details from the state
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, IsFocused, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <SafeAreaView>
          <View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Account</Text>
            </View>
            <View style={styles.accountCardContainer}>
              <View style={styles.accountCard}>
                <Text style={styles.text}>
                  <Text
                    style={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    Hi,{" "}
                  </Text>
                  {user?.fullName}
                </Text>
                <Text style={styles.text}>{user?.email}</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => {
                  navigation.navigate("Edit Profile");
                }}
              >
                <Text style={{ color: "white" }}>Edit Profile</Text>
                <Icon
                  name="edit"
                  size={20}
                  color="white"
                  style={{ position: "absolute", right: 20, top: 17 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => {
                  navigation.navigate("Change Password");
                }}
              >
                <Text style={{ color: "white" }}>Change Password</Text>
                <Icon2
                  name="lock"
                  size={20}
                  color="white"
                  style={{ position: "absolute", right: 20, top: 17 }}
                />
              </TouchableOpacity>
              {user?.role === "admin" && (
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => {
                    navigation.navigate("Admin Panel");
                  }}
                >
                  <Text style={{ color: "white" }}>Admin</Text>
                  <Icon
                    name="user"
                    size={20}
                    color="white"
                    style={{ position: "absolute", right: 20, top: 17 }}
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.buttons} onPress={handleLogout}>
                <Text style={{ color: "white" }}>Logout</Text>
                <Icon
                  name="log-out"
                  size={20}
                  color="white"
                  style={{ position: "absolute", right: 20, top: 17 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <View
        style={{
          backgroundColor: "white",
        }}
      >
        <MenuBar />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  labelContainer: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    Width: "100%",
    Height: "10%",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  accountCardContainer: {
    height: 150,
    alignItems: "center",
    //borderWidth: 1,
    justifyContent: "center",
  },
  accountCard: {
    borderWidth: 1,
    borderColor: "white",
    height: "80%",
    width: "70%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  text: {
    color: "black",
    fontStyle: "italic",
    padding: "2%",
    fontSize: 15,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    minHeight: "60%",
  },
  buttons: {
    width: "80%",
    padding: 20,
    margin: "5%",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "black",
  },
});

export default Account;
