import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";
import QuantityComponent from "./QuantityComponent"
import { Alert } from 'react-native';

const FoodItem = ({ item, addFoodItemQuantity, minusFoodItemQuantity, deleteItem }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const addItemToCart = () => {
    dispatch(addToCart(item)); //cart
    dispatch(incrementQty(item)); //product
  };
  const expiryTimestamp = item.expiry.seconds * 1000; // Convert to milliseconds
  const expiryDate = new Date(expiryTimestamp);
  const readableExpiryDate = expiryDate.toLocaleDateString();
  const readableExpiryTime = expiryDate.toLocaleTimeString();
  return (
    <View>
      <Pressable
        style={{
          backgroundColor: "#f8f8f8",
          borderRadius: 8,
          padding: 10,
          alignItems: "center",
          justifyContent: "space-evenly",
          margin: 14,
          flexDirection: "row",
        }}
      >
        <View>
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: item.image }}
          />
        </View>

        <View>
          <Text
            style={{
              width: 83,
              fontSize: 17,
              fontWeight: "600",
              marginBottom: 7,
              marginLeft: 10,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{ marginLeft: 10, width: 60, color: "gray", fontSize: 15 }}
          >
            £ {item.price}
          </Text>
        </View>

        <View>
          <Text
            style={{
              width: 83,
              fontSize: 12,
              fontWeight: "600",
              marginBottom: 7,
            }}
          >
            Calories: {item.calories} kcal
          </Text>

          <Text style={{ width: 60, color: "gray", fontSize: 10 }}>
            Expiry Date: {readableExpiryDate}
          </Text>
        </View>

        <QuantityComponent itemCategory={item.category} itemQuantity={item.quantity} addFoodItemQuantity={addFoodItemQuantity} minusFoodItemQuantity={minusFoodItemQuantity} />

        <Pressable>
          <Pressable
            onPress={() => {
              Alert.alert(
                "Delete Food Item",               // Alert title
                "Are you sure you want to delete this food item?", // Alert message
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Deletion cancelled"),
                    style: "cancel"
                  },
                  {
                    text: "OK",
                    onPress: async () => {
                      deleteItem()
                    }
                  }
                ],
                { cancelable: false }  // If you tap outside the alert, it won't close
              );
            }}
            style={{
              width: 20,
              height: 20,
              bottom: "45%",
              borderRadius: 13,
              borderColor: "black",
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="trash-bin" size={15} color="white" />
          </Pressable>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({});
