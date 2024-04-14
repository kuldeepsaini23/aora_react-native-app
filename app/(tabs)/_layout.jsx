import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";

const TabsIconsInfo = [
  {
    id: 1,
    icon: icons.home,
    title: "Home",
    name:"home"
  },
  {
    id: 2,
    icon: icons.bookmark,
    title: "Bookmark",
    name: "bookmark",
  },
  {
    id: 3,
    icon: icons.plus,
    title: "Create",
    name: "create",
  },
  {
    id: 4,
    icon: icons.profile,
    title: "Profile",
    name: "profile",
  },

];

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor:"#CDCDE0",
          tabBarStyle:{
            backgroundColor:"#161622",
            borderTopWidth:1,
            borderTopColor:"#232533",
            height:84
          }
        }}
      >
        {TabsIconsInfo.map((tab) => (
          <Tabs.Screen
            name={tab.name}
            options={{
              title: tab.title,
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  color={color}
                  focused={focused}
                  icon={tab.icon}
                  name={tab.title}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  );
};

export default TabsLayout;
