import useAuthStore from "@/store/auth.store";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={async () => {
          await logout();
        }}
      >
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 10,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    marginTop: 34,
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    height: 35,
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 4,
  },
});
