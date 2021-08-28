import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AuthStateApp from "./utils/AuthStateApp";

import Status from "./pages/Status";

import Order from "./pages/Order";

import Base from "./pages/Base";

import Ionicons from 'react-native-vector-icons/Ionicons';


const StatusScreen = ({ navigation }) => {
  return (
    <Base>
      <Status navigation={navigation}/>
    </Base>
  );
};

const OrderScreen = ({ navigation }) => {
  return (
    <Base>
      <Order />
      {/* <Button
          title = "詳細へ"
          onPress={() => navigation.navigate('Status')}
        /> */}
    </Base>
  );
};

const Tab = createBottomTabNavigator();

const App:React.FC = () => {
  return (
    <AuthStateApp>
      <SafeAreaView style={styles.container}>
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Order') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Status') {
              iconName = 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
            <Tab.Screen name="Status" component={StatusScreen} />
            <Tab.Screen name="Order" component={OrderScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AuthStateApp>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e7e3",
  },
  contentWrapper: {
    padding: 20,
  },
});

export default App;
