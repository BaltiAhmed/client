import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import Landing from "../screens/landing";
import SiteTourestique from "../screens/site-tourestique";
import Evenement from "../screens/evenement";
import BonPlan from "../screens/bonPlan";
import Profile from "../screens/profile";



const LandingNav = createStackNavigator(
  {
    Landing: Landing,
    SiteTourestique:SiteTourestique,
    Evenement:Evenement,
    BonPlan:BonPlan
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
    Profile: {
      screen: ProfileNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconAntDesign name="profile" size={25} color="#fafafa" />;
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
