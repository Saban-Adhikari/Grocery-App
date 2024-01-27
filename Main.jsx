import { React, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from './src/navigation/AuthNavigator'
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userAction";
import Toast from "react-native-toast-message";

 const Main = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <NavigationContainer>
      <AuthNavigator/>
      <Toast position="top"/>
    </NavigationContainer>
  );
}

export default Main;