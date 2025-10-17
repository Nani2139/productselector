import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProductCard = ({ product, reason }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.brand}>{product.brand}</Text>
      <Text style={styles.name}>{product.product_name}</Text>
      <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.reasonContainer}>
        <Text style={styles.reasonTitle}>Why recommended:</Text>
        <Text style={styles.reason}>{reason}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  brand: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2a2a2a",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 2,
    color: "#1a1a1a",
  },
  price: {
    fontSize: 16,
    color: "#388e3c",
    marginTop: 4,
    fontWeight: "bold",
  },
  description: {
    fontSize: 15,
    color: "#444",
    marginTop: 8,
  },
  reasonContainer: {
    marginTop: 12,
    backgroundColor: "#f0f4ff",
    borderRadius: 8,
    padding: 8,
  },
  reasonTitle: {
    fontWeight: "bold",
    color: "#2a4d9b",
    fontSize: 14,
  },
  reason: {
    color: "#2a2a2a",
    fontSize: 14,
    marginTop: 2,
  },
});

export default ProductCard;
