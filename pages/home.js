import { Stack, Box, Text, VStack } from "@chakra-ui/layout";
import withPageCMS from "../utils/page/withPageCMS";
import { getPage } from "../utils/page/getPage";
import { NextSeo } from "next-seo";
import {
  SimpleGrid,
  Grid,
  chakra,
  GridItem,
  Heading,
  Image,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Container from "../components/Container";
import { getConfiguration } from "../utils/configuration/getConfiguration";
import metaTextTemplates from "../utils/tina/metaTextTemplates";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useCallback, useState } from "react";

const PAGE_KEY = "home";

export const getServerSideProps = async (context) => {
  return {
    props: {
      page: await getPage({ key: PAGE_KEY, lang: context.locale }),
      wordings: await getConfiguration({
        key: "wordings",
        lang: context.locale,
      }),
      header: await getConfiguration({ key: "header", lang: context.locale }),
      footer: await getConfiguration({ key: "footer", lang: context.locale }),
      navigation: await getConfiguration({
        key: "navigation",
        lang: context.locale,
      }),
    },
  };
};

const Video = chakra("video");

const useCounter = (start, length, initial = start) => {
  const [index, setIndex] = useState(initial);

  const inc = useCallback(() => setIndex((i) => (i + 1) % length), []);
  const dec = useCallback(() => setIndex((i) => (i + 1) % length), []);
  return [index, inc, dec];
};

