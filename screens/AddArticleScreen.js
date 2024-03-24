import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import { insertArticle, fetchArticles } from "../database/DB";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Teko_700Bold } from "@expo-google-fonts/teko";

export default function AddArticleScreen({ route, navigation }) {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Teko_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleInsertArticle = () => {
    fetchArticles().then((articles) => {
      if (articles.some((article) => article.code === code)) {
        alert("The article " + code + " already exists!");
        return;
      } else {
        preparedArticle = {
          code: code,
          description: description,
          price: price,
          stock: stock,
        };
        preparedArticle.price = parseFloat(preparedArticle.price);
        preparedArticle.stock = parseFloat(preparedArticle.stock);

        if (preparedArticle.description === "") {
          alert("The description cannot be empty!");
          return;
        } else if (preparedArticle.stock < 0) {
          alert("The stock cannot be negative!");
          return;
        }

        insertArticle(preparedArticle).then(() => {
          navigation.goBack();
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD NEW ARTICLE</Text>
      <View style={styles.divider} />
      <TextInput
        style={styles.input}
        placeholder="Code"
        placeholderTextColor="#666"
        value={code}
        onChangeText={setCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#666"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#666"
        value={String(price)}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        placeholderTextColor="#666"
        value={String(stock)}
        onChangeText={setStock}
      />
      <Pressable style={styles.button} onPress={handleInsertArticle}>
        <Text style={styles.buttonText}>INSERT ARTICLE</Text>
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
  input: {
    width: "100%",
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    backgroundColor: "#e4e4e4",
    padding: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#7c00aea6",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#000",
    marginVertical: 10,
  },
});
