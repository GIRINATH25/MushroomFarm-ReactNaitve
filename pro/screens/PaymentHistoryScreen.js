import { StyleSheet, Text, View, ScrollView ,Image} from 'react-native'
import React,{useState,useContext,useEffect} from 'react';
import { UserType } from "../UserContext";
import axios from "axios";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scale, verticalScale } from "react-native-size-matters";


const PaymentHistoryScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders,setOrders] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
    const PaymentDetails = async() =>{
      try{
        console.log(userId);
        const res = await axios.get(`/paymentHistory/${userId}`)
        const order = res.data;
        setOrders(order);
      }catch(error){
        console.log("error",error);
      }
    }
    PaymentDetails();
  },[]);

  return (
    <>
      <ScrollView>
        <View style={{ backgroundColor: "#5B9BD5", padding: scale(20),paddingTop:scale(30)  }}>
          <Text style={{ fontSize: scale(25), color: "#fff" }}>Payment History</Text>
        </View>

        {orders.length > 0 ? orders.filter((item)=>item.Delivery && "yes").map((item) => (
          <View
            style={{
              backgroundColor: "white",
              marginVertical: scale(10),
              borderBottomColor: "#F0F0F0",
              borderWidth: scale(2),
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}
            key={item._id}>
            <View
              style={{
                marginVertical: scale(10),
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <View>
                <Image
                  style={{ width: scale(130), height: scale(130),marginLeft:scale(20), resizeMode: "cover",borderRadius:scale(10) }}
                  source={{ uri: item.products.image }}
                />
              </View>

              <View>
                <Text numberOfLines={3} style={{ width: scale(150), marginTop: scale(10) }}>
                  {item.products.mushroomName}
                </Text>
                <Text
                  style={{ fontSize: scale(18), fontWeight: "bold", marginTop: scale(20) }} >
                  ₹{item.products.price}
                </Text>
                <Text
                  style={{ marginTop: scale(20) }} >
                  Date:{new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        )): <Image source={require("../assets/paymentHis.png")} style={{ width: scale(350), height: scale(400), marginTop:scale(100),resizeMode: "cover",marginLeft:scale(10) }}/>}
      </ScrollView>  
    </>
  )
}

export default PaymentHistoryScreen

const styles = StyleSheet.create({})