const Home = ({ page }) => {
  return (
    <VStack w="100%" align="stretch" spacing={0}>
      {page?.content?.seo?.title && (
        <NextSeo
          title={page?.content?.seo?.title}
          description={page?.content?.seo?.description}
        ></NextSeo>
      )}

      {/* First Section */}
      <Box
        h="50vw"
        minH="70vh"
        position="relative"
        overflow="hidden"
        backgroundImage={`url(${page?.content?.banner?.image})`}
        backgroundSize="cover"
        backgroundPosition="center center"
      >
        {/* <Video
          loop
          w="100%"
          autoPlay
          src="http://techslides.com/demos/sample-videos/small.mp4"
        ></Video> */}
        <VStack
          // zIndex={10}
          align="stretch"
          position="absolute"
          bottom={0}
          w="100%"
          textAlign="center"
          backgroundImage="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.8))"
        >
          <Container>
            <Box pb={16}>
              <Heading as="h1" color="white">
                {page?.content?.banner?.title}
              </Heading>
              <Text whiteSpace="pre-wrap" color="white" fontSize="xl" mt={8}>
                {page?.content?.banner?.description}
              </Text>
            </Box>
          </Container>
          <Box>
            <svg viewBox="0 0 1367 118">
              <path
                id="border-yelo"
                d="M-89.57,13.3S42.93,121.87,209,121.87c109.69,0,171.75-11.82,299.71-40.29C653.81,49.29,790.55,1,937.84,1c110.53,0,351.82,92.9,433.81,92.9,113.73,0,145.78-15.67,145.78-15.67v71.23h-1607Z"
                fill="#f6d644"
                fillRule="evenodd"
              />
              <path
                id="border-blu"
                d="M1393.43,24.86S1324,80.79,1021.31,80.79c-236.59,0-266.11-61.87-433.82-61.87-130.63,0-259.57,91.81-429.83,91.81C61.48,110.73,5.43,58.21,5.43,58.21v92.23h1388Z"
                fill="#00bfba"
                fillRule="evenodd"
              />
              <path
                id="border-whtie"
                d="M-2.57,11.9s113,96.18,254.7,96.18c93.58,0,146.52-10.47,255.69-35.7C631.64,43.78,748.29,1,874,1c94.31,0,300.16,82.3,370.11,82.3,97,0,124.37-13.88,124.37-13.88v348H-2.57Z"
                fill="#efefef"
                fillRule="evenodd"
              />
            </svg>
          </Box>
        </VStack>
      </Box>

      {/* Second Section */}
      <Box bg="#efefef">
        <Container>
          <VStack align="center" py={16}>
            <Heading as="h4">
              {page?.content?.animation?.startFrame?.headline}
            </Heading>
            <Text
              pt={16}
              textAlign="center"
              fontSize={["xl", "3xl", "5xl", "5xl"]}
            >
              {(page?.content?.animation?.startFrame?.title ?? []).map(
                ({ _template, content, textcolor, bold }, index) => {
                  switch (_template) {
                    case "textBlock":
                      return (
                        <Text
                          d="inline"
                          key={index}
                          textColor={textcolor}
                          {...(bold && { fontWeight: "bold" })}
                        >
                          {content}
                        </Text>
                      );
                    case "lineBreakBlock":
                      return <br key={index} />;
                    default:
                  }
                }
              )}
            </Text>
            <SimpleGrid pt={16} columns={[2, 2, 2, 4]} spacing={8}>
              {(page?.content?.animation?.startFrame?.roles ?? []).map(
                ({ icon, name, caption }, index) => {
                  return (
                    <GridItem key={index}>
                      <VStack>
                        <Image w={100} src={icon}></Image>
                        <Text fontSize={["lg"]} fontWeight="bold">
                          {name}
                        </Text>
                        <Text textAlign="center">{caption}</Text>
                      </VStack>
                    </GridItem>
                  );
                }
              )}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Third Section */}
      <Box bg="#fff">
        <Container>
          <VStack align="center" py={32}>
            <Image
              maxW="480"
              w="80%"
              src={page?.content?.animation?.endFrame?.image}
            ></Image>
            <Heading pt={8} as="h4" fontSize={["2xl", "3xl", "4xl"]}>
              {page?.content?.animation?.endFrame?.title}
            </Heading>
            <Text
              w="80%"
              pt={8}
              textAlign="center"
              fontSize={["md", "lg", "2xl"]}
            >
              {(page?.content?.animation?.endFrame?.caption ?? []).map(
                ({ _template, content, textcolor, bold }, index) => {
                  switch (_template) {
                    case "textBlock":
                      return (
                        <Text
                          d="inline"
                          key={index}
                          textColor={textcolor}
                          {...(bold && { fontWeight: "bold" })}
                        >
                          {content}
                        </Text>
                      );
                    case "lineBreakBlock":
                      return <br key={index} />;
                    default:
                  }
                }
              )}
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Fourth Section */}

      <Box bg="#F6D644" position="relative">
        <Container>
          <Box py={32}>
            <SimpleGrid gap={4} align="center" py={16} columns={[1, 2, 2, 4]}>
              {(page?.content?.transitionBanner?.slides ?? []).map(
                ({ caption, image }, index) => (
                  <Box key={index} {...{ [index % 2 ? "pt" : "pb"]: 12 }}>
                    <Text h={8} mb={4} fontSize="xl">
                      {caption}
                    </Text>
                    <Box
                      borderWidth={4}
                      borderColor="white"
                      borderRadius={32}
                      bgImage={`url(${image})`}
                      bgSize="cover"
                      bgPos="center"
                      w="240px"
                      h="240px"
                      maxW="100%"
                    />
                  </Box>
                )
              )}
            </SimpleGrid>
          </Box>
        </Container>
        <Box>
          <svg viewBox="0 0 1367 118">
            <path
              id="border-yelo"
              d="M-89.57,13.3S42.93,121.87,209,121.87c109.69,0,171.75-11.82,299.71-40.29C653.81,49.29,790.55,1,937.84,1c110.53,0,351.82,92.9,433.81,92.9,113.73,0,145.78-15.67,145.78-15.67v71.23h-1607Z"
              fill="#f6d644"
              fillRule="evenodd"
            />
            <path
              id="border-blu"
              d="M1393.43,24.86S1324,80.79,1021.31,80.79c-236.59,0-266.11-61.87-433.82-61.87-130.63,0-259.57,91.81-429.83,91.81C61.48,110.73,5.43,58.21,5.43,58.21v92.23h1388Z"
              fill="#FEB534"
              fillRule="evenodd"
            />
            <path
              id="border-whtie"
              d="M-2.57,11.9s113,96.18,254.7,96.18c93.58,0,146.52-10.47,255.69-35.7C631.64,43.78,748.29,1,874,1c94.31,0,300.16,82.3,370.11,82.3,97,0,124.37-13.88,124.37-13.88v348H-2.57Z"
              fill="#00BFBA"
              fillRule="evenodd"
            />
          </svg>
        </Box>
      </Box>

      {/* Fifth Section */}

      <Box bg="#00BFBA" position="relative">
        <Carousel
          showArrows={true}
          showIndicators={false}
          autoPlay
          infiniteLoop
          interval={3000}
          showStatus={false}
          showThumbs={false}
        >
          {(page?.content?.sharing?.slides ?? []).map(
            ({ image, category, persona, title, excerpt }, index) => (
              <Container key={index}>
                <Stack
                  align="center"
                  justifyContent="center"
                  spacing={[6, 8, 10, 16]}
                  h={800}
                  direction={["column", "column", "row"]}
                >
                  <Box w={["100%", "50%", "40%"]}>
                    <Image src={image} />
                  </Box>
                  <VStack
                    px={8}
                    align="start"
                    flex={1}
                    minW={0}
                    textAlign="left"
                  >
                    <Box
                      bgColor="#00F5E7"
                      borderRadius={24}
                      fontSize="lg"
                      px={4}
                      py={0.5}
                    >
                      {category}
                    </Box>
                    <Text
                      fontWeight="bold"
                      d="block"
                      pb={4}
                      lineHeight="xl"
                      fontSize={["lg", "xl", "xl", "2xl"]}
                    >
                      {persona}
                    </Text>
                    <Heading
                      lineHeight="xl"
                      fontSize={["xl", "2xl", "2xl", "4xl"]}
                      whiteSpace="pre-wrap"
                      bgColor="white"
                    >
                      {title}
                    </Heading>
                    <Text
                      d="block"
                      pt={4}
                      whiteSpace="pre-wrap"
                      fontSize="2xl"
                      borderRadius={4}
                    >
                      {excerpt}
                    </Text>
                  </VStack>
                </Stack>
              </Container>
            )
          )}
        </Carousel>
      </Box>

      {/* role introduction */}
      <Grid bg="#fafafa" gridTemplateColumns="auto" w="100%">
        <Box
          gridArea="1/1/2/2"
          bgImage={`url(${page?.content?.roleIntroduction?.topLeftImage})`}
          bgRepeat="no-repeat"
          bgPosition="top left"
        ></Box>
        <Box
          gridArea="1/1/2/2"
          bgImage={`url(${page?.content?.roleIntroduction?.bottomRightImage})`}
          bgRepeat="no-repeat"
          bgPosition="bottom right"
        ></Box>
        <Box py={16} gridArea="1/1/2/2">
          <Container>
            <Heading mb={1} fontSize={["xl", "2xl", "3xl"]}>
              {page?.content?.roleIntroduction?.tagline}
            </Heading>
            <Tabs>
              <TabList border={0} as={HStack} spacing={8}>
                {(page?.content?.roleIntroduction?.roles ?? []).map(
                  ({ id, title }) => (
                    <Tab
                      fontSize={["2xl", "3xl", "4xl"]}
                      fontWeight="bold"
                      px={0}
                      _focus={{ outline: "none" }}
                      _selected={{ color: "black", borderBottomColor: "red" }}
                      borderBottomWidth={3}
                      key={id}
                    >
                      {title}
                    </Tab>
                  )
                )}
              </TabList>
              <TabPanels>
                {(page?.content?.roleIntroduction?.roles ?? []).map(
                  ({ id, description, features }) => (
                    <TabPanel px={0} key={id} py={12}>
                      <Text w={"50%"}>
                        {(description ?? []).map(
                          ({ _template, content, textcolor, bold }, index) => {
                            switch (_template) {
                              case "textBlock":
                                return (
                                  <Text
                                    d="inline"
                                    key={index}
                                    textColor={textcolor}
                                    {...(bold && { fontWeight: "bold" })}
                                  >
                                    {content}
                                  </Text>
                                );
                              case "lineBreakBlock":
                                return <br key={index} />;
                              default:
                            }
                          }
                        )}
                      </Text>
                      <SimpleGrid
                        columns={[1, 1, 3, 3]}
                        mt={8}
                        spacing={[2, 2, 2, 12]}
                      >
                        {(features ?? []).map(
                          ({ id, icon, title, caption, remark }) => (
                            <GridItem
                              as={VStack}
                              borderWidth={1}
                              bg="white"
                              _hover={{
                                boxShadow: "lg",
                                bg: "white",
                                opacity: 1,
                              }}
                              borderRadius={16}
                              opacity={0.5}
                              key={id}
                              px={8}
                              py={12}
                              align="center"
                              textAlign="center"
                            >
                              <Image w={16} src={icon}></Image>
                              <Text fontSize="xl" fontWeight="bold">
                                {title}
                              </Text>
                              <Text fontSize="sm" fontWeight="bold">
                                {caption}
                              </Text>
                              <Box flex={1} minH={8} h="100%" />
                              <Text fontSize="sm" color="gray.400">
                                {remark}
                              </Text>
                            </GridItem>
                          )
                        )}
                      </SimpleGrid>
                    </TabPanel>
                  )
                )}
              </TabPanels>
            </Tabs>
          </Container>
        </Box>{" "}
      </Grid>

      <Box
        py={32}
        bgColor="#F6D644"
        bgImage={`url(${page?.content?.quote?.background})`}
        bgSize="cover"
      >
        <Container>
          <VStack align="stretch" maxW={960} mx="auto">
            <Text alignSelf="flex-start" fontSize={["lg"]}>
              {page?.content?.quote?.audience}
            </Text>
            <Text fontSize={["2xl", "3xl", "4xl"]}>
              {(page?.content?.quote?.words ?? []).map(
                ({ _template, content, textcolor, bold }, index) => {
                  switch (_template) {
                    case "textBlock":
                      return (
                        <Text
                          d="inline"
                          key={index}
                          textColor={textcolor}
                          {...(bold && { fontWeight: "bold" })}
                        >
                          {content}
                        </Text>
                      );
                    case "lineBreakBlock":
                      return <br key={index} />;
                    default:
                  }
                }
              )}
            </Text>
            <Box alignSelf="flex-end">
              <Text fontSize={["2xl", "3xl", "4xl"]}>
                {page?.content?.quote?.reference}
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
    </VStack>
  );
};

