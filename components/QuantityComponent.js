import {
  Text,
  View,
  Pressable,
} from "react-native";

const QuantityComponent = ({ itemQuantity, itemCategory, addFoodItemQuantity, minusFoodItemQuantity }) => {


  return (
    <View >
      <Pressable
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}

      >
        {/* this is the '-' button */}
        <Pressable
          onPress={minusFoodItemQuantity}

          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            borderColor: "#BEBEBE",
            backgroundColor: itemQuantity > 1 ? "#E0E0E0" : "white",
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
            {itemQuantity > 1 ? "-" : ""}
          </Text>
        </Pressable>

        {/* this shows the quantity */}

        <Pressable>
          <Text
            style={{
              fontSize: 19,
              color: "#088F8F",
              paddingHorizontal: 8,
              fontWeight: "600",
            }}
          >
            {itemQuantity}{itemCategory}
          </Text>
        </Pressable>


        {/* this is the '+' button */}
        <Pressable
          onPress={addFoodItemQuantity}
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
    </View>
  )
};

export default QuantityComponent;
