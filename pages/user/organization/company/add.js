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
  Textarea,
} from "@chakra-ui/react";
import { useCallback} from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { getConfiguration } from "../../../../utils/configuration/getConfiguration";
import { getPage } from "../../../../utils/page/getPage";
import withPageCMS from "../../../../utils/page/withPageCMS";
import Link from "next/link";


const PAGE_KEY = "organization_company_add";

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
const OrganizationCompanyAdd = ({page}) => {

  const router = useRouter()
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors, isSubmitting },
  } = useForm();


  const onFormSubmit = useCallback(async ({ chineseCompanyName,  contactNumber, terms  }) => {
    try {
      // console.log(contactPersonName)
      // console.log(contactEmailAdress)
      // console.log(contactNumber)
      // console.log(terms)

      router.push( "/" +page.lang + "/user/organization/company/1/pending")
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
        marginTop="30px !important"
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
                    {page?.content?.form?.chineseCompanyName}
                  </FormLabel>
                  <Input type="text" placeholder="" {...register("chineseCompanyName")} />
                  <FormHelperText>{errors?.chineseCompanyName?.message}</FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem >
                <FormControl>
                  <FormLabel>
                  {page?.content?.form?.englishCompanyName}
                  </FormLabel>
                  <Input type="text" placeholder="" {...register("englishCompanyName")} />
                  <FormHelperText>{errors?.englishCompanyName?.message}</FormHelperText>
                </FormControl>
              </GridItem>
              
              <GridItem >
                <FormControl>
                  <FormLabel>{page?.content?.form?.industry?.label}</FormLabel>
                  <Select  {...register("gender")} >
                    {page?.content?.form?.industry?.options?.map((option) => {
                      return <option value={option.value}>{option.label}</option>
                    })
                    }
                  </Select>
                  <FormHelperText>{errors?.industry?.message}</FormHelperText>

                </FormControl>
              </GridItem>

              <GridItem >
                <FormControl>
                  <FormLabel>
                  {page?.content?.form?.companyWebsite}
                  </FormLabel>
                  <Input type="text" placeholder="" {...register("companyWebsite")} />
                  <FormHelperText>{errors?.companyWebsite?.message}</FormHelperText>
                </FormControl>
              </GridItem>
             
            </SimpleGrid>

            <FormControl marginTop="20px !important">
              
            </FormControl>

            <FormControl marginTop="20px !important">
            <FormLabel>
                  {page?.content?.form?.companyDescription}
                  </FormLabel>
              <Textarea placeholder="" {...register("companyDescription")}></Textarea>
              <FormHelperText>{errors?.companyDescription?.message}</FormHelperText>
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

export default withPageCMS(OrganizationCompanyAdd, { 
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
          name: "chineseCompanyName",
          label: "?????????????????? Chinese Company Label",
          component: "text",
        },
        {
          name: "englishCompanyName",
          label: "?????????????????? English Company Label",
          component: "text",
        },
        
        {
          name: "industry",
          label: "?????? Industry ",
          component: "group",
          fields: [
            {
              name: "label",
              label: "?????? Label",
              component: "text",
            },
            {
              name: "options",
              label: "??????  Options",
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
                  name: "label",
                  label: "?????? Label",
                  component: "text",
                },
                {
                  name: "value",
                  label: "?????? Value",
                  component: "text",
                },
              ],
            },
          ],
        },
        {
          name: "companyWebsite",
          label: "???????????? Company Website Label",
          component: "text",
        },
        {
          name: "businessRegistration",
          label: "???????????? Business Registration ",
          component: "group",
          fields: [
            {
              name: "label",
              label: "?????? Label",
              component: "text",
            },
            {
              name: "Text",
              label: "?????? Text",
              component: "text",
            },
          ],
        },
        {
          name: "companyDescription",
          label: "?????????????????? Company Description Label",
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
