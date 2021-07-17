import React, { useEffect, useCallback, useState, Dimensions } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import { Card, CardItem, Body } from "native-base";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const SiteTourestique = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const id = props.navigation.getParam("id");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.1.185:5000/api/site/${id}`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.site);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.1.185:5000/api/site/${id}`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.site);
    };
    sendRequest();
  }, []);
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {list && (
          <View>
            <Image
              source={{ uri: `http://192.168.1.185:5000/${list.photo}` }}
              style={styles.image}
            />
            <View style={styles.details}>
              <Text>{list.nom}</Text>
              <Text>{list.gouvernorat}</Text>
              <Text>{list.adresse}</Text>
            </View>
            <Card>
              <CardItem header>
                <Text>{list.email}</Text>
                <Text>{list.tel}</Text>
                <Text>{list.categorie}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>{list.description}</Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <View style={styles.details}>
                  <IconMaterialIcons
                    name="event"
                    size={50}
                    color="#1976d2"
                    style={{ marginLeft: 50 }}
                    onPress={() => {
                      props.navigation.navigate({
                        routeName: "Evenement",
                        params: {
                          id: list._id,
                        }
                      });
                    }}
                  />
                  <Fontisto
                    name="paper-plane"
                    size={50}
                    color="#1976d2"
                    style={{ marginLeft: 100 }}
                    onPress={() => {
                      props.navigation.navigate({
                        routeName: "BonPlan",
                        params: {
                          id: list._id,
                        }
                      });
                    }}
                  />
                </View>
              </CardItem>
            </Card>
            <MapView
              style={styles.map}
              region={{
                latitude: 36.811571199999996,
                longitude: 10.181017599999999,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: 36.811571199999996,
                  longitude: 10.181017599999999,
                }}
              />
            </MapView>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

SiteTourestique.navigationOptions = {
  headerTitle: "Detail",
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

export default SiteTourestique;
