import React, { useState } from "react";
import { View,Alert } from "react-native";
import { AirbnbRating } from "react-native-ratings";

const StarRating = (props) => {
  const [rating, setRating] = useState(props.score);
  const submit = async (e) => {
    let response = await fetch(`http://192.168.1.6:5000/api/site/rating/${props.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating:e
      }),
    });
    let responsedata = await response.json();
    if (!response.ok) {
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      throw new Error(responsedata.message);
    }
    Alert.alert("Message", "success", [{ text: "fermer" }]);
  };
  return (
    <View>
      {props.id && (
        <AirbnbRating
          count={5}
          reviews={["Terrible", "Mauvaise", "Bon", "Très bien", "Incroyable"]}
          defaultRating={rating}
          size={20}
          onFinishRating={(e) => {
            submit(e);
          }}
        />
      )}
    </View>
  );
};
export default StarRating;
