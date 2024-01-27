import { React } from "react";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import Home from "../screens/Home";
import Cart from "../screens/Cart";
import Orders from "../screens/Orders";
import Account from "../screens/Account";

import { createStackNavigator } from "@react-navigation/stack";
import ForgotPassword from "../screens/ForgotPassword";
import EditProfile from "../screens/EditProfile";
import ResetPassword from "../screens/ResetPassword";
import ChangePassword from "../screens/ChangePassword";
import ProductDetails from "../screens/ProductDetails";
import ConfirmOrder from "../screens/ConfirmOrder";
import Payment from "../screens/Payment";
import KhaltiPayment from "../screens/khaltiPayment";
import AdminPanel from "../screens/AdminPanel/AdminPanel";
import AddCategory from "../screens/AddCategory";
import AllAdminOrders from "../screens/AdminPanel/AllAdminOrders";
import UpdateProduct from "../screens/AdminPanel/UpdateProduct";
import NewProduct from "../screens/AdminPanel/NewProduct";
import ProductPicture from "../screens/AdminPanel/ProductPicture";
import OpenCamera from "../screens/OpenCamera";

const Stack = createStackNavigator();
const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    {/* For navigating to screens related to login and signup */}
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Cart"
      component={Cart}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Orders"
      component={Orders}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Account"
      component={Account}
      options={{ headerShown: false }}
    />
    {/*  For navigating to screens related to changing passwords */}
    <Stack.Screen name="Forgot Password" component={ForgotPassword} />
    <Stack.Screen name="Reset password" component={ResetPassword} />
    <Stack.Screen
      name="Change Password"
      component={ChangePassword}
      options={{ headerShown: false }}
    />

    {/* For Navigating to Admin Panel and its screen */}
    <Stack.Screen
      name="Admin Panel"
      component={AdminPanel}
      options={{
        headerBackTitle: "Back",
      }}
    />
    <Stack.Screen
      name="Add Category"
      component={AddCategory}
      options={{
        headerBackTitle: "Back",
      }}
    />
    <Stack.Screen
      name="Manage Orders"
      component={AllAdminOrders}
      options={{
        headerBackTitle: "Back",
      }}
    />
    <Stack.Screen
      name="Update Product"
      component={UpdateProduct}
      options={{
        headerBackTitle: "Back",
      }}
    />
    <Stack.Screen
      name="Add Products"
      component={NewProduct}
      options={{
        headerBackTitle: "Back",
      }}
    />
    <Stack.Screen
      name="Product Pictures"
      component={ProductPicture}
      options={{
        headerBackTitle: "Back",
      }}
    />
    <Stack.Screen
      name="Camera"
      component={OpenCamera}
      options={{
        headerBackTitle: "Back",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "black",
        },
      }}
    />

    {/* For navigating to screens related to product details */}
    <Stack.Screen
      name="Product Details"
      component={ProductDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Confirm Order"
      component={ConfirmOrder}
      options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerBackTitle: "Back", // This is the text that will be displayed on the back button
      }}
    />

    {/* For navigating to screens related to payment */}
    <Stack.Screen
      name="Payment"
      component={Payment}
      options={{
        headerBackTitle: "Back",
      }}
    />
    <Stack.Screen
      name="Khalti"
      component={KhaltiPayment}
      options={{
        headerShown: false,
      }}
    />

    {/* For navigating to edit profile screen */}
    <Stack.Screen
      name="Edit Profile"
      component={EditProfile}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
