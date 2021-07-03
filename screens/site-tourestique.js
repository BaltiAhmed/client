import React from "react";
import { View, Text } from "react-native";

const SiteTourestique = (props) => {
  return (
    <View>
      <Text>Detail site tourestique</Text>
    </View>
  );
};

SiteTourestique.navigationOptions = (navData) => {
  return {
    headerTitle: "Detail",
  };
};

export default SiteTourestique;
