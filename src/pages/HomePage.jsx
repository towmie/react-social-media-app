import { Box, Button, Flex, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Box>
        <Link to="/mark">
          <Button colorScheme="blue" size="lg">
            Go to Mark&apos;s Profile
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default HomePage;
