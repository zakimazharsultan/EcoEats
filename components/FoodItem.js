import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";

const FoodItem = ({
  item,
  deleteItem,
  editItem,
  dayToday
}) => {
  const expiryTimestamp = item.expiry.seconds * 1000; // Convert to milliseconds
  const addedTimestamp = item.added.seconds * 1000; // Convert to milliseconds
  const expiryDate = new Date(expiryTimestamp);
  const addedDate = new Date(addedTimestamp);
  const differenceInTime = expiryDate.getTime() - dayToday.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  // const readableExpiryDate = expiryDate.toLocaleDateString();
  const readableAddedDate = addedDate.toLocaleDateString();
  // const readableExpiryTime = expiryDate.toLocaleTimeString();
  useEffect(() => {
    if (differenceInDays < 0) {
      showMessage({
        message: `${item.name} is expired!`,
        description: `Item added on ${readableAddedDate} has expired since ${Math.ceil(Math.abs(differenceInDays))} days!`,
        type: "danger",
        // backgroundColor: "red",
      });
    }
  }, [])
  return (
    <View>
      <FlashMessage position="top" /><Pressable
        style={{
          // backgroundColor: differenceInDays < 1 ? differenceInDays < 0 ? "red" : "#FDC323" : "#f8f8f8",
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
            style={{ width: 50, height: 50, marginRight: "4%" }}
            source={{ uri: item.image }}
          />
        </View>

        <View>
          <Text
            style={{
              width: 70,
              fontSize: 15,
              fontWeight: "600",
              marginBottom: "7%",
              marginLeft: "5%",
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{ marginLeft: "5%", width: 60, color: "gray", fontSize: 15 }}
          >
            £ {item.price}
          </Text>
        </View>

        <View>
          <Text
            style={{ marginBottom: "10%", fontWeight: "500", fontSize: 14 }}
          >
            {item.quantity} {item.category}
          </Text>

          <Text
            style={{
              width: 83,
              fontSize: 10,
              fontWeight: "500",
              marginBottom: "5%",
              color: "green",
            }}
          >
            Calories: {item.calories}
          </Text>
          <Text
            style={{
              width: 100,
              // color: "gray",
              fontSize: 11,
              fontWeight: "600",
              color: "gray",
            }}
          >
            Added: {readableAddedDate}
          </Text>

          <Text
            style={{
              width: 100,
              fontSize: 11,
              fontWeight: "600",
              color: "gray",
            }}
          >
            Expires in:
            {differenceInDays < 0
              ? <Text style={{ color: 'red' }}> Expired</Text>
              : <Text style={{ color: Math.ceil(differenceInDays) > 1 ? "green" : "orange" }}> {Math.ceil(differenceInDays)} {Math.ceil(differenceInDays) > 1 ? "days" : "day"}</Text>
            }
          </Text>
        </View>

        {/* <QuantityComponent itemCategory={item.category} itemQuantity={item.quantity} addFoodItemQuantity={addFoodItemQuantity} minusFoodItemQuantity={minusFoodItemQuantity} /> */}

        <Pressable
          style={{
            flexDirection: "column",
            marginLeft: "6%",
          }}
        >
          <Pressable
            onPress={() => {
              Alert.alert(
                "Edit Food Item", // Alert title
                "Are you sure you want to edit this food item?", // Alert message
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Edit cancelled"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: async () => {
                      editItem();
                    },
                  },
                ],
                { cancelable: false } // If you tap outside the alert, it won't close
              );
            }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 13,
              borderColor: "black",
              backgroundColor: "#FDC323",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="create" size={15} color="white" />
          </Pressable>
          <Pressable
            onPress={() => {
              Alert.alert(
                "Delete Food Item", // Alert title
                "Are you sure you want to delete this food item?", // Alert message
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Deletion cancelled"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: async () => {
                      deleteItem();
                    },
                  },
                ],
                { cancelable: false } // If you tap outside the alert, it won't close
              );
            }}
            style={{
              marginTop: "10%",
              width: 30,
              height: 30,
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
