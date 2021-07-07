import * as React from "react";
import { Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";
import { Audio, AVPlaybackStatus } from "expo-av";

import { View, Text } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { useMeditation } from "../../hooks/useMeditation";
import NotFoundScreen from "../NotFoundScreen";
import { HomeParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";
import { useState } from "react";

function PlayerIcon(props: {
  name: React.ComponentProps<typeof Icon>["name"];
  color?: string;
  size?: number;
  onPress: () => void;
}) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <Icon
        size={50}
        color={Colors.light.primary}
        style={{ marginBottom: -3 }}
        {...props}
      />
    </TouchableWithoutFeedback>
  );
}
type PlayRouteProp = RouteProp<HomeParamList, "PlayScreen">;
interface Props {
  route: PlayRouteProp;
}
export default function PlayScreen({ route }: Props) {
  const { id } = route.params;
  const meditation = useMeditation(id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<any>();
  const [currentTime, setCurrentTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");

  const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
    } else {
      // Update your UI for the loaded state
      if (playbackStatus.positionMillis) {
        setCurrentTime(playbackStatus.positionMillis);
      }
    }
  };

  const play = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/meditations/meditation.mp3"),
      {},
      onPlaybackStatusUpdate
    );
    setSound(sound);
    await sound.playAsync();
    setIsPlaying(true);
  };

  const pause = async () => {
    await sound.pauseAsync();
    setIsPlaying(false);
  };

  if (!meditation) {
    return <NotFoundScreen />;
  }

  const { title, subtitle, image } = meditation;

  const minutes = Math.floor(currentTime / 60000);
  const seconds = Math.floor((currentTime * 0.001) % 60);
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.controls}>
        <Text>
          {minutes}:{seconds}
        </Text>
        <PlayerIcon name="stepbackward" onPress={() => {}} size={20} />
        {isPlaying ? (
          <PlayerIcon name="pausecircle" onPress={pause} />
        ) : (
          <PlayerIcon name="play" onPress={play} />
        )}
        <PlayerIcon name="stepforward" onPress={() => {}} size={20} />
        <Text>
          {minutes}:{seconds}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 66,
    paddingBottom: 66,
    paddingLeft: 31,
    paddingRight: 31,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 50,
  },
  image: {
    width: 252,
    height: 252,
    marginBottom: 66,
    borderRadius: 10,
    alignSelf: "center",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
