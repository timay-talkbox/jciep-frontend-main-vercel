import { useRouter } from "next/router";
import { getConfiguration } from "../../utils/configuration/getConfiguration";
import { getPage } from "../../utils/page/getPage";
import withPageCMS from "../../utils/page/withPageCMS";
import pwdFieldsForCMS from "../../utils/tina/pwdFieldsForCMS";

const PAGE_KEY = "pwd";

export const getServerSideProps = async (context) => {
  return {
    props: {
      page: await getPage({ key: PAGE_KEY, lang: context.locale }),
      header: await getConfiguration({ key: "header", lang: context.locale }),
      footer: await getConfiguration({ key: "footer", lang: context.locale }),
      navigation: await getConfiguration({
        key: "navigation",
        lang: context.locale,
      }),
    },
  };
};

const PwdMain = ({ page }) => {
  const router = useRouter();

  return <>{JSON.stringify(page)}</>;
};

export default withPageCMS(PwdMain, {
  key: PAGE_KEY,
  fields: pwdFieldsForCMS,
});
