import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
import React from "react";
import { SearchBar } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Teko_700Bold } from "@expo-google-fonts/teko";
import { fetchArticles } from "../database/DB";
import Article from "../components/Article";

export default function AllArticlesScreen({ route, navigation }) {
  const [allArticles, setAllArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [search, setSearch] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      fetchArticles().then((articles) => {
        setFilteredArticles(articles);
        setAllArticles(articles);
      });
    }, [])
  );

  const updateSearch = (search) => {
    setSearch(search);
    filterArticles(search);
  };

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Teko_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  function filterArticles(filterType) {
    if (filterType != "") {
      setFilteredArticles(
        allArticles.filter((article) => {
          return article.description.includes(filterType);
        })
      );
    } else {
      setFilteredArticles(allArticles);
    }
  }

  function navigateToAddArticle() {
    navigation.navigate("AddArticleScreen");
  }

  return (
    <>
      <View style={styles.searchBarView}>
        <SearchBar
          placeholder="Search the article..."
          onChangeText={updateSearch}
          value={search}
          containerStyle={styles.searchBarCointainer}
          inputContainerStyle={styles.searchBarInput}
          onClear={() => updateSearch("")}
          placeholderTextColor="#000"
          searchIcon={{ color: "#000" }}
          clearIcon={{ color: "#000" }}
          inputStyle={{ color: "#000" }}
          showCancel={true}
        />
      </View>
      <View style={styles.centerList}>
        <FlatList
          data={filteredArticles}
          extraData={filteredArticles}
          renderItem={({ item }) => {
            return <Article props={item}></Article>;
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
          horizontal={false}
        />
      </View>
      <Pressable
        style={styles.addButton}
        onPress={() => {
          navigateToAddArticle();
        }}
      >
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  centerList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cecece"
  },
  buttonStyle: {
    fontFamily: "Teko_700Bold",
    backgroundColor: "#333333",
    width: "20%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    backgroundColor: "#333333",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
  },
  searchBarView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2.5,
    backgroundColor: "#cecece",
  },
  searchBarCointainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    width: "100%",
  },
  searchBarInput: {
    backgroundColor: "#909090",
    borderRadius: 15,
    width: "100%",
  },
});
