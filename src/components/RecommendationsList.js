import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProductCard from "./ProductCard";

const RecommendationsList = ({
  recommendations,
  isLoading,
  error,
  searched,
}) => {
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2a4d9b" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }
  if (searched && recommendations.length === 0) {
    return (
      <View style={styles.centered}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/4076/4076549.png",
          }}
          style={styles.fallbackImage}
          resizeMode="contain"
        />
        <Text style={styles.fallbackTitle}>No products found</Text>
        <Text style={styles.fallbackText}>
          Sorry, we couldn't find any products matching your request. Try
          searching for something else or browse our catalog!
        </Text>
      </View>
    );
  }
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={{ paddingBottom: 16 }}
    >
      {recommendations.map((rec, idx) => (
        <View key={idx} style={styles.bubble}>
          <ProductCard
            product={rec}
            reason={rec._reason || "Recommended based on your search."}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    paddingHorizontal: 0,
  },
  bubble: {
    backgroundColor: "#eaf0ff",
    borderRadius: 16,
    marginHorizontal: 12,
    marginVertical: 8,
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 48,
    paddingHorizontal: 24,
  },
  fallbackImage: {
    width: 90,
    height: 90,
    marginBottom: 18,
    opacity: 0.7,
  },
  fallbackTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2a4d9b",
    marginBottom: 8,
  },
  fallbackText: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
  },
  error: {
    color: "#d32f2f",
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
  },
});

export default RecommendationsList;
