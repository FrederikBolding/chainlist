import React from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip, useColorMode } from "@chakra-ui/react";

export const DarkModeToggle = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Tooltip label="Toggle Dark Mode">
      <IconButton
        {...props}
        aria-label="Toggle Dark Mode"
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      />
    </Tooltip>
  );
};
