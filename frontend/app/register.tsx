import welcome from "@/assets/images/welcome.png";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import * as React from "react";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function App() {
  const [email, setEmail] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={welcome} style={{ marginTop: -60, width: 200, height: 200 }} />
        <View>
          <Text style={{ textAlign: "right", color: Colors.purple, fontSize: 24, fontWeight: 600, marginBottom: 50 }}>Create a new account</Text>
        </View>

        <TextInput
          style={{ ...styles.textInput, marginBottom: 10 }}
          placeholder="Input Full Name"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
        />
        <TextInput
          style={{ ...styles.textInput, marginBottom: 10 }}
          placeholder="Input Email"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={{ ...styles.textInput, marginBottom: 10 }}
          placeholder="Input Phone"
          dataDetectorTypes={"phoneNumber"}
          placeholderTextColor="#ccc"
          onChangeText={(text) => setPhone(text)}
          value={phone}
        />
        <TextInput
          style={{ ...styles.textInput, marginBottom: 2 }}
          placeholder="Input Password"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <TouchableOpacity
          style={{ width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: Colors.purple, padding: 16, borderRadius: 5, marginTop: 50 }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", padding: 10, columnGap: 5 }}>
          <Text>Already had an account?</Text>
          <Link asChild replace href="/login">
            <TouchableOpacity style={{ alignItems: "flex-end", alignSelf: "flex-end", height: 20 }}>
              <Text style={{ textAlign: "right", color: Colors.purple, fontWeight: 500, marginBottom: 50, height: 20 }}>Log into your account</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
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
    height: 44,
    width: "100%",
    borderRadius: 8,
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 12,
  },
});
