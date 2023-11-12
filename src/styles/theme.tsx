import { DefaultTheme } from "styled-components";

export const LightTheme: DefaultTheme = {
  name: "LIGHT",
  color: {
    text: {
      body: "#183028",
      menu: "#183028",
      shadow: "#183028",
      disabled: "#B3B6B8",
    },
    input: {
      background: "white",
      placeholder: "#8B8E8F",
    },
    button: {
      color: "#ffffff",
      background: "#e87722",
      colorDisabled: "#B3B6B8",
      backgroundDisabled: "#F3BB90",
    },
    table: {
      tdBorder: "#EDEFF0",
      thBorder: "#EDEFF0",
      thBackground: "#e87722",
    },
    page: {
      border: "#EDEFF0",
      background: "#E5E5E5",
      loadingBackground: "rgb(255, 255, 255, 0.2)",
    },
    status: {
      primary: "#e87722",
      primary_20: "#FAE4D3",
      primary_50: "#F3BB90",
      gray1: "#7C878E",
      gray1_50: "#BDC3C7",
      gray1_20: "#E5E7E8",
      gray2: "#DBDFE1",
      gray2_50: "#EDEFF0",
      gray2_20: "#F8F9F9",
      dark_green: "#0A3B32",
      black: "#333333",
      white: "#ffffff",
      green: "#00d092",
      green_20: "#6ECEB2",
      red: "#F30000",
      red_20: "#FDCCCC",
      blue: "#0097A9",
      blue_20: "CCEAEE",
      yellow: "#FED141",
      yellow_20: "#FFF6D9",
    },
  },
};
