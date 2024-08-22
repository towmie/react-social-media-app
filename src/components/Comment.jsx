import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

function Comment() {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar size="sm" src="/zuck-avatar.png" />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            justifyContent={"space-between"}
            w={"full"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              Mark
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>Lorem ipsum dolor sit amet</Text>
          <Actions liked={liked} setLiked={setLiked} />
          <Text fontSize={"sm"} color={"gray.light"}>
            {100 + (liked ? 1 : 0)} likes
          </Text>
        </Flex>
      </Flex>
      <Divider my={3} />
    </>
  );
}

export default Comment;
