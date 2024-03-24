import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllArticlesScreen from "./screens/AllArticlesScreen";
import ArticleDetailsScreen from "./screens/ArticleDetailsScreen";
import AddArticleScreen from "./screens/AddArticleScreen";
import ArticleEditScreen from "./screens/ArticleEditScreen";
import { init } from "./database/DB";

const Stack = createNativeStackNavigator();

export default function App() {
  init();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#613e6a" },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "#c2c2c2" },
          }}
        >
          <Stack.Screen
            name="AllArticlesScreen"
            component={AllArticlesScreen}
            options={{ title: "Watch all the articles!" }}
          />
          <Stack.Screen
            name="ArticleDetailsScreen"
            component={ArticleDetailsScreen}
            options={({ route }) => ({
              title: route.params?.articleTitle || "Watch the article details!",
            })}
          />
          <Stack.Screen
            name="AddArticleScreen"
            component={AddArticleScreen}
            options={{ title: "Add a new article!" }}
          />
          <Stack.Screen
            name="ArticleEditScreen"
            component={ArticleEditScreen}
            options={({ route }) => ({
              title: route.params?.articleTitle || "Edit the article details!",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
