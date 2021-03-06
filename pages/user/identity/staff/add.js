import {
  Box,
  Button,
  Text,
  VStack,
  FormControl,
  Input,
  SimpleGrid,
  GridItem,
  Select,
  Checkbox,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { useCallback} from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { getConfiguration } from "../../../../utils/configuration/getConfiguration";
import { getPage } from "../../../../utils/page/getPage";
import withPageCMS from "../../../../utils/page/withPageCMS";
import Link from "next/link";

const PAGE_KEY = "identity_staff_add";

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

const IdentityStaffAdd = ({page}) => {

  const router = useRouter()
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors, isSubmitting },
  } = useForm();


  const onFormSubmit = useCallback(async ({ contactPersonName, contactEmailAdress, contactNumber, terms  }) => {
    try {
      console.log(contactPersonName)
      console.log(contactEmailAdress)
      console.log(contactNumber)
      console.log(terms)

      router.push('/'+ page.lang + '/user/organization/ngo/add');

    } catch (e) {
      console.log(e)
    }
  });



  return (
    <VStack py={36}>
     <Text mt={10}>{page?.content?.step?.title}</Text>
      <Text fontSize="30px" marginTop="5px">
        {page?.content?.step?.subTitle}
      </Text>
      <Box
        justifyContent="center"
        width="100%"
        marginTop="40px !important"
      >
        <Box
          maxWidth={800}
          width="100%"
          textAlign="left"
          margin="auto"
          padding="25px"
        >
          <VStack as="form" onSubmit={handleSubmit(onFormSubmit)}>
            <SimpleGrid columns={[1, 2, 2, 2]} spacing={4} width="100%">
              <GridItem >
                <FormControl>
                  <FormLabel>
                    {page?.content?.form?.contactPersonName}
                  </FormLabel>
                  <Input type="text" placeholder="" {...register("contactPersonName")} />
                  <FormHelperText>{errors?.contactPersonName?.message}</FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem >
                <FormControl>
                  <FormLabel>
                  {page?.content?.form?.contactEmailAdress}
                  </FormLabel>
                  <Input type="text" placeholder="" {...register("contactEmailAdress")} />
                  <FormHelperText>{errors?.contactEmailAdress?.message}</FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem >
                <FormControl>
                  <FormLabel>
                  {page?.content?.form?.contactNumber}
                  </FormLabel>
                  <Input type="text" placeholder="" {...register("contactNumber")} />
                  <FormHelperText>{errors?.contactNumber?.message}</FormHelperText>
                </FormControl>
              </GridItem>
             

            </SimpleGrid>
            <FormControl marginTop="20px !important">
              <Checkbox colorScheme="green" {...register("terms")} >
              {page?.content?.form?.terms}
              </Checkbox>
              <FormHelperText>{errors?.terms?.message}</FormHelperText>

            </FormControl>

            <FormControl
              textAlign="center"
            >
              <Button
                backgroundColor="#F6D644"
                borderRadius="22px"
                height="44px"
                width="117.93px"
                type="submit"
              >
               {page?.content?.form?.continue}
              </Button>
            </FormControl>
          </VStack>

        </Box>
      </Box>
    </VStack>
  );
};

export default withPageCMS(IdentityStaffAdd, { 
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
        },
        {
          name: "subTitle",
          label: "????????? Sub title",
          component: "text",
        },
      ],
    },
    {
      name: "form",
      label: "?????? Form",
      component: "group",
      fields: [
        {
          name: "contactPersonName",
          label: "??????????????? Contact Person Name",
          component: "text",
        },
        {
          name: "contactEmailAdress",
          label: "???????????????????????? Contact Email Address",
          component: "text",
        },
        {
          name: "contactNumber",
          label: "???????????? Contact Number",
          component: "text",
        },
        {
          name: "terms",
          label: "??????????????? T&C Label",
          component: "text",
        },
        {
          name: "continue",
          label: "???????????? Continue Label",
          component: "text",
        },
      ],
    },
  ]


});
