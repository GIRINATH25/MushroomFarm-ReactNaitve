import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";

const ProductItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate("Info", { item: item });
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: item.image }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.productName}>
            {item.mushroomName}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            ₹{item.price} per {item.volume} kg
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(150),
    height: verticalScale(200),
    marginEnd: scale(20),
    backgroundColor: "#BDD7EE",
    borderRadius: scale(10),
    marginBottom: scale(10),
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    marginBottom: scale(5),
    borderRadius: scale(5),
  },
  image: {
    resizeMode: "cover",
    aspectRatio: 1,
    borderRadius: scale(10),
  },
  textContainer: {
    padding: scale(5),
    marginTop:scale(140)
  },
  productName: {
    fontWeight: "bold",
    fontSize: scale(15),
    marginTop: scale(5),
    marginLeft: scale(5),
  },
  priceContainer: {
    marginLeft: scale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceText: {
    fontSize: scale(13),
    fontWeight: "bold",
  },
});

export default ProductItem;
