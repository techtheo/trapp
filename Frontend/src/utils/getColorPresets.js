// theme
import palette from "../theme/palette";

export const colorPresets = [
  // DEFAULT
  {
    name: "default",
    ...palette.light.primary,
  },
  // PURPLE
  {
    name: "purple",
    lighter: "#EBD6FD",
    light: "#B985F4",
    main: "#7635dc",
    dark: "#431A9E",
    darker: "#200A69",
    contrastText: "#fff",
  },
  // CYAN
  {
    name: "cyan",
    lighter: "#D1FFFC",
    light: "#76F2FF",
    main: "#1CCAFF",
    dark: "#0E77B7",
    darker: "#053D7A",
    contrastText: palette.light.grey[800],
  },
  // BLUE
  {
    name: "blue",
    lighter: "#D1E9FC",
    light: "#76B0F1",
    main: "#2065D1",
    dark: "#103996",
    darker: "#061B64",

    contrastText: "#fff",
  },
  // ORANGE
  {
    name: "orange",
    lighter: "#FEF4D4",
    light: "#FED680",
    main: "#fda92d",
    dark: "#B66816",
    darker: "#793908",
    contrastText: palette.light.grey[800],
  },
  // RED
  {
    name: "red",
    lighter: "#FFE3D5",
    light: "#FFC1AC",
    main: "#FF3030",
    dark: "#B71833",
    darker: "#7A0930",
    contrastText: "#fff",
  },
   // BROWN
   {
    name: "brown",
    lighter: "#EADDCA",
    light: "#CD7F32",
    main: "#A52A2A",
    dark: "	#7B3F00",
    darker: "	#6E260E",
    contrastText: "#fff",
  },
  // GREEN
  {
    name: "green",
    lighter: "#00FFFF",
    light: "#7FFFD4",
    main: "#008000",
    dark: "#023020",
    darker: "#355E3B",
    contrastText: "#fff",
  },
  // PINK
  {
    name: "pink",
    lighter: "#F8C8DC",
    light: "#FAA0A0",
    main: "#FF69B4",
    dark: "	#FF00FF",
    darker: "#FF10F0",
    contrastText: "#fff",
  },
   // BLACK
   {
    name: "black",
    lighter: "#36454F",
    light: "#343434",
    main: "#000000",
    dark: "#28282B",
    darker: "#1B1212",
    contrastText: "#fff",
  },
  // 
  // {
  //   name: "black",
  //   lighter: "#36454F",
  //   light: "#343434",
  //   main: "#000000",
  //   dark: "#28282B",
  //   darker: "#1B1212",
  //   contrastText: "#fff",
  // },
];

export const defaultPreset = colorPresets[0];
export const purplePreset = colorPresets[1];
export const cyanPreset = colorPresets[2];
export const bluePreset = colorPresets[3];
export const orangePreset = colorPresets[4];
export const redPreset = colorPresets[5];
export const brownPretest = colorPresets[6];
export const greenPretest = colorPresets[7];
export const pinkPretest = colorPresets[8];
export const blackPretest = colorPresets[9];

export default function getColorPresets(presetsKey) {
  return {
    purple: purplePreset,
    cyan: cyanPreset,
    blue: bluePreset,
    orange: orangePreset,
    red: redPreset,
    brown: brownPretest,
    green: greenPretest,
    pink: pinkPretest,
    black: blackPretest,
    default: defaultPreset,
  }[presetsKey];
}
