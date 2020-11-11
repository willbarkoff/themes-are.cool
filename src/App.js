import React, { useState, useEffect } from "react";
import tinycolor from "tinycolor2";
import { lch, hsl } from "d3-color";

import Configurator from "./Configurator";
import Sidebar from "./Sidebar";
import { useDarkMode } from "./useDarkMode";

function makeHoverColor(color) {
  let x = hsl(color)
  x.h += 3
  x.l = 0.94
  return x.formatHex()
}

function makeActivePresence(color) {
  let x = hsl(color)
  x.l = 0.38
  return x.formatHex()
}

function pickReadableColor(color, light, dark) {
  // 1 means both colors are identical. 21 means maximum contrast.
  const contrast = tinycolor.readability(color, light);
  return contrast >= 3 ? light : dark;
}

function App() {
  const [primaryColor, setPrimaryColor] = useState("#001A5E");
  const isDarkMode = useDarkMode();
  useEffect(() => {
    setThemeType(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  const [themeType, setThemeType] = useState(isDarkMode ? "dark" : "light");
  const bg = themeType === "dark" ? "#1a1d21" : "#ffffff";
  const fg = themeType === "dark" ? "#d1d2d3" : "#1d1c1d";
  const border =
    themeType === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
  const columnBG = "#f8f8fa"
  const sideNavText = makeHoverColor(primaryColor)
  const activeItem = primaryColor;
  const activeItemText = "#f8f8fa";
  const hoverItem = sideNavText;
  const textColor = primaryColor;
  const activePresence = makeActivePresence(primaryColor);
  const mentionBadge = activePresence;
  const topNavBG = primaryColor;
  const topNavText = "#ffffff";
  const searchBorder = pickReadableColor(
    primaryColor,
    "rgba(255, 255, 255, 0.2)",
    "rgba(0, 0, 0, 0.2)"
  );
  const searchBG = pickReadableColor(
    primaryColor,
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.05)"
  );
  const theme = {
    themeType,
    bg,
    fg,
    border,
    searchBorder,
    searchBG,
    columnBG,
    activeItem,
    activeItemText,
    hoverItem,
    textColor,
    activePresence,
    mentionBadge,
    topNavBG,
    topNavText,
    sideNavText,
  };
  useEffect(() => {
    const style = document.documentElement.style;
    style.setProperty("--cool-bg", bg);
    style.setProperty("--cool-fg", fg);
    style.setProperty("--cool-border", border);
    style.setProperty("--cool-search-border", searchBorder);
    style.setProperty("--cool-search-bg", searchBG);
    style.setProperty("--cool-column-bg", columnBG);
    style.setProperty("--cool-active-item", activeItem);
    style.setProperty("--cool-active-item-text", activeItemText);
    style.setProperty("--cool-hover-item", hoverItem);
    style.setProperty("--cool-text-color", textColor);
    style.setProperty("--cool-active-presence", activePresence);
    style.setProperty("--cool-mention-badge", mentionBadge);
    style.setProperty("--cool-top-nav-bg", topNavBG);
    style.setProperty("--cool-top-nav-text", topNavText);
  });
  return (
    <div className="sans-serif flex flex-column flex-auto min-vh-100">
      <div
        className="pa2 tc bb b--cool cool-top-nav flex items-center"
        style={{ cursor: "default", userSelect: "none" }}
      >
        <div className="flex-auto" />
        <div className="ph2">&larr;</div>
        <div className="ph2 o-50">&rarr;</div>
        <div className="ph2" />
        <div className="pa1 br3 cool-search" style={{ width: 400 }}>
          Themes Are Cool
        </div>
        <div className="ph2" />
        <div className="ph2 o-0">&larr;</div>
        <div className="ph2 o-0">&rarr;</div>
        <div className="flex-auto" />
      </div>
      <div className="flex flex-auto">
        <Sidebar theme={theme} />
        <Configurator
          theme={theme}
          themeType={themeType}
          primaryColor={primaryColor}
          updatePrimaryColor={setPrimaryColor}
          updateThemeType={setThemeType}
        />
      </div>
    </div>
  );
}

App.displayName = "App";

export default App;
