import React from "react";
import { Text } from "@ui-kitten/components";

export const Time = ({ train }) => {
  if (!train) {
    return null;
  }
  const utcToEpoch = Math.floor(new Date(train.expectedArrival) / 1000);
  const now = Math.floor(Date.now() / 1000);
  const etaInMinutes = (utcToEpoch - now) / 60;
  if (etaInMinutes <= 1) {
    return (
      <Text
        category="s1"
        style={{
          textAlign: "center",
        }}
      >
        due
      </Text>
    );
  }

  return (
    <Text
      category="s1"
      style={{
        textAlign: "center",
      }}
    >{`${parseInt(etaInMinutes)} min`}</Text>
  );
};
