import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import MyTrain from "./MyTrain";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import sweetTheme from "./custom-theme.json";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...sweetTheme }}>
      <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
          <MyTrain />
          <StatusBar style="auto" />
        </View>
      </QueryClientProvider>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `#fffafa`,
  },
});
