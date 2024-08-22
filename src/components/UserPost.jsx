import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";
import { useState } from "react";

function UserPost({ likes, replies, postTitle, postImg }) {
  const [liked, setLiked] = useState();
  return (
    <Link to="/mark/post/12">
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection="column" alignItems="center">
          <Avatar size="sm" src="/zuck-avatar.png" />
          <Box w="1px" h="full" bg="gray.light" my="2"></Box>
          <Box position="relative" w="full">
            <Avatar
              size="xs"
              position="absolute"
              src="https://bit.ly/sage-adebayo"
              top="0"
              left="0"
              padding="2px"
            />
            <Avatar
              size="xs"
              position="absolute"
              src="https://bit.ly/adam-d-solo"
              top="0"
              left="15px"
              padding="2px"
            />
            <Avatar
              size="xs"
              position="absolute"
              src="https://bit.ly/code-beast"
              top="0"
              left="25px"
              padding="2px"
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent="space-between" w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize="sm" fontWeight="bold">
                mark
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1}></Image>
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{postTitle}</Text>
          {postImg && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={postImg} w={"full"} />
            </Box>
          )}
          <Flex gap={2}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {replies} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {likes} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}

export default UserPost;
