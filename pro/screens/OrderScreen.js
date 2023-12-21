import { StyleSheet, Text, View, ScrollView, Image,RefreshControl,Modal,Pressable,Alert } from "react-native";
import React,{useEffect,useContext,useState,useCallback} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { UserType } from "../UserContext";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";

const OrderScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders,setOrders] = useState([]);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [addresses, setAddresses] = useState([]);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
    fetchUser();
    fetchOrder();
    fetchAddresses();
      setRefreshing(false);
    }, 2000);
  });

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    setUserId(userId);
  };
  
  const fetchOrder = async() =>{
    try{
      const res = await axios.get(`/orders/${userId}`)
      const order = res.data;
      setOrders(order);
    }catch(error){
      console.log("error",error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`/addresses/${userId}`);
      const { addresses, user } = res.data;
      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(()=>{
    fetchUser();
    fetchOrder();
    fetchAddresses();
  },[userId])

  
  return (
    <>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={{backgroundColor:"#fff"}}>
        <View style={{ backgroundColor: "#5B9BD5", padding: scale(20),paddingTop:scale(30)  }}>
          <Text style={{ fontSize: scale(30), color: "#fff" }}>Orders</Text>
        </View>

        <View style={{ marginHorizontal: scale(10) }}>
        <View style={{flex:1,flexDirection:"row",padding:scale(10),justifyContent:"space-between"}}>
          <Text style={{fontSize:scale(16)}}>Scheduled Orders</Text>
        </View>
        {orders.filter((item)=>item.products.schedule !== 'unscheduled').map((item) => (
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
                  style={{ fontSize: scale(20), fontWeight: "bold", marginTop: scale(6) }} >
                  ₹{item.products.price}
                </Text>
                <Text style={{marginTop:scale(5)}}>
                  Quantity : {item.products.quantity} kg
                </Text>
                <Text style={{marginTop:scale(5)}}>
                  Schedule : {item.products.schedule}
                </Text>
                <Pressable 
                onPress={()=>{
                  console.log(item);
                  const buyPlanned = {
                    name:item.products.mushroomName,
                    image:item.products.image,
                    email:item.productEmail,
                    price:item.products.price,
                    quantity:item.products.quantity,
                    schedule:item.products.schedule,
                    date:item.products.Date,
                  }
                  navigation.navigate("payment",{item:buyPlanned});
                }}
                style={{marginTop:scale(10),backgroundColor:"#BDD7EE",paddingVertical:scale(10),alignItems:"center",borderRadius:scale(20)}}>
                  <Text>Pay</Text>
                </Pressable>
              </View>
            </View>
            <Text style={{height: scale(1),borderColor: "#D0D0D0",borderWidth: scale(1),marginTop: scale(1),}}/>
          </View>
        ))}
      </View>

        <View style={{ marginHorizontal: scale(10) }}>
        <View style={{flex:1,flexDirection:"row", padding:scale(10),justifyContent:"space-between"}}>
          <Text style={{fontSize:scale(16)}}>Unscheduled Orders</Text>
        </View>
        {orders.length > 0 ? orders.filter((item)=>item.products.schedule === 'unscheduled').map((item) => (
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
                  style={{ fontSize: scale(20), fontWeight: "bold", marginTop: scale(6) }} >
                  ₹{item.products.price}
                </Text>
                <Text style={{marginTop:scale(5)}}>
                  Quantity : {item.products.quantity} kg
                </Text>
                <Text style={{marginTop:scale(5)}}>
                  Schedule : {item.products.schedule}
                </Text>
                <Text style={{marginTop:scale(5)}}>
                  Delivery status : {item.Delivery}
                </Text>
              </View>
            </View>
            <Text style={{height: scale(1),borderColor: "#D0D0D0",borderWidth: scale(1),marginTop: scale(1),}}/>
          </View>
        )): <Image source={require("../assets/order.png")} style={{ width: scale(350), height: scale(250), marginTop:scale(150)}} />}
      </View>
      </ScrollView>
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
