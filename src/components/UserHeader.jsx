import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Link } from "react-router-dom";

function UserHeader() {
  const toast = useToast();
  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href).then(() =>
      toast({
        description: "Copied to clipboard",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    );
  };
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Zuck
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>mzuck</Text>
            <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"}>
              threads
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            size={{ base: "md", md: "xl" }}
            src="zuck-avatar.png"
            name=""
          />
        </Box>
      </Flex>
      <Text>Co-founder, CEO etc.</Text>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>3.2 followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex gap={2} alignItems={"center"}>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1px solid white"}
          justifyContent={"center"}
          cursor={"pointer"}
          pb={3}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          color={"gray.light"}
          justifyContent={"center"}
          cursor={"pointer"}
          pb={3}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
}

export default UserHeader;
