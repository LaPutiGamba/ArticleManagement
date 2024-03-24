import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Teko_700Bold } from "@expo-google-fonts/teko";

export default function Article({ props }) {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Teko_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const navigateToArticleDetails = () => {
    navigation.navigate("ArticleDetailsScreen", {
      articleTitle: props.code,
      article: props,
    });
  };

  return (
    <Pressable onPress={() => navigateToArticleDetails()}>
      <View
        style={[
          props.stock > 0
            ? {
                ...styles.articleContainer,
                backgroundColor: "#f8f8f8",
                borderColor: "#c2c2c2",
              }
            : {
                ...styles.articleContainer,
                backgroundColor: "#ffc7c7",
                borderColor: "#caa0a0",
              },
        ]}
      >
        <Text style={styles.articleCode}>{props.code}</Text>
        <Text style={styles.articleDescription}>
          <Text style={{ fontFamily: "Poppins_700Bold" }}>Description: </Text>
          {props.description}
        </Text>
        <Text style={styles.articleStock}>
          <Text style={{ fontFamily: "Poppins_700Bold" }}>Stock: </Text>
          {props.stock}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  articleContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  articleCode: {
    fontFamily: "Teko_700Bold",
    fontSize: 28,
    fontWeight: "bold",
  },
  articleDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  articleStock: {
    fontFamily: "Poppins_400Regular",
    marginTop: 5,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  loadingText: {
    fontSize: 20,
    color: "#333",
  },
});
