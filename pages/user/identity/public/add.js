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
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { getConfiguration } from "../../../../utils/configuration/getConfiguration";
import { getPage } from "../../../../utils/page/getPage";
import withPageCMS from "../../../../utils/page/withPageCMS";
import { useRouter } from "next/router";

const PAGE_KEY = "identity_public_add";

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

const IdentityPublicAdd = ({page}) => {
  const router = useRouter()
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors, isSubmitting },
  } = useForm();


  const onFormSubmit = useCallback(async ({ chinese_name, english_name, date_of_birth , gender, resident_district,  industry , terms  }) => {
    try {
      console.log(chinese_name)
      console.log(english_name)
      console.log(date_of_birth)
      console.log(gender)
      console.log(resident_district)
      console.log(industry)
      console.log(terms)

      router.push("/" + page.lang + "/user/organization/ngo/add")

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
          <Text fontSize="16px" textAlign="center">
            {page?.content?.heading?.description}
          </Text>
          <VStack as="form" onSubmit={handleSubmit(onFormSubmit)}>

            <SimpleGrid pt={16} columns={[1, 2, 2, 2]} spacing={4} width="100%">
              <GridItem >
                <FormControl>
            
                  <FormLabel>
                    {page?.content?.form?.chineseName}
                  </FormLabel>
                  <Input type="text" placeholder="" {...register("chinese_name")} />
                  <FormHelperText>{errors?.chinese_name?.message}</FormHelperText>

                </FormControl>
              </GridItem>
              <GridItem >
                <FormControl>
                  <FormLabel>
                  {page?.content?.form?.englishName}
                  </FormLabel>
                  <Input type="text" placeholder="" {...register("english_name")} />
                  <FormHelperText>{errors?.english_name?.message}</FormHelperText>

                </FormControl>
              </GridItem>
              <GridItem >
                <FormControl>
                  <FormLabel>{page?.content?.form?.dob}</FormLabel>
                  <Input type="date" placeholder="" {...register("date_of_birth")} />
                  <FormHelperText>{errors?.date_of_birth?.message}</FormHelperText>

                </FormControl>
              </GridItem>
              <GridItem >
                <FormControl>
                  <FormLabel>{page?.content?.form?.gender?.label}</FormLabel>
                  <Select  {...register("gender")} >
                    {page?.content?.form?.gender?.options?.map((option) => {
                      return <option value={option.value}>{option.label}</option>
                    })
                    }
                  </Select>
                  <FormHelperText>{errors?.gender?.message}</FormHelperText>

                </FormControl>
              </GridItem>

              <GridItem >
                <FormControl>
                  <FormLabel>{page?.content?.form?.residentRestrict?.label}</FormLabel>
                  <Select  {...register("resident_district")} >
                    {page?.content?.form?.residentRestrict?.options?.map((option) => {
                      return <option value={option.value}>{option.label}</option>
                    })
                    }
                  </Select>
                  <FormHelperText>{errors?.resident_district?.message}</FormHelperText>
                </FormControl>
              </GridItem>

              <GridItem >
                <FormControl>
                  <FormLabel>{page?.content?.form?.industry?.label}</FormLabel>
                  <Select  {...register("industry")} >
                     {page?.content?.form?.industry?.options?.map((option) => {
                        return <option value={option.value}>{option.label}</option>
                      })
                      }
                  </Select>
                  <FormHelperText>{errors?.industry?.message}</FormHelperText>

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

export default withPageCMS(IdentityPublicAdd, { 
  key: PAGE_KEY ,
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
      name: "heading",
      label: "?????? Heading",
      component: "group",
      fields: [
        {
          name: "description",
          label: "?????? Description",
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
          name: "chineseName",
          label: "????????? Chinese Name Label",
          component: "text",
        },
        {
          name: "englishName",
          label: "????????? English Name Label",
          component: "text",
        },
        {
          name: "dob",
          label: "???????????? Date of Birth ",
          component: "text",
        },
        {
          name: "gender",
          label: "?????? Gender Label",
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
          name: "residentRestrict",
          label: "????????? Resident District " ,
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
          name: "industry",
          label: "??????/?????? Industry/Job ",
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
