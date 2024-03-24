import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Teko_700Bold } from "@expo-google-fonts/teko";
import { updateArticle, deleteArticle } from "../database/DB";

export default function ArticleEditScreen({ route, navigation }) {
  const [description, setDescription] = useState(
    route.params.article.description
  );
  const [price, setPrice] = useState(route.params.article.price);
  const [stock, setStock] = useState(route.params.article.stock);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Teko_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleUpdateArticle = () => {
    updatedArticle = {
      id: route.params.article.id,
      description: description,
      price: price,
      stock: stock,
    };
    updatedArticle.price = parseFloat(updatedArticle.price);
    updatedArticle.stock = parseFloat(updatedArticle.stock);

    if (updatedArticle.description === "") {
      alert("The description cannot be empty!");
      return;
    }

    updateArticle(updatedArticle).then(() => {
      navigation.popToTop();
    });
  };

  const handleDeleteArticle = () => {
    Alert.alert(
      "Delete Article",
      "Are you sure you want to delete this article?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteArticle(route.params.article.id).then(() => {
              navigation.popToTop();
            });
          },
        },
      ]
    );
  };

  const handleRestartInfo = () => {
    setDescription(route.params.article.description);
    setPrice(route.params.article.price);
    setStock(route.params.article.stock);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{route.params.article.code}</Text>
        <Pressable style={styles.refreshButton} onPress={handleRestartInfo}>
          <Text style={styles.editButtonText}>RESTART INFO</Text>
        </Pressable>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={{ ...styles.details, fontFamily: "Poppins_700Bold" }}>
          Description:{" "}
        </Text>
        <TextInput
          style={{ ...styles.details, ...styles.input, width: "66.5%" }}
          placeholder="Description"
          placeholderTextColor="#666"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.row}>
        <Text style={{ ...styles.details, fontFamily: "Poppins_700Bold" }}>
          Price:{" "}
        </Text>
        <TextInput
          style={{ ...styles.details, ...styles.input, width: "84%" }}
          placeholder="Price"
          placeholderTextColor="#666"
          value={String(price)}
          onChangeText={setPrice}
        />
      </View>
      <View style={styles.row}>
        <Text style={{ ...styles.details, fontFamily: "Poppins_700Bold" }}>
          Stock:{" "}
        </Text>
        <TextInput
          style={{ ...styles.details, ...styles.input, width: "82.5%" }}
          placeholder="Stock"
          placeholderTextColor="#666"
          value={String(stock)}
          onChangeText={setStock}
        />
      </View>
      <Pressable style={styles.editButton} onPress={handleUpdateArticle}>
        <Text style={styles.editButtonText}>UPDATE ARTICLE</Text>
      </Pressable>
      <Pressable
        style={{ ...styles.editButton, backgroundColor: "#f87777" }}
        onPress={handleDeleteArticle}
      >
        <Text style={styles.editButtonText}>DELETE ARTICLE</Text>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#e4e4e4",
    borderRadius: 5,
    borderColor: "#000",
    borderWidth: 1,
    padding: 5,
  },
  refreshButton: {
    height: 50, // Adjust as needed
    width: 75, // Adjust as needed
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Adjust as needed
    marginLeft: "auto",
    padding: 5,
    backgroundColor: "hsla(337, 100%, 66%, 1)",
    borderRadius: 5,
  },
});
