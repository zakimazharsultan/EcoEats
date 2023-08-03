import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import React, { useEffect, useState, useCallback } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Services from "../components/Services";
import FoodItem from "../components/FoodItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Entypo } from "@expo/vector-icons";
import { db } from "../firebase";
import { foodItems } from "../utils/foodItems";
import { getFoodItems } from "../utils/firebaseAPIcalls";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [foodItemsDB, setFoodItemsDB] = useState([]);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const navigation = useNavigation();

  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "We are loading your location"
  );
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location Services are not enabled",
        "Please enable the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      setlocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Allow app to use the location servies",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords);
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      //   console.log(response);
      for (let item of response) {
        let address = `${item.name} ${item.city}`;
        setdisplayCurrentAddress(address);
      }
    }
  };
  useEffect(() => {
    const fetchFoodItems = async () => {
      setLoading(true);
      const items = await getFoodItems();
      setFoodItemsDB(items);
      setLoading(false);
    };

    fetchFoodItems();
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
          backgroundColor: "#adf7cd",
        }}
      >
        <View>
          <Image
            source={require("../assets/phool.png")}
            style={{ width: 50, height: 55, marginLeft: 5 }}
          />
        </View>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#4acdcd" }}>
          Available Food Stock
        </Text>
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={{ marginRight: 5 }}
        >
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri: "https://lh3.google.com/u/0/ogw/AGvuzYYgaacrw17YS1gPAV5d67jEPZd_QT7OCc1DqtUr=s32-c-mo",
            }}
          ></Image>
        </Pressable>
      </SafeAreaView>
      <ScrollView style={{ backgroundColor: "#e1f5ea", flex: 1 }}>
        {/* Location and Profile */}

        {/* Search Bar */}
        {/* <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#c0c0c0",
            borderRadius: 7,
          }}
        >
          <TextInput placeholder="Search for items" />
          <Feather name="search" size={24} color="#fd5c63" />
        </View> */}

        {/* Services component */}
        {/* <Services /> */}

        {/* Render all the producs */}
        {foodItems.map((item, index) => (
          <FoodItem item={item} key={index} />
        ))}

        {/* {

          loading ? <Text style={{ fontSize: 25, fontWeight: "bold", color: "#4acdcd" }}>
            Loading
          </Text> : foodItemsDB.map((item, index) =>
          (
            <FoodItem item={item} key={index} />
          )
          )
        } */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 14,
          }}
        >
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Add Items</Text>
          </View>
          <View>
            <Entypo name="arrow-long-right" size={24} color="black" />
          </View>
          <Pressable
            style={{
              backgroundColor: "#088F8F",
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("AddItem")}
          >
            <Fontisto name="shopping-basket-add" size={24} color="white" />
          </Pressable>
        </View>
      </ScrollView>

      <View
        style={{
          margin: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#0fa6a6",
            borderColor: "white",
            borderWidth: 2,
            padding: 15,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            flex: 1,
          }}
          // onPress={() => navigation.navigate("PickUp")}
        >
          <SimpleLineIcons name="basket" size={24} color="white" />
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#0fa6a6",
            borderColor: "white",
            borderWidth: 2,
            padding: 15,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            flex: 1,
          }}
          onPress={() => {
            console.log(foodItemsDB);
          }}
        >
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={24}
            color="white"
          />
        </Pressable>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
