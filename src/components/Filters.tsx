import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Switch,
  Tooltip,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FaFilter } from "react-icons/fa";
import { SearchContext } from "../context/SearchContext";

export const Filters = () => {
  const { showTestnets, showDeprecated, showFlagged, setShowTestnets, setShowDeprecated, setShowFlagged } =
    useContext(SearchContext);

  const handleTestnetsToggle = () => {
    setShowTestnets((state) => !state);
  };

  const handleDeprecatedToggle = () => {
    setShowDeprecated((state) => !state);
  };

  const handleFlaggedToggle = () => {
    setShowFlagged((state) => !state);
  };

  return (
    <Popover>
      <Tooltip label="Filters">
        <PopoverTrigger>
          <IconButton
            size="lg"
            aria-label="Filters"
            icon={<FaFilter />}
            mr="1"
          />
        </PopoverTrigger>
      </Tooltip>
      <Portal>
        <PopoverContent maxW="220px">
          <PopoverArrow />
          <PopoverBody>
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb="2"
            >
              <FormLabel htmlFor="testnet-switch" mb="0">
                Show Testnets
              </FormLabel>
              <Switch
                id="testnet-switch"
                onChange={handleTestnetsToggle}
                isChecked={showTestnets}
              />
            </FormControl>

            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb="2"
            >
              <FormLabel htmlFor="deprecated-switch" mb="0">
                Show Deprecated
              </FormLabel>
              <Switch
                id="deprecated-switch"
                onChange={handleDeprecatedToggle}
                isChecked={showDeprecated}
              />
            </FormControl>

            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <FormLabel htmlFor="flagged-switch" mb="0">
                Show Flagged
              </FormLabel>
              <Switch
                id="flagged-switch"
                onChange={handleFlaggedToggle}
                isChecked={showFlagged}
              />
            </FormControl>

          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
