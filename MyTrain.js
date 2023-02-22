import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { Time } from "./Time";
import { useQuery } from "react-query";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";

const utcToEpoch = (train) =>
  Math.floor(new Date(train.expectedArrival) / 1000);

const fetchTrains = async () => {
  const result = await fetch("http://localhost:3000/trains");
  return result.json();
};
const groupByKey = (list, key, { omitKey = false }) =>
  list.reduce(
    (hash, { [key]: value, ...rest }) => ({
      ...hash,
      [value]: (hash[value] || []).concat(
        omitKey ? { ...rest } : { [key]: value, ...rest }
      ),
    }),
    {}
  );
const cleanUpDestination = (destination) => {
  return destination.replace(/Rail Station/g, "").replace(/ *\([^)]*\) */g, "");
};

const MyTrain = () => {
  const result = useQuery({ queryKey: ["trains"], queryFn: fetchTrains });
  if (!result.data) {
    return null;
  }

  const trains = groupByKey(result.data, "direction", { omitKey: false });

  console.log(trains);
  return (
    <SafeAreaView style={styles.content}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={result.isLoading}
            onRefresh={result.refetch}
          />
        }
      >
        <MaterialCommunityIcons
          style={{ marginBottom: 170 }}
          name="timetable"
          size={75}
          color="#ff8c00"
        />
        <View style={styles.container}>
          {Object.keys(trains).map((direction) => (
            <View style={styles.left}>
              {trains[direction]
                .sort((a, b) => utcToEpoch(a) - utcToEpoch(b))
                .map((train) => (
                  <>
                    <Text>{cleanUpDestination(train.destinationName)}</Text>
                    <Time train={train} />
                  </>
                ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  left: {
    width: 150,
    height: 50,
    alignContent: "center",
    marginLeft: 20,
    marginBottom: 150,
  },

  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyTrain;
