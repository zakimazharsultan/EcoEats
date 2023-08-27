import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const CarousalItem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[{ flex: 1, justifyContent: "center" }, { width }]}>
      <Image
        source={item.image}
        style={[
          { flex: 0.7, justifyContent: "center" },
          { width, resizeMode: "contain" },
        ]}
      />

      <View style={{ flex: 0.3 }}>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 26,
            marginTop: "4%",
            marginBottom: 10,
            color: "black",
            textAlign: "center",
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            color: "black",
            textAlign: "center",
            fontSize: 14,
            fontWeight: "300",
            paddingHorizontal: 64,
          }}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export default CarousalItem;

const styles = StyleSheet.create({});
