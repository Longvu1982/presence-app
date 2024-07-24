import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import welcome from "@/assets/images/welcome.png";
import React from "react";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import useAuthStore from "@/store/auth.store";

const Page = () => {
  const sessionToken = useAuthStore((state) => state.user.authentication?.sessionToken);

  console.log(sessionToken);

  return (
    <View style={styles.container}>
      <Image source={welcome} style={{ marginTop: -60, width: 400, height: 400 }} />
      <Text style={styles.welcomeText}>Welcome to Presence</Text>
      <Text style={styles.dsc}>Check your presence status from anywhere.</Text>
      <Link asChild href={sessionToken ? "home" : "/login"}>
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: Colors.purple, fontSize: 20, fontWeight: 700, marginRight: 10 }}>Continue to the App</Text>
          <Ionicons name="arrow-forward" size={20} color={Colors.purple} style={{ marginTop: 2 }} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dsc: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 50,
  },
});

export default Page;
