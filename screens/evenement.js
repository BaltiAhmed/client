import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  ScrollView,
} from "react-native";


const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Evenement = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.1.185:5000/api/evenement/site/${id}`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.evenement);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  const id = props.navigation.getParam("id");
  console.log(id)

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.1.185:5000/api/evenement/site/${id}`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.evenement);
    };
    sendRequest();
  }, []);
  console.log(list)
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {list &&
        list.map((row) => (
          <View style={styles.mealItem}>
            <TouchableOpacity
              
            >
              <View>
                <View style={{ ...styles.MealRow, ...styles.mealHeader }}>
                  <ImageBackground
                    source={{ uri: `http://192.168.1.185:5000/${row.photo}` }}
                    style={styles.bgImage}
                  >
                    <Text style={styles.title}>{props.titre}</Text>
                  </ImageBackground>
                </View>
                <View style={{ ...styles.MealRow, ...styles.mealDetail }}>
                  <Text>{row.Ddebut}</Text>
                  <Text>{row.Dfin}</Text>
                  <Text>{row.type}</Text>
                </View>
                <Text>{row.description}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      
    </ScrollView>
  );
};

Evenement.navigationOptions = (navData) => {
  return {
    headerTitle: "Evenement",
  };
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
  },
  MealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    textAlign: "center",
  },
});

export default Evenement;