import { Button, Box, Image, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { getConfiguration } from "../../../../../utils/configuration/getConfiguration";
import { getPage } from "../../../../../utils/page/getPage";
import withPageCMS from "../../../../../utils/page/withPageCMS";

const PAGE_KEY = "organization_company_pending";

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
      setting: await getConfiguration({ key: "setting", lang: context.locale }),
      navigation: await getConfiguration({
        key: "navigation",
        lang: context.locale,
      }),
      lang: context.locale,
    },
  };
};
const OrganizationCompanyPending = ({page}) => {


  
  return (
    <VStack py={36}>
      <Text mt={10}>{page?.content?.step?.title}</Text>
      <Box
        justifyContent="center"
        width="100%"
        marginTop="10px !important"
      >
        <Box
          maxWidth={600}
          width="100%"
          textAlign="left"
          margin="auto"
          padding="25px"
        >
          <Heading as="h4" textAlign="center">
            {page?.content?.heading?.title}
          </Heading>

          <Image
            height="150px"
            width="150px"
            marginTop="30px !important"
            margin="auto"
            src={page?.content?.companySuccess?.image} />

            <Text marginTop="30px">
              {page?.content?.companySuccess?.description}
            </Text>

            <Box 
              width="100%" 
              textAlign="center"
            >
              <Link href="/">
                <Button
                color="#1E1E1E"
                boxSizing="border-box"
                height="46px"
                width= "114px"
                border="2px solid #C6C6C6"
                borderRadius="22px"
                marginTop="30px !important"
                borderRadius="50px"
                bgColor="primary.400"


                >
                  {page?.content?.companySuccess?.button}
                </Button>
              </Link>
            </Box>
            
            <Text
              marginTop="35px"
              fontWeight={600}
              textAlign="center"
              fontSize="16px"
            >
              {page?.content?.footer?.email}
            </Text>
            <Text
              marginTop="30px"
              textAlign="center"
            >
              {page?.content?.footer?.drop}
            </Text>
        </Box>
      </Box>
    </VStack>
  );
};

export default withPageCMS(OrganizationCompanyPending, { 
  key: PAGE_KEY,
  fields: [
    {
      name: "step",
      label: "?????? step",
      component: "group",
      fields: [
        {
          name: "title",
          label: "????????? Title",
          component: "text",
        }
      ],
    },
    {
      name: "heading",
      label: "?????? Heading",
      component: "group",
      fields: [
        {
          name: "title",
          label: "????????? Title",
          component: "text",
        },
      ],
    },
    {
      name: "companySuccess",
      label: "?????? ?????? Company Success",
      component: "group",
      fields: [
        {
          label: "?????? Image",
          name: "image",
          component: "image",
          uploadDir: () => "/identity",
          parse: ({ previewSrc }) => previewSrc,
          previewSrc: (src) => src,
        },
        {
          name: "description",
          label: "?????? description",
          component: "text",
        },
        {
          name: "button",
          label: "?????? button text",
          component: "text",
        },

      ],
    },
    {
      name: "footer",
      label: "?????? Footer",
      component: "group",
      fields: [
        {
          name: "email",
          label: "???????????? Email",
          component: "text",
        },
        {
          name: "drop",
          label: "?????? Drop",
          component: "text",
        },
      ],
    },
  ]
});
