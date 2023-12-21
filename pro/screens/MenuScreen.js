import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";

const MenuScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ backgroundColor: "#5B9BD5", padding: scale(20),paddingTop:scale(30)  }}>
        <Text style={{ fontSize: scale(25), color: "#fff" }}>Menu</Text>
      </View>
      <ScrollView>
        <Pressable onPress={()=>navigation.navigate("complaints")} style={{flex:1,flexDirection:"row", marginTop:scale(20),padding:scale(30),justifyContent:"space-between",marginRight:scale(30)}}>
          <Text style={{fontSize:scale(16)}}>Complaints</Text>
          <MaterialIcons name="arrow-forward-ios" size={24} color="grey" />
        </Pressable>
        <Text style={{height: scale(1),borderColor:"#D0D0D0",borderWidth:scale(1),marginTop:scale(1),}}/>
        <Pressable onPress={()=>navigation.navigate("paymentHistory")} style={{flex:1,flexDirection:"row",padding:scale(30),justifyContent:"space-between",marginRight:scale(30)}}>
          <Text style={{fontSize:scale(16)}}>Payment History</Text>
          <MaterialIcons name="arrow-forward-ios" size={24} color="grey" />
        </Pressable>
        <Text style={{height: scale(1),borderColor:"#D0D0D0",borderWidth:scale(1),marginTop:scale(1),}}/>
      </ScrollView>
    </>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({});
