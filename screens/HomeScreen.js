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
import { collection, getDocs } from "firebase/firestore";
import { Entypo } from "@expo/vector-icons";
import { db } from "../firebase";

const foodItems = [
  {
    id: 1,
    name: "Egg",
    added: 1689764776870,
    expiry: 1689764776870 + 7 * 24 * 60 * 60 * 1000, // +7 days from now
    calories: 68,
    price: 0.15,
    image: "https://cdn-icons-png.flaticon.com/128/528/528166.png",
    category: "solid",
    quantity: 0,
  },
  {
    id: 2,
    name: "Milk",
    added: 1689764776870,
    expiry: 1689764776870 + 14 * 24 * 60 * 60 * 1000, // +14 days from now
    calories: 103,
    price: 0.45,
    image: "https://cdn-icons-png.flaticon.com/128/869/869460.png",
    category: "liquid",
    quantity: 0,
  },
  {
    id: 3,
    name: "Apple",
    added: 1689764776870,
    expiry: 1689764776870 + 10 * 24 * 60 * 60 * 1000, // +10 days from now
    calories: 52,
    price: 0.25,
    image: "https://cdn-icons-png.flaticon.com/128/415/415733.png",
    category: "solid",
    quantity: 0,
  },
  {
    id: 4,
    name: "Bread",
    added: 1689764776870,
    expiry: 1689764776870 + 5 * 24 * 60 * 60 * 1000, // +5 days from now
    calories: 79,
    price: 1.0,
    image: "https://cdn-icons-png.flaticon.com/128/7093/7093198.png",
    category: "solid",
    quantity: 0,
  },
  {
    id: 5,
    name: "Cheese",
    added: 1689764776870,
    expiry: 1689764776870 + 21 * 24 * 60 * 60 * 1000, // +21 days from now
    calories: 402,
    price: 0.7,
    image: "https://cdn-icons-png.flaticon.com/128/7219/7219954.png",
    category: "solid",
    quantity: 0,
  },
  {
    id: 6,
    name: "Orange Juice",
    added: 1689764776870,
    expiry: 1689764776870 + 30 * 24 * 60 * 60 * 1000, // +30 days from now
    calories: 45,
    price: 2.0,
    image: "https://cdn-icons-png.flaticon.com/128/2447/2447617.png",
    category: "liquid",
    quantity: 0,
  },
  {
    id: 7,
    name: "Yogurt",
    added: 1689764776870,
    expiry: 1689764776870 + 30 * 24 * 60 * 60 * 1000, // +30 days from now
    calories: 59,
    price: 0.5,
    image: "https://cdn-icons-png.flaticon.com/128/4934/4934066.png",
    category: "solid",
    quantity: 0,
  },
  {
    id: 8,
    name: "Chicken Breast",
    added: 1689764776870,
    expiry: 1689764776870 + 2 * 24 * 60 * 60 * 1000, // +2 days from now
    calories: 165,
    price: 3.0,
    image: "https://cdn-icons-png.flaticon.com/128/5572/5572000.png",
    category: "solid",
    quantity: 0,
  },
  {
    id: 9,
    name: "Rice",
    added: 1689764776870,
    expiry: 1689764776870 + 365 * 24 * 60 * 60 * 1000, // +365 days from now
    calories: 130,
    price: 0.5,
    image: "https://cdn-icons-png.flaticon.com/128/9873/9873609.png",
    category: "solid",
    quantity: 0,
  },
  {
    id: 10,
    name: "Spinach",
    added: 1689764776870,
    expiry: 1689764776870 + 5 * 24 * 60 * 60 * 1000, // +5 days from now
    calories: 23,
    price: 1.0,
    image: "https://cdn-icons-png.flaticon.com/128/8945/8945305.png",
    category: "solid",
    quantity: 0,
  },
];

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [items, setItems] = useState([]);
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

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = async () => {
      //   services.map((service) => dispatch(getProducts(service)));
      const coLRef = collection(db, "types");
      const docsSnap = await getDocs(coLRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
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
          // onPress={() => navigation.navigate("PickUp")}
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
