import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { Time } from "./Time";
import { RenderExpectedTime } from "./RenderExpectedTime";
import { useQuery } from "react-query";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";

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
  const [sortedTrains, setSortedTrains] = useState({});
  if (!result.data) {
    return null;
  }

  const stuff = result.data?.map((train) => train.direction);
  const bla = [...new Set(stuff)];

  console.log(bla);
  const trains = groupByKey(result.data, "direction", { omitKey: false });

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
        <View>
          {bla.map((direction) => (
            <View>
              <Text>{`${direction}`}</Text>

              <Text>
                {trains[direction].map((train) => train.destinationName)}
              </Text>
              <Text>
                {trains[direction].map((train) => train.timeToStation)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 100,
    justifyContent: "",
  },
  left: {
    width: 150,
    height: 50,
    fontSize: 20,
    textAlign: "center",
  },
  right: {
    width: 150,
    height: 50,
    fontSize: 20,
    textAlign: "center",
  },
  down: {
    width: 150,
    height: 50,
    fontSize: 20,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  timetable: {
    paddingLeft: 120,
    paddingTop: 10,
    marginTop: 100,
    marginBottom: 100,
  },
});

export default MyTrain;
