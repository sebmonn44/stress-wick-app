import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import MyTrain from './MyTrain';


const queryClient = new QueryClient();


export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <View style={styles.container}>
      <MyTrain />
      <StatusBar style="auto" />
    </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
