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
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Row,
} from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Meteo = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=36.806496&lon=10.181532&appid=6440e800f3e873d83a5b935f80f8239a&units=metric&fbclid=IwAR0_m_1VegIt85Y0uDvFJNs0AZhU9copQIxTQVIW0t2B-4DW8q2weTP-uRA`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.weather);
      setMain(responseData.main);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);
  const [main, setMain] = useState([]);

  const id = props.navigation.getParam("id");
  console.log(id);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=36.806496&lon=10.181532&appid=6440e800f3e873d83a5b935f80f8239a&units=metric&fbclid=IwAR0_m_1VegIt85Y0uDvFJNs0AZhU9copQIxTQVIW0t2B-4DW8q2weTP-uRA`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.weather);
      setMain(responseData.main);
    };
    sendRequest();
  }, []);
  
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {list &&
        list.map((el) => (
          <Card>
            <CardItem header bordered>
              {main.temp > 35 ? (
                <View
                  style={{
                    flexDirection: "row",
                    padding: 5,
                    justifyContent: "space-around",
                  }}
                >
                  <FontAwesome5
                    name="temperature-high"
                    size={30}
                    color="#f57c00"
                  />
                  <Text style={{ fontSize: 20 }}>{main.temp}</Text>
                </View>
              ) : (
                <View></View>
              )}
              {main.temp <= 35 ? (
                <View
                  style={{
                    flexDirection: "row",
                    padding: 5,
                    justifyContent: "space-around",
                  }}
                >
                  <FontAwesome5
                    name="temperature-low"
                    size={30}
                    color="#2196f3"
                  />
                  <Text style={{ fontSize: 20 }}>{main.temp}</Text>
                </View>
              ) : null}
            </CardItem>
            <CardItem bordered>
              <Body>
                {el.main == "Clouds" && (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 5,
                      justifyContent: "space-around",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="weather-cloudy"
                      size={30}
                      color="#2196f3"
                    />
                    <Text style={{ fontSize: 20 }}>nuageux</Text>
                  </View>
                )}

                {el.main == "Rain" && (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 5,
                      justifyContent: "space-around",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="weather-pouring"
                      size={30}
                      color="#616161"
                    />
                    <Text style={{ fontSize: 20 }}>pluie</Text>
                  </View>
                )}

                {el.main == "Snow" && (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 5,
                      justifyContent: "space-around",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="weather-snowy"
                      size={30}
                      color="#546e7a"
                    />
                    <Text style={{ fontSize: 20 }}>neige</Text>
                  </View>
                )}
                {el.main == "Sunny" && (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 5,
                      justifyContent: "space-around",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="weather-sunny"
                      size={30}
                      color="#ffee58"
                    />
                    <Text style={{ fontSize: 20 }}>soleil</Text>
                  </View>
                )}
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text style={{ fontSize: 20 }}>{el.description}</Text>
            </CardItem>
          </Card>
        ))}
    </ScrollView>
  );
};

Meteo.navigationOptions = (navData) => {
  return {
    headerTitle: "Méteo du jour",
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

export default Meteo;
