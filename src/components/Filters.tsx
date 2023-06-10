import {
  Button,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { FaFilter } from "react-icons/fa";

export const Filters = () => (
  <Popover>
    <PopoverTrigger>
      <Tooltip label="Filters">
        <IconButton size="lg" aria-label="Filters" icon={<FaFilter />} mr="1" />
      </Tooltip>
    </PopoverTrigger>
    <Portal>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Header</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Button colorScheme="blue">Button</Button>
        </PopoverBody>
      </PopoverContent>
    </Portal>
  </Popover>
);
