import Reactfrom from "react";
import { View, Text } from "react-native";
import { Time } from "./Time";

export const RenderExpectedTime = ({ data }) => {
  if (!data) {
    return (
      <View>
        <Text>loading ...</Text>
      </View>
    );
  }

  return (
    <View>
      {data.map((train, index) => {
        if (index < 3) {
          return <Time train={train} />;
        }
      })}
    </View>
  );
};
