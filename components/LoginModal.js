import { useAppContext } from "../store/AppStore";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  useToast,
  Button,
  VStack,
  HStack,
  Text,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  IoLogoFacebook,
  IoLogoGoogle,
  IoLogoApple,
  IoMdPhonePortrait,
} from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { gql } from "graphql-request";
import { getGraphQLClient } from "../utils/apollo";
import { useGetWording } from "../utils/wordings/useWording";
import { useCredential } from "../utils/user";

const LoginModal = () => {
  const {
    loginModalDisclosure,
    registerModalDisclosure,
    otpVerifyModalDisclosure,
  } = useAppContext();

  const [tab, setTab] = useState("email");
  const getWording = useGetWording();
  const [setCredential] = useCredential();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();


  const toast = useToast();

  const onPhoneLogin = useCallback(({ phone }) => {
    otpVerifyModalDisclosure.onOpen({ phone, type: "login" });
    loginModalDisclosure.onClose();
  }, []);
  
  const onEmailLogin = useCallback(async ({ email, password }) => {
    try {
      const mutation = gql`
        mutation UserLogin($input: LoginInput) {
          UserLogin(input: $input) {
            token
            user {
              email
              identities {
                id
              }
            }
          }
        }
      `;

      const variables = {
        input: {
          email,
          password,
        },
      };

      const data = await getGraphQLClient().request(mutation, variables);
      setCredential(data?.UserLogin);
      loginModalDisclosure.onClose();
    } catch (e) {
      setError("password", {
        message: getWording("login.login_error_message"),
      });
    }
  }, []);

  return (
    <Modal
      isOpen={loginModalDisclosure.isOpen}
      onClose={loginModalDisclosure.onClose}
    >
      <ModalOverlay></ModalOverlay>
      <ModalContent maxW={400} w="95%" py={4}>
        <ModalHeader mt={4} fontSize="3xl">
          {getWording("login.login_title")}
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            {tab === "email" && (
              <VStack as="form" onSubmit={handleSubmit(onEmailLogin)}>
                <FormControl>
                  <FormLabel>{getWording("login.login_email_label")}</FormLabel>
                  <Input
                    placeholder="testing@example.com"
                    {...register("email")}
                  />
                  <FormHelperText>{errors?.email?.message}</FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>
                    {getWording("login.login_password_label")}
                  </FormLabel>
                  <Input type="password" {...register("password")} />
                  <FormHelperText color="red.500">
                    {errors?.password?.message}
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <Button
                    color="black"
                    w="100%"
                    fontWeight="bold"
                    lineHeight={3}
                    borderRadius="3xl"
                    colorScheme="primary"
                    bgColor="primary.400"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    {getWording("login.login_button_label")}
                  </Button>
                </FormControl>
              </VStack>
            )}
            {tab === "phone" && (
              <VStack as="form" onSubmit={handleSubmit(onPhoneLogin)}>
                <FormControl>
                  <FormLabel>{getWording("login.login_phone_label")}</FormLabel>
                  <Input placeholder="91234567" {...register("phone")} />
                  <FormHelperText>{errors?.phone?.message}</FormHelperText>
                </FormControl>
                <FormControl>
                  <Button
                    color="black"
                    w="100%"
                    fontWeight="bold"
                    lineHeight={3}
                    borderRadius="3xl"
                    colorScheme="primary"
                    bgColor="primary.400"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    {getWording("login.phone_verify_button_label")}
                  </Button>
                </FormControl>
              </VStack>
            )}
            <HStack py={2} align="center">
              <Box
                flex={1}
                minW={0}
                w="100%"
                borderBottomWidth={1}
                borderColor="gray.200"
              ></Box>
              <Box fontSize="sm" color="gray.400">
                {getWording("login.or_label")}
              </Box>
              <Box
                flex={1}
                minW={0}
                w="100%"
                borderBottomWidth={1}
                borderColor="gray.200"
              ></Box>
            </HStack>

            <VStack align="stretch">
              {tab === "email" && (
                <Button
                  onClick={() => setTab("phone")}
                  variant="outline"
                  borderWidth={2}
                  borderColor="black"
                  colorScheme="gray"
                >
                  <HStack w="100%">
                    <IoMdPhonePortrait size={18} />
                    <Text flex={1} minW={0} w="100%">
                      Sign In With Phone
                    </Text>
                  </HStack>
                </Button>
              )}
              {tab === "phone" && (
                <Button
                  onClick={() => setTab("email")}
                  variant="outline"
                  borderWidth={2}
                  borderColor="black"
                  colorScheme="gray"
                >
                  <HStack w="100%">
                    <AiOutlineMail size={18} />
                    <Text flex={1} minW={0} w="100%">
                      Sign In With Email
                    </Text>
                  </HStack>
                </Button>
              )}
              <Button colorScheme="facebook" color="white">
                <HStack w="100%">
                  <IoLogoFacebook size={18} color="white" />
                  <Text flex={1} minW={0} w="100%">
                    Sign In With Facebook
                  </Text>
                </HStack>
              </Button>
              <Button
                variant="solid"
                _hover={{ bgColor: "black" }}
                bgColor="black"
                color="white"
              >
                <HStack w="100%">
                  <IoLogoApple size={18} color="white" />
                  <Text flex={1} minW={0} w="100%">
                    Sign In With Apple
                  </Text>
                </HStack>
              </Button>
              <Button colorScheme="google" color="white">
                <HStack w="100%">
                  <IoLogoGoogle size={18} color="white" />
                  <Text flex={1} minW={0} w="100%">
                    Sign In With Google
                  </Text>
                </HStack>
              </Button>
            </VStack>
            <Button
              alignSelf="start"
              variant="link"
              color="black"
              fontWeight="normal"
              onClick={() => {
                loginModalDisclosure.onClose();
                registerModalDisclosure.onOpen();
              }}
            >
              {getWording("login.register_message_link")}
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
