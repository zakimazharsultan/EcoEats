import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";

const FoodItem = ({ item }) => {
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

        <Pressable
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          {/* this is the '-' button */}
          <Pressable
            onPress={() => {
              item.quantity--;
              // dispatch(decrementQuantity(item)); // cart
              // dispatch(decrementQty(item)); // product
            }}
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              borderColor: "#BEBEBE",
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#088F8F",
                paddingHorizontal: 6,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              -
            </Text>
          </Pressable>

          {/* this shows the quantity */}
          {item.category === "liquid" ? (
            <Pressable>
              <Text
                style={{
                  fontSize: 19,
                  color: "#088F8F",
                  paddingHorizontal: 8,
                  fontWeight: "600",
                }}
              >
                {item.quantity}L
              </Text>
            </Pressable>
          ) : (
            <Pressable>
              <Text
                style={{
                  fontSize: 19,
                  color: "#088F8F",
                  paddingHorizontal: 8,
                  fontWeight: "600",
                }}
              >
                {item.quantity}
              </Text>
            </Pressable>
          )}

          {/* this is the '+' button */}
          <Pressable
            onPress={() => {
              item.quantity++;
              // dispatch(incrementQuantity(item)); // cart
              // dispatch(incrementQty(item)); //product
            }}
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              borderColor: "#BEBEBE",
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#088F8F",
                paddingHorizontal: 6,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              +
            </Text>
          </Pressable>
        </Pressable>

        <Pressable>
          <Pressable
            onPress={() => {
              alert("Remove it");
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
            <Text
              style={{
                fontSize: 20,
                bottom: "20%",
                color: "white",
                paddingHorizontal: 6,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              -
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({});
