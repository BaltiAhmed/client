import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Image,
} from "react-native";
import { Card, CardItem, Body, Button } from "native-base";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Evenement = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.46:5000/api/evenement/site/${id}`
      );

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
  console.log(id);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.46:5000/api/evenement/site/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.evenement);
    };
    sendRequest();
  }, []);
  console.log(list);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {list &&
        list.map((row) => (
          <View>
            <Image
              source={{ uri: `http://192.168.1.46:5000/${row.photo}` }}
              style={styles.image}
            />
            <View style={styles.details}>
              <Text>{row.titre}</Text>
              <Text>{row.Ddebut}</Text>
              <Text>{row.Dfin}</Text>
            </View>
            <Card>
              <CardItem header>
                <Text>{row.type}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>{row.description}</Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Button rounded >
                  <Text>Envoyer une demande d'inscription</Text>
                </Button>
              </CardItem>
            </Card>
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
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
  map: {
    width: "100%",
    height: 265,
  },
});

export default Evenement;
