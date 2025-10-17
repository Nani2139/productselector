import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const WelcomeScreen = ({ onGetStarted }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onGetStarted();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onGetStarted]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to AI Product Advisor</Text>
      <Text style={styles.subtitle}>Your smart shopping assistant</Text>
      <ActivityIndicator
        size="large"
        color="#2a4d9b"
        style={{ marginVertical: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8fa",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2a4d9b",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#4a4a4a",
    marginBottom: 24,
    textAlign: "center",
  },
});

export default WelcomeScreen;
