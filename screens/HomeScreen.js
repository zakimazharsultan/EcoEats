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
import React, { useEffect, useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Services from "../components/Services";
import FoodItem from "../components/FoodItem";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import {
  doc,
  updateDoc,
  getDoc,
  increment,
  deleteDoc,
} from "firebase/firestore";
import { Entypo } from "@expo/vector-icons";
import { db } from "../firebase";
import { foodItems } from "../utils/foodItems";
import { getFoodItems } from "../utils/firebaseAPIcalls";
import { ActivityIndicator } from "react-native";
import { auth } from "../firebase";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const dayToday = new Date();
  const cart = useSelector((state) => state.cart.cart);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [foodItemsDB, setFoodItemsDB] = useState([]);
  const user = auth.currentUser;
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const navigation = useNavigation();

  const addFoodItemQuantity = async (id) => {
    try {
      setFoodItemsDB((prevItems) => {
        // Find the index of the item with the specified ID
        const index = prevItems.findIndex((item) => item.id === id);

        // If the item doesn't exist, just return the previous state
        if (index === -1) return prevItems;

        // Create a new array with updated quantity for the specified item
        const newItems = [...prevItems];
        newItems[index] = {
          ...newItems[index],
          quantity: newItems[index].quantity + 1,
        };
        return newItems;
      });
      const foodItemRef = doc(db, "users", user?.email, "foodItems", id);

      // You can use the `getDoc` function if you want to get the current quantity
      // or perform other operations on the document before updating.
      const foodItemSnap = await getDoc(foodItemRef);
      if (!foodItemSnap.exists()) {
        console.log("No such food item!");
        return;
      }

      // Update the quantity field by incrementing it by 1
      await updateDoc(foodItemRef, {
        quantity: increment(1),
      });

      // console.log("Food item quantity increased by 1");

      // const items = await getFoodItems();
      // setFoodItemsDB(items);
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
    // console.log("adding to: ", id)
  };

  const minusFoodItemQuantity = async (id) => {
    try {
      setFoodItemsDB((prevItems) => {
        // Find the index of the item with the specified ID
        const index = prevItems.findIndex((item) => item.id === id);

        // If the item doesn't exist, just return the previous state
        if (index === -1) return prevItems;

        // Create a new array with updated quantity for the specified item
        const newItems = [...prevItems];
        if (newItems[index].quantity > 1) {
          newItems[index] = {
            ...newItems[index],
            quantity: newItems[index].quantity - 1,
          };
        }

        return newItems;
      });
      const foodItemRef = doc(db, "users", user?.email, "foodItems", id);

      // You can use the `getDoc` function if you want to get the current quantity
      // or perform other operations on the document before updating.
      const foodItemSnap = await getDoc(foodItemRef);
      if (!foodItemSnap.exists()) {
        console.log("No such food item!");
        return;
      }

      // Update the quantity field by incrementing it by 1
      await updateDoc(foodItemRef, {
        quantity: increment(-1),
      });

      // console.log("Food item quantity increased by 1");

      // const items = await getFoodItems();
      // setFoodItemsDB(items);
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
    // console.log("adding to: ", id)
  };

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const foodItemRef = doc(db, "users", user?.email, "foodItems", id);

      await deleteDoc(foodItemRef);

      const items = await getFoodItems();
      setFoodItemsDB(items);
    } catch (error) {
      console.error("Error deleting food item: ", error);
    }
    setLoading(false);
  };

  // const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
  //   "We are loading your location"
  // );
  // const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  // useEffect(() => {
  //   checkIfLocationEnabled();
  //   getCurrentLocation();
  // }, []);
  // const checkIfLocationEnabled = async () => {
  //   let enabled = await Location.hasServicesEnabledAsync();
  //   if (!enabled) {
  //     Alert.alert(
  //       "Location Services are not enabled",
  //       "Please enable the location services",
  //       [
  //         {
  //           text: "Cancel",
  //           onPress: () => console.log("Cancel Pressed"),
  //           style: "cancel",
  //         },
  //         { text: "OK", onPress: () => console.log("OK Pressed") },
  //       ],
  //       { cancelable: false }
  //     );
  //   } else {
  //     setlocationServicesEnabled(enabled);
  //   }
  // };

  // const getCurrentLocation = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();

  //   if (status !== "granted") {
  //     Alert.alert(
  //       "Permission Denied",
  //       "Allow app to use the location servies",
  //       [
  //         {
  //           text: "Cancel",
  //           onPress: () => console.log("Cancel Pressed"),
  //           style: "cancel",
  //         },
  //         { text: "OK", onPress: () => console.log("OK Pressed") },
  //       ],
  //       { cancelable: false }
  //     );
  //   }

  //   const { coords } = await Location.getCurrentPositionAsync();
  //   // console.log(coords);
  //   if (coords) {
  //     const { latitude, longitude } = coords;

  //     let response = await Location.reverseGeocodeAsync({
  //       latitude,
  //       longitude,
  //     });

  //     //   console.log(response);
  //     for (let item of response) {
  //       let address = `${item.name} ${item.city}`;
  //       setdisplayCurrentAddress(address);
  //     }
  //   }
  // };
  useFocusEffect(
    React.useCallback(() => {
      const fetchFoodItems = async () => {
        setLoading(true);
        const items = await getFoodItems();
        setFoodItemsDB(items);
        setLoading(false);
      };

      fetchFoodItems();

      return () => {
        // If you want to run any cleanup or another function when the screen goes out of focus
      };
    }, [])
  );

  useEffect(() => {
    const fetchFoodItems = async () => {
      setLoading(true);
      const items = await getFoodItems();
      setFoodItemsDB(items);
      setLoading(false);
    };

    fetchFoodItems();
  }, [navigation]);

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
          style={{
            marginRight: 5,
            width: 34,
            height: 34,
            backgroundColor: "grey",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
          }}
        >
          <Feather name="user" size={20} color="white" />
        </Pressable>
      </SafeAreaView>
      <ScrollView style={{ backgroundColor: "#e1f5ea", flex: 1 }}>
        {/* Location and Profile */}

        {/* Services component */}
        {/* <Services /> */}

        {/* Render all the producs */}
        {/* {foodItems.map((item, index) => (
          <FoodItem item={item} key={index} />
        ))} */}

        {loading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Text style={{ marginRight: 10 }}>Loading</Text>
            <ActivityIndicator size={"large"} color={"red"} />
          </View>
        ) : (
          foodItemsDB.map((item, index) => (
            <FoodItem
              item={item}
              key={index}
              index={index}
              deleteItem={() => {
                deleteItem(item.id);
              }}
              editItem={() => { 
                navigation.navigate("AddItem", { foodItem: item });
              }}
              dayToday={dayToday}
            />
          ))
        )}

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
              width: 55,
              height: 55,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("AddItem")}
          >
            <MaterialIcons name="add" size={32} color="white" />
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
        >
          <FontAwesome name="shopping-basket" size={24} color="white" />
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
            flexDirection: "row",
          }}
          onPress={() => navigation.navigate("Meal")}
        >
          <FontAwesome5 name="robot" size={23} color="white" />
        </Pressable>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
