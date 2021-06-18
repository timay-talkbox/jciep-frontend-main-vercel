import { Box, HStack, Text } from "@chakra-ui/layout";
import { Image, TabList, Tabs, Tab, Link } from "@chakra-ui/react";
import withConfigurationCMS from "../utils/configuration/withConfigurationCMS";
import Container from "./Container";
import NextLink from "next/link";
import { useMemo, useRef } from "react";
import { useRouter } from "next/router";
const Navigation = ({ navigation }) => {
  const router = useRouter();

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
        console.log(router.pathname, router.pathname.match(regexr));
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

  console.log(tabIndex);

  return (
    <Box position="fixed" zIndex={100} top={16} w="100%">
      <Container>
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
          <Tabs h="100%" index={Number(tabIndex)}>
            <TabList h="100%" border={0}>
              {(navigation.menu ?? []).map(({ id, label, path = "/" }) => (
                <NextLink href={path}>
                  <Tab
                    px={2}
                    _focus={{ outline: "none" }}
                    borderColor="transparent"
                    _selected={{ borderColor: "green", fontWeight: "bold" }}
                    appearance="none"
                    borderBottomWidth={3}
                    key={id}
                  >
                    {label}
                  </Tab>
                </NextLink>
              ))}
            </TabList>
          </Tabs>
        </HStack>
      </Container>
    </Box>
  );
};

export default withConfigurationCMS(Navigation, {
  key: "navigation",
  label: "導航 Navigation",
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
      label: "Menu 導航",
      component: "group-list",
      itemProps: (item) => ({
        key: item.id,
        label: item.label,
      }),
      defaultItem: () => ({
        id: Math.random().toString(36).substr(2, 9),
      }),
      fields: [
        {
          label: "路徑 Path",
          name: "path",
          component: "text",
        },
        {
          label: "標籤 Label",
          name: "label",
          component: "text",
        },
      ],
    },
  ],
});
