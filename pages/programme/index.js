import { Box, VStack, Grid, GridItem, SimpleGrid } from "@chakra-ui/layout";
import withPageCMS from "../../utils/page/withPageCMS";
import { getPage } from "../../utils/page/getPage";
import { NextSeo } from "next-seo";
import {
  HStack,
  chakra,
  Heading,
  Text,
  Image,
  Icon,
  Accordion,
  Button,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from "@chakra-ui/react";
import Container from "../../components/Container";
import { getConfiguration } from "../../utils/configuration/getConfiguration";
import metaTextTemplates from "../../utils/tina/metaTextTemplates";
import programmeFieldsForCMS from "../../utils/tina/programmeFieldsForCMS";
import Accordian from "../../components/Acordian";
import NextLink from "next/link";
import MultiTextRenderer from "./../../components/MultiTextRenderer";
import { AiOutlinePlus } from "react-icons/ai";

const PAGE_KEY = "programme";

const Iframe = chakra("iframe");

export const getServerSideProps = async (context) => {
  return {
    props: {
      page:
        (await getPage({ key: PAGE_KEY, lang: context.locale })) ??
        (await getPage({ key: PAGE_KEY, lang: "zh" })),
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

const Programme = ({ page }) => {
  return (
    <VStack overflowY="visible" w="100%" spacing={0} align="stretch">
      {page?.content?.seo?.title && (
        <NextSeo
          title={page?.content?.seo?.title}
          description={page?.content?.seo?.description}
        ></NextSeo>
      )}

      {/* Banner Section */}
      <Box
        h="calc(50vw - 40px)"
        w="100%"
        position="relative"
        overflowY="visible"
        backgroundImage={`url(${page?.content?.heroBannerSection?.image})`}
        backgroundSize="cover"
        backgroundPosition={["", "", "center"]}
        display="flex"
        flexDirection="column"
        alignItems="center"
        zIndex="-1"
      >
        <Box
          position="absolute"
          maxW="80%"
          left={["25%", "25%", "18%"]}
          bottom={["30%", "40%", "40%"]}
        >
          <Text
            w="max"
            maxW="80%"
            fontWeight="semibold"
            fontSize={["12px", "16px", "24px", "56px"]}
            bg={page?.content?.heroBannerSection?.titleBgColor}
            color="black"
            display="inline"
          >
            {page?.content?.heroBannerSection["title ??????"]}
          </Text>
        </Box>
        <Image
          position="absolute"
          bottom="-1px"
          src={page?.content?.heroBannerSection?.bgImageBottom}
          width="100%"
          fit="contain"
        />
      </Box>

      {/* Vision Section */}
      <Box bg={page?.content?.visionSection?.bgColor} w="100%">
        <Container py={24}>
          <VStack align="center" w="100%">
            <Text
              fontSize="4xl"
              textAlign="center"
              fontWeight="bold"
              backgroundImage="linear-gradient(#fff, #fff)"
              backgroundRepeat="no-repeat"
              backgroundPosition="0 0.7em"
            >
              {page?.content?.visionSection?.title}
            </Text>
            {(page?.content?.visionSection?.sections ?? []).map(
              ({ title, description, id }, index) => {
                return (
                  <VStack pt={16} key={id}>
                    <Box position="relative" mx={["47px", "47px", "0px"]}>
                      <Text fontWeight="bold" fontSize="xl" textAlign="center">
                        {page?.content?.partnerSection?.planSection?.title}
                      </Text>
                      <Box
                        width="6.15px"
                        height="27.69px"
                        borderRadius="5px"
                        pos="absolute"
                        right={["-6", "-6", "-12"]}
                        bottom="-3"
                        background="#fff"
                        transform="rotate(30deg)"
                      />
                      <Box
                        width="6.15px"
                        height="27.69px"
                        borderRadius="5px"
                        pos="absolute"
                        left={["-6", "-6", "-12"]}
                        bottom="-3"
                        background="#fff"
                        transform="rotate(-30deg)"
                      />
                    </Box>
                    <Box pt={8} px="16px">
                      <MultiTextRenderer
                        fontSize={["lg", "xl", "xl"]}
                        data={description}
                        textAlign="center"
                        text
                      />
                    </Box>
                  </VStack>
                );
              }
            )}

            {page?.content?.visionSection?.videoLink && (
              <Iframe
                pt={16}
                w={800}
                h={480}
                src={page?.content?.visionSection?.videoLink}
                title="PWD Video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            )}
          </VStack>
        </Container>
      </Box>
      <Box>
        <Container>
          <VStack align="center" spacing={0} py={16}>
            <Box pt={8}>
              <MultiTextRenderer
                data={page?.content?.visionSection?.detail}
                fontSize={["lg", "xl", "xl"]}
                textAlign="center"
                text
              />
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Partner Section */}
      <Box bg="#FAFAFA">
        <Box
          backgroundImage={`url(${page?.content?.partnerSection?.bgImageMain})`}
          backgroundSize="contain"
          backgroundRepeat="no-repeat"
          w="100%"
          position="relative"
        >
          <Container>
            <VStack
              spacing={0}
              pt={["36px", "36px", "53px"]}
              textAlign="center"
            >
              <Box>
                <chakra.span
                  fontSize={["22px", "30px", "36px"]}
                  textAlign="center"
                  fontWeight="semibold"
                  pos="relative"
                  lineHeight={2}
                  backgroundImage="linear-gradient(#F6D644, #F6D644)"
                  backgroundRepeat="no-repeat"
                  backgroundPosition="0 0.7em"
                  pl="15px"
                  pr="15px"
                  pb="10px"
                >
                  {page?.content?.partnerSection?.title}
                </chakra.span>
              </Box>

              <Text zIndex="2">
                {page?.content?.partnerSection?.description}
              </Text>
            </VStack>
            <SimpleGrid
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              columns={[1, 1, 2, 3]}
              mt={8}
              spacing={24}
            >
              {(page?.content?.partnerSection?.partners ?? []).map(
                ({ id, agencyName, projectName, contact, slug }) => (
                  <NextLink href={`/programme/partner/${slug}`}>
                    <VStack>
                      <GridItem
                        as={VStack}
                        borderWidth={1}
                        bg="#FAFAFA"
                        w={["80%", "80%", "100%"]}
                        _hover={{
                          boxShadow: "lg",
                          bg: "white",
                          opacity: 1,
                        }}
                        cursor="pointer"
                        borderRadius={16}
                        key={id}
                        py={5}
                        px={5}
                        h={["250px", "320px"]}
                        textAlign="left"
                        align="left"
                        zIndex="10"
                      >
                        <Text fontWeight="bold" fontSize="xl">
                          {agencyName}
                        </Text>
                        <Text fontSize="lg">{projectName}</Text>
                        <Box flex={1} minH="max-content" h="100%" />
                        <Image w={["75%"]} src={contact?.logo}></Image>
                      </GridItem>
                    </VStack>
                  </NextLink>
                )
              )}
            </SimpleGrid>
          </Container>

          <Image
            pos="absolute"
            zIndex="1"
            src={page?.content?.partnerSection?.bgImageLeft}
            top={["100px", "100px", "72px"]}
            left={["2%", "5%", "10%"]}
            h={["100px", "150px", "220px"]}
            w={["100px", "150px", "220px"]}
          />
          <Box
            pt={["20%", "20%", "0"]}
            pos="relative"
            pb={["124px", "124px", "380px"]}
          >
            <Image
              pos="absolute"
              right={["50px", "50px", "105px"]}
              bottom={["15%"]}
              h={["175px", "175px", "279px"]}
              width={["129px", "129px", "205px"]}
              src={page?.content?.partnerSection?.bgImageRight}
              zIndex="1"
            />
            <Image
              pos="absolute"
              right="0px"
              bottom="0"
              width="100%"
              objectFit="contain"
              src={page?.content?.partnerSection?.bgImageBottom}
              zIndex="0"
            />
          </Box>
        </Box>
      </Box>
      {/* Reference Section */}
      <Box
        bg={page?.content?.referenceSection?.bgStyle?.bgColor}
        w="100%"
        pt="36px"
        overflow="hidden"
        position="relative"
        mt="0"
      >
        <VStack>
          <Box px="16px">
            <chakra.span
              fontSize={["22px", "30px", "36px"]}
              textAlign="center"
              fontWeight="semibold"
              pos="relative"
              lineHeight={2}
              backgroundImage="linear-gradient(#F6D644, #F6D644)"
              backgroundRepeat="no-repeat"
              backgroundPosition="0 0.7em"
              pl="15px"
              pr="15px"
              pb="10px"
            >
              {page?.content?.referenceSection?.title}
            </chakra.span>
          </Box>
        </VStack>
        <Container>
          <SimpleGrid
            columns={[1, 1, 2, 2]}
            gap="36px"
            mt={["36px", "56px"]}
            justifyContent="center"
          >
            {(page?.content?.referenceSection?.references ?? []).map(
              ({ categoryName, icon, items }, index) => {
                return (
                  <GridItem>
                    <VStack
                      w="100%"
                      spacing={0}
                      align="stretch"
                      alignItems={["center", "center", "start", "start"]}
                    >
                      <Image
                        w={["130px", "120px", "110px", "100px"]}
                        src={icon}
                      />
                      <Heading
                        as="h4"
                        fontSize={["20px", "24px", ""]}
                        fontWeight="normal"
                      >
                        {categoryName}
                      </Heading>
                      <Accordion w="100%" pt={8} as={VStack} align="stretch">
                        {(items ?? []).map(
                          ({ id, title, description, links }) => {
                            return (
                              <AccordionItem key={id} border={0} bg="gray.50">
                                <AccordionButton>
                                  <HStack w="100%">
                                    <Text
                                      flex={1}
                                      minW={0}
                                      w="100%"
                                      lineHeight={2}
                                      fontWeight="bold"
                                    >
                                      {title}
                                    </Text>
                                    <Icon as={AiOutlinePlus} fontSize="2xl" />
                                  </HStack>
                                </AccordionButton>
                                <AccordionPanel px={8} color="gray.200">
                                  <MultiTextRenderer data={description} />
                                  <VStack spacing={1} mt={8} align="start">
                                    {(links ?? []).map(({ id, label, url }) => {
                                      return (
                                        <NextLink
                                          key={id}
                                          href="url"
                                          target="blank"
                                        >
                                          <Button
                                            variant="link"
                                            color="#007878"
                                          >
                                            {label}
                                          </Button>
                                        </NextLink>
                                      );
                                    })}
                                  </VStack>
                                </AccordionPanel>
                              </AccordionItem>
                            );
                          }
                        )}
                      </Accordion>
                    </VStack>{" "}
                  </GridItem>
                );
              }
            )}
          </SimpleGrid>
        </Container>
        <Image
          pos="absolute"
          src={page?.content?.referenceSection?.bgStyle?.bgGradient1}
          bottom={0}
          right={0}
        />
        <Box pos="relative" pb={["124px", "124px", "380px"]}>
          <Image
            pos="absolute"
            right={["22px", "35px", "81px"]}
            bottom="-10px"
            h="100%"
            width={["66%", "54%", "52%"]}
            src={page?.content?.referenceSection?.bgStyle?.bottomImage}
            zIndex="1"
          />
          <Image
            pos="absolute"
            right="0px"
            bottom="0"
            width="100%"
            objectFit="contain"
            src={page?.content?.referenceSection?.bgStyle?.bottomBorder}
            zIndex="0"
          />
        </Box>
      </Box>
    </VStack>
  );
};

export default withPageCMS(Programme, {
  key: PAGE_KEY,
  fields: programmeFieldsForCMS,
});
