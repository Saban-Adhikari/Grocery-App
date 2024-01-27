import React from 'react';
import { Button, SafeAreaView, ActivityIndicator } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useNavigation } from '@react-navigation/native';
import { KhatiSdk } from 'rn-all-nepal-payment';
import {useDispatch, useSelector} from 'react-redux';
import { placeOrder } from '../../redux/actions/extraAction';

const KhaltiPayment = ({route}) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.user);
    const deliverInformation = {
      location: user.phoneNumber
    }
    const paymentOption = 'Khalti'
    const {cartItems} = useSelector(state => state.cart);

    const itemDetails = cartItems.map((item) => ({
      orderName: item.productName,
      orderPrice: item.productPrice,
      orderQuantity: item.quantity,
      orderImage: item.productImage,
      productDetail: item.product,
    }));

    const  itemPrice=  route.params.route.params.itemsPrice
    const shippingPrice = route.params.route.params.shippingPrice
    const subTotal = route.params.route.params.totalPrice
    const paymentInformation = 'khalti'

    console.log(itemDetails)

    

    // const shippingPrice = ca


  const _onPaymentComplete = (data) => {
    try{
    setIsVisible(false);
    const str = data.nativeEvent.data;
    const resp = JSON.parse(str);
    // console.log({ resp })
    if (resp.event === 'CLOSED') {
      // handle closed action
    } else if (resp.event === 'SUCCESS') {
      // handle success action
      dispatch(placeOrder(itemDetails, deliverInformation, paymentOption, itemPrice, shippingPrice, subTotal, paymentInformation  )).then(async () =>{
        dispatch({ type: "clearFromCart" });
        navigation.navigate('Home');
      })      
        //show a toast message to user that payment was successful
       Toast.show({
        type: 'success',
        text1: 'Payment Success',
        text2: 'Your payment was successful',
        });
    } else if (resp.event === 'ERROR') {
        //show a toast message to user that payment was not successful/error occured
      Toast.show({
        type: 'error',
        text1: 'Payment Error',
        text2: 'Your payment was not successful',
        });
    }
  }catch(err){
    console.log(err)
  }
    return;
  };

  return (
    <SafeAreaView style={styles.container}>

      <Button title={'Click to load khalti'}
        onPress={() => setIsVisible(true)} />
      <KhatiSdk
        amount={subTotal * 100} // Number in paisa
        isVisible={isVisible} // Bool to show model
        paymentPreference={[
          // Array of services needed from Khalti
          'KHALTI',
          'EBANKING',
          'MOBILE_BANKING',
          'CONNECT_IPS',
          'SCT',
        ]}
        productName={'Grocery'} // Name of product
        productIdentity={'1234567890'} // Unique product identifier at merchant
        onPaymentComplete={_onPaymentComplete} // Callback from Khalti Web Sdk
        productUrl={'https://groceryapp-backend.onrender.com/api/v1'} // Url of product
        publicKey={'test_public_key_58efbaa188194b10a8af3ec56ab55012'} // Test or live public key which identifies the merchant
      />
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
};

export default KhaltiPayment;
