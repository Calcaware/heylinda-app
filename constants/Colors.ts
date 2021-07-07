const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

const primary = "#463FB0";
const purples = {
  purple900: "#4A5784",
};
const grays = {
  white: "#fff",
  gray800: "#5D5D5D",
  gray900: "#333333",
  black: "#000",
};

export default {
  light: {
    primary,
    text: grays.black,
    background: grays.white,
    tint: primary,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    ...purples,
    ...grays,
  },
  dark: {
    primary,
    text: grays.black,
    background: grays.white,
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    ...purples,
    ...grays,
  },
};
