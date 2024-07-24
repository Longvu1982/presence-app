import services from "@/api";
import welcome from "@/assets/images/welcome.png";
import Colors from "@/constants/Colors";
import { useTriggerLoading } from "@/hooks/useTriggerLoading";
import useAuthStore from "@/store/auth.store";
import { saveSecure } from "@/utils";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function App() {
  const [email, setEmail] = React.useState("a@a.com");
  const [password, setPassword] = React.useState("Khongnoira14");
  const { triggerLoading } = useTriggerLoading();
  const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();

  const onClickLogin = async () => {
    await triggerLoading(async () => {
      const { result = {} } = await services.auth.login({
        email,
        password,
      });

      console.log("result", result);

      const sessionToken = result.authentication?.sessionToken;
      if (sessionToken) {
        await saveSecure("user", JSON.stringify(result));
        setUser(result);
        router.replace("/home");
      }
    });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={welcome} style={{ marginTop: -60, width: 200, height: 200 }} />
        <View>
          <Text style={{ textAlign: "right", color: Colors.purple, fontSize: 24, fontWeight: 600, marginBottom: 50 }}>Log into your account</Text>
        </View>

        <TextInput
          style={{ ...styles.textInput, marginBottom: 10 }}
          placeholder="Input Email"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={{ ...styles.textInput, marginBottom: 2 }}
          placeholder="Input Password"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={{ alignItems: "flex-end", alignSelf: "flex-end" }}>
          <Text style={{ textAlign: "right", color: Colors.purple, fontWeight: 500, marginBottom: 50 }}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: Colors.purple, padding: 16, borderRadius: 5 }}
          onPress={onClickLogin}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>Log In</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", padding: 10, columnGap: 5 }}>
          <Text>Don't have an account?</Text>
          <Link asChild replace href="/register">
            <TouchableOpacity style={{ alignItems: "flex-end", alignSelf: "flex-end", height: 20 }}>
              <Text style={{ textAlign: "right", color: Colors.purple, fontWeight: 500, marginBottom: 50, height: 20 }}>Create a new account</Text>
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
