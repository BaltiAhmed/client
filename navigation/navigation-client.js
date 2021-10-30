import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import Landing from "../screens/landing";
import SiteTourestique from "../screens/site-tourestique";
import Evenement from "../screens/evenement";
import BonPlan from "../screens/bonPlan";
import Profile from "../screens/profile";
import Transports from "../screens/transports";
import Meteo from "../screens/meteo";
import Notification from "../screens/notification";
import DetailsEvenement from "../screens/detailsEvenement";
import DetailsBonPlan from "../screens/detailsBonPlan";



const LandingNav = createStackNavigator(
  {
    Landing: Landing,
    SiteTourestique:SiteTourestique,
    Evenement:Evenement,
    BonPlan:BonPlan,
    Transports:Transports,
    Meteo:Meteo
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#2286c3",
      },
      headerTintColor: "white",
    },
  }
);

const ProfileNav = createStackNavigator(
  {
    Profile: Profile,
    
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#673ab7",
      },
      headerTintColor: "white",
    },
  }
);

const NotificationNav = createStackNavigator(
  {
    Notification: Notification,
    DetailsEvenement: DetailsEvenement,
    DetailsBonPan : DetailsBonPlan
    
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#673ab7",
      },
      headerTintColor: "white",
    },
  }
);

const AppNav = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: LandingNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconAntDesign name="home" size={25} color="#fafafa" />;
        },
        tabBarColor: "#0086c3",
      },
    },
    Notifications: {
      screen: NotificationNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="notifications" size={25} color="#fafafa" />;
        },
        tabBarColor: "#673ab7",
      },
    },
    Profile: {
      screen: ProfileNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Fontisto name="person" size={25} color="#fafafa" />;
        },
        tabBarColor: "#673ab7",
      },
    },
    
  },
  {
    activeColor: "white",
    shifting: true,
  }
);

export default createAppContainer(AppNav);
