import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  RefreshControl
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import ProductItem from "../components/ProductItem";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";

const HomeScreen = () => {
  const [product, setProduct] = useState([]);
  const navigation = useNavigation();
  const [searchFilter, setSearchFilter] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      try {
        const response = await axios.get("/product");
        setProduct(response.data);
        console.log(product);
      } catch (error) {
        console.log("Error fetching", error);
      } finally {
        setRefreshing(false);
      }
    }, 2000);
  }, [product]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/product");
        setProduct(response.data);
      } catch (error) {
        console.log("Error fetching", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image
              source={require("../assets/logo.jpg")}
              style={styles.logoImage}
            />
            <Text style={styles.logoName}>Mushroom</Text>
          </View>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.searchBar}>
            <Pressable style={styles.searchContainer}>
              <AntDesign
                style={styles.searchIcon}
                name="search1"
                size={26}
                color="#5B9BD5"
              />
              <TextInput
                style={styles.searchInput}
                onChangeText={(text) => setSearchFilter(text)}
                value={searchFilter}
                placeholder="Search"
              />
            </Pressable>
          </View>

          <View style={styles.productContainer}>
            {product.length > 0 ? (
              product
                .filter(
                  (item) =>
                    item.mushroomName &&
                    item.mushroomName
                      .toLowerCase()
                      .includes(searchFilter.toLowerCase())
                )
                .map((item) => <ProductItem item={item} key={item._id} />)
            ) : (
              <Image
                source={require("../assets/networkerror.png")}
                style={styles.errorImage}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#5B9BD5",
    paddingVertical: verticalScale(10),
    paddingTop: scale(35),
  },
  logo: {
    flexDirection: "row",
  },
  logoImage: {
    width: scale(50),
    height: verticalScale(45),
    borderRadius: 30,
  },
  logoName: {
    fontSize: scale(35),
    fontFamily: "sans-serif",
    fontWeight: "900",
    marginLeft: scale(10),
    color: "#fff",
  },
  searchBar: {
    backgroundColor: "#5B9BD5",
    padding: scale(10),
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: scale(15),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scale(10),
    gap: 10,
    backgroundColor: "white",
    borderRadius: scale(8),
    height: verticalScale(40),
    flex: 1,
  },
  searchIcon: {
    marginLeft: scale(10),
  },
  searchInput: {
    width: scale(250),
    height: verticalScale(30),
  },
  productContainer: {
    marginTop: scale(10),
    marginLeft: scale(5),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  errorImage: {
    width: scale(350),
    height: verticalScale(400),
    marginTop: scale(120),
  },
});

export default HomeScreen;
