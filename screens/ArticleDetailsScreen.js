import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Teko_700Bold } from "@expo-google-fonts/teko";

export default function ArticleDetailsScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Teko_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.article.code}</Text>
      <View style={styles.divider} />
      <Text style={styles.details}>
        <Text style={{ fontFamily: "Poppins_700Bold" }}>ID: </Text>
        {route.params.article.id}
      </Text>
      <Text style={styles.details}>
        <Text style={{ fontFamily: "Poppins_700Bold" }}>Description: </Text>
        {route.params.article.description}
      </Text>
      <View style={styles.row}>
        <Text style={styles.details}>
          <Text style={{ fontFamily: "Poppins_700Bold" }}>Price: </Text>
          {route.params.article.price}
        </Text>
        <Text style={styles.details}>
          <Text style={{ fontFamily: "Poppins_700Bold" }}>Stock: </Text>
          {route.params.article.stock}
        </Text>
      </View>
      <Pressable
        style={styles.editButton}
        onPress={() =>
          navigation.navigate("ArticleEditScreen", {
            articleTitle: "Edit the " + route.params.article.code + " details!",
            article: route.params.article,
          })
        }
      >
        <Text style={styles.editButtonText}>Edit Article</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontFamily: "Teko_700Bold",
  },
  details: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#7c00aea6",
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  divider: {
    height: 1,
    backgroundColor: "#000",
    marginVertical: 10,
  },
});