export default withPageCMS(Home, {
  key: PAGE_KEY,
  fields: [
    {
      name: "banner",
      label: "???????????? Hero Banner",
      component: "group",
      fields: [
        {
          label: "???????????? Image",
          name: "image",
          component: "image",
          uploadDir: () => "/home",
          parse: ({ previewSrc }) => previewSrc,
          previewSrc: (src) => src,
        },
        {
          name: "title",
          label: "????????? Title",
          component: "text",
        },
        {
          name: "description",
          label: "description",
          label: "?????????  Description",
          component: "textarea",
        },
      ],
    },
    {
      name: "animation",
      label: "?????? Animation",
      component: "group",
      fields: [
        {
          name: "startFrame",
          label: "????????? Start Frame",
          component: "group",
          fields: [
            {
              name: "headline",
              label: "?????? Headline",
              component: "text",
            },
            {
              name: "title",
              label: "?????? Title",
              component: "blocks",
              templates: metaTextTemplates,
            },
            {
              name: "roles",
              label: "??????  Roles",
              component: "group-list",
              itemProps: ({ id: key, name: label }) => ({
                key,
                label,
              }),
              defaultItem: () => ({
                id: Math.random().toString(36).substr(2, 9),
              }),
              fields: [
                {
                  name: "icon",
                  label: "??????  Icon",
                  component: "image",
                  uploadDir: () => "/home",
                  parse: ({ previewSrc }) => previewSrc,
                  previewSrc: (src) => src,
                },
                {
                  name: "name",
                  label: "??????  Name",
                  component: "text",
                },
                {
                  name: "caption",
                  label: "??????  Caption",
                  component: "text",
                },
              ],
            },
          ],
        },
        {
          name: "endFrame",
          label: "????????? End Frame",
          component: "group",
          fields: [
            {
              name: "image",
              label: "??????  Image",
              component: "image",
              uploadDir: () => "/home",
              parse: ({ previewSrc }) => previewSrc,
              previewSrc: (src) => src,
            },
            {
              name: "title",
              label: "??????  Title",
              component: "text",
            },
            {
              name: "caption",
              label: "?????? Caption",
              component: "blocks",
              templates: metaTextTemplates,
            },
          ],
        },
      ],
    },

    {
      name: "transitionBanner",
      label: "???????????? Transition Banner",
      component: "group",
      fields: [
        {
          name: "slides",
          label: "?????? Slides",
          component: "group-list",
          itemProps: ({ id: key, caption: label }) => ({
            key,
            label,
          }),
          defaultItem: () => ({
            id: Math.random().toString(36).substr(2, 9),
          }),
          fields: [
            {
              name: "image",
              label: "??????  Image",
              component: "image",
              uploadDir: () => "/home",
              parse: ({ previewSrc }) => previewSrc,
              previewSrc: (src) => src,
            },
            {
              name: "caption",
              label: "?????? Caption",
              component: "text",
            },
          ],
        },
      ],
    },

    {
      name: "sharing",
      label: "???????????? Sharing",
      component: "group",
      fields: [
        {
          name: "slides",
          label: "?????? Slides",
          component: "group-list",
          itemProps: ({ id: key, caption: label }) => ({
            key,
            label,
          }),
          defaultItem: () => ({
            id: Math.random().toString(36).substr(2, 9),
          }),
          fields: [
            {
              name: "image",
              label: "??????  Image",
              component: "image",
              uploadDir: () => "/home/sharing",
              parse: ({ previewSrc }) => previewSrc,
              previewSrc: (src) => src,
            },
            {
              name: "category",
              label: "?????? Category",
              component: "text",
            },
            {
              name: "persona",
              label: "??????/?????? Person/Organization",
              component: "text",
            },
            {
              name: "title",
              label: "??????",
              component: "textarea",
            },
            {
              name: "excerpt",
              label: "??????",
              component: "textarea",
            },
          ],
        },
      ],
    },

    {
      label: "???????????? Role Introduction",
      name: "roleIntroduction",
      component: "group",

      fields: [
        {
          name: "topLeftImage",
          label: "???????????? Top Left Image",
          component: "image",
          uploadDir: () => "/home/roleIntroduction",
          parse: ({ previewSrc }) => previewSrc,
          previewSrc: (src) => src,
        },
        {
          name: "bottomRightImage",
          label: "???????????? Bottom Right Image",
          component: "image",
          uploadDir: () => "/home/roleIntroduction",
          parse: ({ previewSrc }) => previewSrc,
          previewSrc: (src) => src,
        },
        {
          name: "tagline",
          component: "text",
          label: "?????? TagLine",
        },
        {
          name: "roles",
          component: "group-list",
          label: "?????? Roles",
          itemProps: ({ id: key, title: label }) => ({
            key,
            label,
          }),
          defaultItem: () => ({
            id: Math.random().toString(36).substr(2, 9),
          }),
          fields: [
            {
              name: "title",
              component: "text",
              label: "?????? Title",
            },
            {
              name: "description",
              component: "blocks",
              templates: metaTextTemplates,
              label: "?????? description",
            },
            {
              name: "features",
              component: "group-list",
              label: "?????? Features",
              itemProps: ({ id: key, title: label }) => ({
                key,
                label,
              }),
              defaultItem: () => ({
                id: Math.random().toString(36).substr(2, 9),
              }),
              fields: [
                {
                  name: "icon",
                  label: "?????? Icon",
                  component: "image",
                  uploadDir: () => "/home/roleIntroduction",
                  parse: ({ previewSrc }) => previewSrc,
                  previewSrc: (src) => src,
                },
                {
                  name: "title",
                  component: "text",
                  label: "?????? Title",
                },
                {
                  name: "caption",
                  component: "text",
                  label: "?????? Caption",
                },
                {
                  name: "remark",
                  component: "text",
                  label: "?????? Remark",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "quote",
      label: "?????? Quote",
      component: "group",
      fields: [
        {
          name: "background",
          label: "??????  Background",
          component: "image",
          uploadDir: () => "/home",
          parse: ({ previewSrc }) => previewSrc,
          previewSrc: (src) => src,
        },
        {
          name: "audience",
          component: "text",
          label: "??? To",
        },
        {
          name: "words",
          component: "blocks",
          templates: metaTextTemplates,
          label: "?????? words",
        },
        {
          name: "reference",
          component: "text",
          label: "?????? Reference",
        },
      ],
    },
  ],
});
