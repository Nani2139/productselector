import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PromptInput = ({ query, setQuery, onPromptSubmit, isLoading }) => {
  return (
    <View style={styles.inputBar}>
      <TextInput
        style={styles.input}
        placeholder="Describe what you need"
        placeholderTextColor="#111"
        value={query}
        onChangeText={setQuery}
        editable={!isLoading}
        multiline
        numberOfLines={2}
        returnKeyType="send"
        onSubmitEditing={() => !isLoading && onPromptSubmit()}
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={onPromptSubmit}
        disabled={isLoading || !query.trim()}
        activeOpacity={0.7}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Ionicons name="send" size={22} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    borderWidth: 1.5,
    borderRadius: 14,
    margin: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f6f8fa",
    borderRadius: 8,
    marginRight: 8,
    minHeight: 40,
    maxHeight: 80,
    color: "#111",
  },
  sendButton: {
    backgroundColor: "#2a4d9b",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#1a2a5c",
    shadowColor: "#2a4d9b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
});

export default PromptInput;
