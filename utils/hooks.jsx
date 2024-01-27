import {useSelector, useDispatch} from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from "axios";
import { backendServer } from "../redux/store";
import {getAdminProducts} from "../redux/actions/productAction"


export const useMessageAndError = (navigation, dispatch, navigateTo="Login") => {

    const { loadingState, message, error, isAuthenticated } = useSelector(
        (state) => state.user
      );

      useEffect(() => {
        if(isAuthenticated){
          navigation.navigate("Home");
        }else{
          navigation.navigate("Login");
        }
        if (error) {
         Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error,
            });
    
          dispatch({
            type: "clearError",
          });
        }
        if (message) {
          // navigation.reset({
          //   index: 0,
          //   routes: [{ name: navigateTo }],
          // }),
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: message,
            });
    
          dispatch({
            type: "clearMessaage",
          });
        }
      }, [error, message, dispatch]);

      return loadingState;

}
export const useMessageAndErrorExtra = (navigateTo, func) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
 const { loadingState, message, error } = useSelector(
     (state) => state.extra
   );

   useEffect(() => {
     if (error) {
       Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error,
          });
 
       dispatch({
         type: "clearError",
       });
     }

     if (message) {
      navigation.reset({
        index: 0,
        routes: [{ name: navigateTo }],
      })
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: message,
        });

       dispatch({
         type: "clearMessaage",
       });
       navigateTo && navigation.navigate(navigateTo);
       func && dispatch(func());
     }
   }, [error, message, dispatch]);

   return loadingState;

}


export const useSetCategories = (setCategories, isFocused) => {

  useEffect(()=>{
  axios.get( `${backendServer}/product/categories`).then((res)=>{
    setCategories(res.data.categories);
  }).catch((e)=>{
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: e.response.data.message,
      });

  })
  }, [isFocused])
}

export const useGetOrders = ( isFocused, isAdmin=false) =>{

  const [orders, setOrders] = useState([])
  const [loadingState, setLoadingState] = useState(false)


  useEffect(()=>{
    setLoadingState(true)
    axios.get(`${backendServer}/order/${isAdmin?"admin":"my"}`).then((res)=>{
      setOrders(res.data.orders);
      setLoadingState(false);
    }).catch((e)=>{
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e.response.data.message,
        });
    })
  }, [isFocused])

  return {loadingState, orders}
}

export const useAdminProducts = (dispatch, isFocused)=>{
  const {products, availableStock, notInStock, error, loadingState } = useSelector(state=>state.product)
  useEffect(()=>{
    if (error) {
      Toast.show({
         type: 'error',
         text1: 'Error',
         text2: error,
         });

      dispatch({
        type: "clearError",
      });
    }
    dispatch(getAdminProducts());
  }, [dispatch, isFocused, error]);

  return {
    products, 
    availableStock,
    notInStock,
    loadingState

  }
}