import { Box, HStack } from "@chakra-ui/layout";
import wordListFieldsForCMS from "../utils/tina/wordListFieldsForCMS";
import NextLink from "next/link";
import {
  Drawer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Image,
  Avatar,
  Button,
  Divider,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  Tag,
  Text,
  VStack,
  useMediaQuery,
  IconButton,
  DrawerBody,
  DrawerContent,
  useDisclosure,
  DrawerOverlay,
  PopoverBody,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCMS } from "tinacms";
import withConfigurationCMS from "../utils/configuration/withConfigurationCMS";
import Container from "./Container";
import { useAppContext } from "../store/AppStore";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import OtpVerifyModal from "./OtpVerifyModal";
import EmailVerifySentModal from "./EmailVerifyModal";
import { useGetWording } from "../utils/wordings/useWording";
import { useCallback, useEffect, useMemo } from "react";
import { getGraphQLClient } from "../utils/apollo";
import { gql } from "graphql-request";
import nookies from "nookies";
import { useCredential } from "../utils/user";
import { AiOutlineMenu } from "react-icons/ai";

const Header = ({ navigation, header }) => {
  const getWording = useGetWording();
  const {
    isLoggedIn,
    loginModalDisclosure,
    registerModalDisclosure,
    user,
    identityId: currentIdentityId,
  } = useAppContext();

  const router = useRouter();
  const mobileMenuDisclosure = useDisclosure();

  const [isLargetThan960] = useMediaQuery("(min-width: 960px)");
  const tabIndex = useMemo(() => {
    const kv = {
      0: /^(\/home)/g,
      1: /^(\/programme)/g,
      2: /^(\/people-with-disabilities)/g,
      3: /^(\/resources)/g,
      4: /^(\/job-opportunities)/g,
      5: /^(\/talents)/g,
      6: /^(\/sharing)/g,
    };
    return Object.entries(kv).reduce((tabIndex, [index, regexr]) => {
      if (tabIndex === undefined) {
        if (router.pathname.match(regexr)) {
          return index;
        } else {
          return tabIndex;
        }
      } else {
        return tabIndex;
      }
    }, undefined);
  }, [router.pathname]);

  const cms = useCMS();
  const [setCredential, removeCredential] = useCredential();

  const onIdentitySwitch = useCallback((identityId) => {
    setIdentityId(identityId);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const token = nookies.get("jciep-token")?.["jciep-token"];

        const mutation = gql`
          mutation UserGet($token: String!) {
            UserGet(token: $token) {
              email
              identities {
                id
              }
            }
          }
        `;
        const data = await getGraphQLClient().request(mutation, { token });
        setCredential({ token, user: data?.UserGet });
      } catch (e) {
        removeCredential();
      }
    })();
  }, [setCredential, removeCredential]);

  const onLogout = useCallback(() => {
    removeCredential();
  }, [removeCredential]);

  return (
    <Box>
      <Box
        d={["none", "none", "block", "block"]}
        bg="white"
        position="fixed"
        top={0}
        w="100%"
        zIndex={200}
        h={12}
      >
        <Container>
          <HStack py={2} fontSize="sm" alignItems="center">
            <Box flex={1} minW={0} w="100%" />
            <Text>{user ? user.email ?? user.phone : "guest"}</Text>
            <Link href="/web-accessibility" fontSize="sm">
              {getWording("header.font_size_level_label")}
            </Link>
            <Select
              border="none"
              size="sm"
              w={16}
              variant="flushed"
              value={router.locale}
              onChange={(e) => {
                if (cms.enabled) {
                  window.location.href = `/${e.target.value}${router.asPath}`;
                } else {
                  router.push(router.pathname, router.pathname, {
                    locale: e.target.value,
                  });
                }
              }}
            >
              <option value="zh">???</option>
              <option value="en">EN</option>
            </Select>
            <Popover placement="bottom-end" gutter={20}>
              <PopoverTrigger>
                <Avatar size="xs"></Avatar>
              </PopoverTrigger>
              {!isLoggedIn ? (
                <PopoverContent p={3} w={48}>
                  <VStack align="stretch">
                    <Link onClick={loginModalDisclosure.onOpen}>
                      {getWording("header.login_label")}
                    </Link>
                    <Link onClick={registerModalDisclosure.onOpen}>
                      {getWording("header.register_label")}
                    </Link>
                  </VStack>
                </PopoverContent>
              ) : (
                <PopoverContent p={3} w={72}>
                  <VStack align="stretch" spacing={4}>
                    {
                      <VStack spacing={2} align="stretch">
                        <Text my={1} fontWeight="bold">
                          {getWording("header.identity_subheading")}
                        </Text>
                        <VStack align="stretch">
                          <HStack
                            _hover={{ bg: "gray.50" }}
                            cursor="pointer"
                            p={2}
                            spacing={4}
                          >
                            <Avatar size="sm"></Avatar>
                            <VStack
                              align="start"
                              spacing={0}
                              flex={1}
                              minW={0}
                              w="100%"
                            >
                              <Text fontSize="md">?????????</Text>
                              <Text color="gray.500" fontSize="sm">
                                ????????????
                              </Text>
                            </VStack>
                            <Tag size="sm">
                              {getWording("header.current_label")}
                            </Tag>
                          </HStack>
                          {(user?.identities ?? []).map((identity) => (
                            <HStack
                              key={identity.id}
                              _hover={{ bg: "gray.100" }}
                              cursor="pointer"
                              p={2}
                              spacing={4}
                              onClick={onIdentitySwitch}
                            >
                              <Avatar size="sm"></Avatar>
                              <VStack spacing={0}>
                                <Text fontSize="md">
                                  {identity.chineseName}
                                </Text>
                                <Text color="gray.500" fontSize="sm">
                                  {identity.type}
                                </Text>
                              </VStack>
                              {currentIdentityId === identity.id && (
                                <Tag size="sm">
                                  {getWording("header.current_label")}
                                </Tag>
                              )}
                            </HStack>
                          ))}
                          {!user?.identities?.length && (
                            <Link href="/user/identity/select">
                              <Button
                                size="sm"
                                mt={4}
                                w="100%"
                                alignSelf="center"
                                variant="ghost"
                                color="gray.500"
                                textAlign="center"
                              >
                                {getWording("header.add_identity_label")}
                              </Button>
                            </Link>
                          )}
                        </VStack>
                        <Divider />
                        <VStack mt={2} align="stretch" spacing={2}>
                          <Link onClick={registerModalDisclosure.onOpen}>
                            {getWording("header.account_setting_label")}
                          </Link>
                          <Link onClick={onLogout}>
                            {getWording("header.logout_label")}
                          </Link>
                        </VStack>
                      </VStack>
                    }
                  </VStack>
                </PopoverContent>
              )}
            </Popover>
          </HStack>
        </Container>
        <Container mt={4}>
          <HStack
            alignItems="stretch"
            justifyContent="stretch"
            h={16}
            borderRadius="50px"
            bgColor="white"
            boxShadow="sm"
            borderWidth={1}
            pr={6}
          >
            <Image p={2} h="100%" src={navigation?.logo} />
            <Box flex={1} minW={0} w="100%" />
            <HStack justifyContent="stretch" h="100%" border={0}>
              {(navigation.menu ?? []).map(
                ({ id, submenu = [], label, path = "/" }, index) =>
                  submenu?.length > 0 ? (
                    <Popover key={id} trigger="hover" gutter={20}>
                      <PopoverTrigger>
                        <Box h="100%">
                          <NextLink href={path}>
                            <Button
                              h="100%"
                              variant="unstyled"
                              borderRadius={0}
                              px={2}
                              _focus={{ outline: "none" }}
                              fontWeight="normal"
                              borderColor="transparent"
                              {...(Number(tabIndex) === index && {
                                borderColor: "green",
                                fontWeight: "bold",
                              })}
                              appearance="none"
                              borderBottomWidth={3}
                            >
                              {label}
                            </Button>
                          </NextLink>
                        </Box>
                      </PopoverTrigger>
                      <PopoverContent w="fit-content">
                        <PopoverBody as={VStack} spacing={4} fontSize="md">
                          {submenu.map(({ label, path }) => (
                            <NextLink key={id} href={path}>
                              <Button
                                h="100%"
                                variant="unstyled"
                                borderRadius={0}
                                px={10}
                                minW={200}
                                _focus={{ outline: "none" }}
                                fontWeight="normal"
                                borderColor="transparent"
                                appearance="none"
                              >
                                {label}
                              </Button>
                            </NextLink>
                          ))}
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <NextLink href={path}>
                      <Button
                        h="100%"
                        variant="unstyled"
                        borderRadius={0}
                        px={2}
                        _focus={{ outline: "none" }}
                        fontWeight="normal"
                        borderColor="transparent"
                        {...(Number(tabIndex) === index && {
                          borderColor: "green",
                          fontWeight: "bold",
                        })}
                        appearance="none"
                        borderBottomWidth={3}
                      >
                        {label}
                      </Button>
                    </NextLink>
                  )
              )}
            </HStack>
          </HStack>
        </Container>
      </Box>
      <LoginModal />
      <RegisterModal />
      <OtpVerifyModal />
      <EmailVerifySentModal />
      <Box d={["block", "block", "none", "none"]}>
        <HStack align="center" h={16} p={3}>
          <Image h="100%" src={navigation?.logo} />
          <Box minW={0} w="100%" flex={1} />
          <IconButton
            onClick={mobileMenuDisclosure.onOpen}
            variant="link"
            fontWeight="bold"
            fontSize="2xl"
            icon={<AiOutlineMenu />}
          />
        </HStack>
        <Drawer
          placement="left"
          minW={300}
          isOpen={mobileMenuDisclosure.isOpen}
          onClose={mobileMenuDisclosure.onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody>
              <VStack minH="100%" align="stretch">
                <Accordion
                  allowToggle={true}
                  defaultIndex={[0, 1, 2, 3, 4, 5, 6, 7]}
                  flex={1}
                  minH={0}
                  h="100%"
                >
                  <VStack my={12} align="start" spacing={8} overflow="auto">
                    {(navigation.menu ?? []).map(
                      ({ id, submenu = [], label, path = "/" }, index) =>
                        submenu?.length > 0 ? (
                          <AccordionItem
                            w="100%"
                            key={id}
                            trigger="hover"
                            gutter={20}
                            border={0}
                          >
                            <AccordionButton
                              p={0}
                              appearance="none"
                              bg="transparent"
                              textAlign="left"
                              _hover={{ bg: "transparent" }}
                              _focus={{ outline: "none" }}
                              h="100%"
                            >
                              <Button
                                variant="unstyled"
                                _hover={{ bg: "transparent" }}
                                _focus={{ outline: "none" }}
                                fontSize="2xl"
                                p={0}
                                bg="transparent"
                                borderRadius={0}
                                fontWeight="normal"
                                borderColor="transparent"
                                borderBottomWidth={3}
                                {...(Number(tabIndex) === index && {
                                  borderColor: "green",
                                  fontWeight: "bold",
                                })}
                              >
                                {label}
                              </Button>
                            </AccordionButton>
                            <AccordionPanel>
                              <VStack
                                my={4}
                                fontSize="2xl"
                                align="start"
                                w="100%"
                                spacing={2}
                              >
                                {submenu.map(({ label, path }) => (
                                  <NextLink key={id} href={path}>
                                    <Button
                                      fontSize="xl"
                                      h="100%"
                                      variant="unstyled"
                                      borderRadius={0}
                                      _focus={{ outline: "none" }}
                                      fontWeight="normal"
                                      borderColor="transparent"
                                      appearance="none"
                                    >
                                      {label}
                                    </Button>
                                  </NextLink>
                                ))}
                              </VStack>
                            </AccordionPanel>
                          </AccordionItem>
                        ) : (
                          <NextLink href={path}>
                            <Button
                              fontSize="2xl"
                              textAlign="left"
                              variant="unstyled"
                              borderRadius={0}
                              px={2}
                              _focus={{ outline: "none" }}
                              fontWeight="normal"
                              borderColor="transparent"
                              {...(Number(tabIndex) === index && {
                                borderColor: "green",
                                fontWeight: "bold",
                              })}
                              appearance="none"
                              borderBottomWidth={3}
                            >
                              {label}
                            </Button>
                          </NextLink>
                        )
                    )}
                  </VStack>
                </Accordion>
                <HStack borderTopWidth={1} borderColor="#ddd" p={4}>
                  <Link href="/web-accessibility" fontSize="sm">
                    {getWording("header.font_size_level_label")}
                  </Link>
                  <Box flex={1} minW={0} w="100%" />
                  <Select
                    border="none"
                    size="sm"
                    w={16}
                    variant="flushed"
                    value={router.locale}
                    onChange={(e) => {
                      if (cms.enabled) {
                        window.location.href = `/${e.target.value}${router.asPath}`;
                      } else {
                        router.push(router.pathname, router.pathname, {
                          locale: e.target.value,
                        });
                      }
                    }}
                  >
                    <option value="zh">???</option>
                    <option value="en">EN</option>
                  </Select>
                </HStack>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

export default withConfigurationCMS(
  withConfigurationCMS(
    withConfigurationCMS(Header, {
      key: "navigation",
      label: "?????? Navigation",
      fields: [
        {
          label: "Logo",
          name: "logo",
          component: "image",
          uploadDir: () => "/navigation",
          parse: ({ previewSrc }) => previewSrc,
          previewSrc: (src) => src,
        },
        {
          name: "menu",
          label: "Menu ??????",
          component: "group-list",
          itemProps: (item) => ({
            key: item.id,
            label: item.label,
          }),
          defaultItem: () => ({
            label: "Menu Item ????????????",
            path: "",
            id: Math.random().toString(36).substr(2, 9),
          }),
          fields: [
            {
              label: "submenu ?????????",
              name: "submenu",
              component: "group-list",
              itemProps: (item) => ({
                key: item.id,
                label: item.label,
              }),
              defaultItem: () => ({
                label: "Submenu Item ???????????????",
                path: "",
                id: Math.random().toString(36).substr(2, 9),
              }),
              fields: [
                {
                  label: "?????? Path",
                  name: "path",
                  component: "text",
                },
                {
                  label: "?????? Label",
                  name: "label",
                  component: "text",
                },
              ],
            },
            {
              label: "?????? Path",
              name: "path",
              component: "text",
            },
            {
              label: "?????? Label",
              name: "label",
              component: "text",
            },
          ],
        },
      ],
    }),

    {
      key: "header",
      label: "?????? Header",
      fields: [wordListFieldsForCMS({ name: "wordings" })],
    }
  ),
  {
    key: "setting",
    label: "?????? Setting",
    fields: [
      {
        name: "categories",
        component: "group-list",
        label: "?????? Categories",
        itemProps: ({ id: key, label }) => ({
          key,
          label: label?.zh || label?.en ? `${label?.zh} ${label?.en}` : "",
        }),
        defaultItem: () => ({
          id: Math.random().toString(36).substr(2, 9),
        }),
        fields: [
          {
            name: "key",
            component: "text",
            label: "????????? Post Category Key",
          },
          {
            name: "label",
            component: "group",
            label: "???????????? Category Label",
            fields: [
              {
                name: "en",
                component: "text",
                label: "?????? English",
              },
              {
                name: "zh",
                component: "text",
                label: "???????????? Traditional Chinese",
              },
            ],
          },
          {
            name: "color",
            component: "color",
            label: "?????? Color",
          },
          {
            name: "textColor",
            component: "color",
            label: "?????? Color",
          },
          {
            label: "?????? Icon",
            name: "image",
            component: "image",
            uploadDir: () => "/sharing/categories",
            parse: ({ previewSrc }) => previewSrc,
            previewSrc: (src) => src,
          },
        ],
      },
    ],
  }
);
