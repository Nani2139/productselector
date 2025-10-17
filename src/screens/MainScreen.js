import React, { useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PromptInput from "../components/PromptInput";
import RecommendationsList from "../components/RecommendationsList";

const MainScreen = ({
  catalog,
  query,
  setQuery,
  recommendations,
  setRecommendations,
  isLoading,
  setIsLoading,
  error,
  setError,
  searched,
  setSearched,
  onPromptSubmit,
}) => {
  const scrollViewRef = useRef();

  useEffect(() => {
    if (recommendations.length > 0 && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [recommendations]);

  // Find out why no results were found
  let debugReason = null;
  if (searched && recommendations.length === 0 && query.trim()) {
    const q = query.trim().toLowerCase();
    const nameMatches = catalog.filter((p) =>
      p.product_name.toLowerCase().includes(q)
    );
    const descMatches = catalog.filter((p) =>
      p.description.toLowerCase().includes(q)
    );
    const catMatches = catalog.filter((p) =>
      p.category.toLowerCase().includes(q)
    );
    if (
      nameMatches.length === 0 &&
      descMatches.length === 0 &&
      catMatches.length === 0
    ) {
      debugReason = `No products in the catalog matched your search: "${query}". Try using different keywords or check the catalog for available products.`;
    } else {
      debugReason = `Some products partially matched, but none fully matched your search: "${query}".`;
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.headerBox}>
          <Text style={styles.heading}>AI Product Advisor</Text>
        </View>
        <View style={styles.chatArea}>
          <RecommendationsList
            recommendations={recommendations}
            isLoading={isLoading}
            error={error}
            searched={searched}
          />
          {searched && recommendations.length === 0 && debugReason && (
            <View style={styles.debugBox}>
              <Text style={styles.debugText}>{debugReason}</Text>
            </View>
          )}
        </View>
        <PromptInput
          query={query}
          setQuery={setQuery}
          onPromptSubmit={onPromptSubmit}
          isLoading={isLoading}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f6f8fa",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  headerBox: {
    alignItems: "center",
    paddingTop: 18,
    paddingBottom: 8,
    backgroundColor: "#f6f8fa",
    borderBottomWidth: 2,
    borderColor: "#2a4d9b",
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 12,
    shadowColor: "#2a4d9b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2a4d9b",
    letterSpacing: 1,
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 12,
  },
  debugBox: {
    marginTop: 8,
    marginHorizontal: 24,
    backgroundColor: "#fffbe6",
    borderLeftWidth: 4,
    borderLeftColor: "#ffb300",
    borderRadius: 8,
    padding: 12,
    shadowColor: "#ffb300",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  debugText: {
    color: "#b26a00",
    fontSize: 14,
    fontStyle: "italic",
  },
});

export default MainScreen;
