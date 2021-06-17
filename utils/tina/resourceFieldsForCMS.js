import metaTextTemplates from "./metaTextTemplates";

const textLinkWithTooltip = [
  {
    name: "text",
    component: "text",
    label: "文字 Text",
  },
  {
    name: "link",
    component: "text",
    label: "鏈結 Link",
  },
  {
    name: "description",
    component: "text",
    label: "描述 Tooltip description",
  },
];

const booleanWithTooltip = [
  {
    name: "value",
    component: "toggle",
    label: "是/否？ Yes/No?",
  },
  {
    name: "description",
    component: "text",
    label: "描述 Tooltip description",
  },
];

const textWithTooltip = [
  {
    name: "text",
    component: "text",
    label: "文字 Text",
  },
  {
    name: "description",
    component: "text",
    label: "描述 Tooltip description",
  },
];

const equipBlockFields = [
  {
    name: "content",
    label: "內容 content",
    component: "blocks",
    templates: metaTextTemplates,
  },
  {
    name: "links",
    label: "鏈結 Links",
    component: "group-list",
    itemProps: ({ id: key, label }) => ({
      key,
      label,
    }),
    defaultItem: () => ({
      id: Math.random().toString(36).substr(2, 9),
    }),
    fields: [
      {
        name: "url",
        label: "URL",
        component: "text",
      },
      {
        name: "label",
        label: "標籤 Label",
        component: "text",
      },
    ],
  },
];

export default [
  {
    name: "heroBannerSection",
    label: "頁面橫幅區塊 Hero Banner Setion",
    component: "group",
    fields: [
      {
        label: "Hero Image 圖片",
        name: "image",
        component: "image",
        uploadDir: () => "/resources",
        parse: ({ previewSrc }) => previewSrc,
        previewSrc: (src) => src,
      },
      {
        name: "title 標題",
        label: "Title",
        component: "text",
      },
    ],
  },
  {
    name: "dialogue",
    label: "對話 Dialogue Section",
    component: "group",
    fields: [
      {
        name: "tagline",
        label: "引題 Tagline",
        component: "text",
      },
      {
        name: "left",
        label: "左面的人 Person On the Left",
        component: "group",
        fields: [
          {
            name: "role",
            label: "角色 Role",
            component: "text",
          },
          {
            name: "dialogue",
            label: "對話 Dialogue",
            component: "group-list",
            itemProps: ({ id: key, name: label }) => ({
              key,
              label,
            }),
            defaultItem: () => ({
              id: Math.random().toString(36).substr(2, 9),
            }),
            description: "Assume there are only two message",
            fields: [
              {
                name: "message",
                label: "訊息 Message",
                component: "blocks",
                templates: metaTextTemplates,
              },
            ],
          },
        ],
      },
      {
        name: "right",
        label: "右面的人 Person On the Right",
        component: "group",
        fields: [
          {
            name: "role",
            label: "角色 Role",
            component: "text",
          },
          {
            name: "dialogue",
            label: "對話 Dialogue",
            component: "group-list",
            itemProps: ({ id: key, name: label }) => ({
              key,
              label,
            }),
            defaultItem: () => ({
              id: Math.random().toString(36).substr(2, 9),
            }),
            description: "Assume there are only one message",
            fields: [
              {
                name: "message",
                label: "訊息 Message",
                component: "blocks",
                templates: metaTextTemplates,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "howSection",
    label: "踏出第一步 How To Make Your First Step Section",
    component: "group",
    fields: [
      {
        name: "title 標題",
        label: "Title",
        component: "text",
      },
      {
        name: "content",
        label: "內容 content",
        component: "blocks",
        templates: metaTextTemplates,
      },
    ],
  },
  {
    name: "resourceSection",
    label: "資源列表區段 Resource Section",
    component: "group",
    fields: [
      {
        name: "title 標題",
        label: "Title",
        component: "text",
      },
      {
        name: "resources",
        label: "所有資源 Resource List",
        component: "group-list",
        itemProps: ({ id: key, name: { text: label = "" } = {} }) => ({
          key,
          label,
        }),
        defaultItem: () => ({
          id: Math.random().toString(36).substr(2, 9),
        }),
        fields: [
          {
            name: "category",
            label: "category 分類",
            component: "select",
            options: [
              { key: "gov", label: "政府主導的計劃" },
              { key: "non-gov", label: "非政府組織提供的服務" },
            ],
          },
          {
            name: "name",
            label: "計劃/服務名稱 Name",
            component: "group",
            fields: textLinkWithTooltip,
          },
          {
            name: "organization",
            label: "負責機構名稱 Organisation",
            component: "group",
            fields: textLinkWithTooltip,
          },
          {
            name: "serviceTarget",
            label: "服務對象 ServiceTarget",
            component: "group",
            fields: textWithTooltip,
          },
          {
            name: "services",
            label: "服務對象 ServiceTarget",
            component: "group-list",
            itemProps: ({ id: key, category: label }) => ({
              key,
              label,
            }),
            defaultItem: () => ({
              id: Math.random().toString(36).substr(2, 9),
            }),
            fields: [
              {
                name: "category",
                label: "分類 category ",
                component: "select",
                options: [
                  { key: "assessment", label: "工作/就業評估" },
                  { key: "matching", label: "工作配對" },
                  { key: "followUp", label: "就業後跟進" },
                  { key: "training", label: "職業訓練/就業培訓" },
                  { key: "instruction", label: "職場督導/指導" },
                  { key: "guidance", label: "為僱主和職員提供培訓/指導" },
                ],
              },

              {
                name: "description",
                component: "text",
                label: "描述 Tooltip description",
              },
            ],
          },
          {
            name: "internship",
            label: "提供實習機會 Internship",
            component: "group",
            fields: booleanWithTooltip,
          },
          {
            name: "probationOrReferral",
            label: "在職試用和/或工作轉介 On-job probation and/or job referral",
            component: "group",
            fields: booleanWithTooltip,
          },
          {
            name: "subsidy",
            label: "資助 Subsidy",
            component: "group-list",
            itemProps: ({ id: key, target: label }) => ({
              key,
              label,
            }),
            defaultItem: () => ({
              id: Math.random().toString(36).substr(2, 9),
            }),
            fields: [
              {
                name: "target",
                label: "資助對象 target",
                component: "select",
                options: [
                  { key: "employer", label: "僱主" },
                  { key: "trainee", label: "僱員/實習生/訓練生" },
                ],
              },
              {
                name: "description",
                component: "text",
                label: "描述 Tooltip description",
              },
            ],
          },
          {
            name: "remark",
            component: "textarea",
            label: "備註 Remark",
          },
        ],
      },
    ],
  },
  {
    name: "equipSection",
    label: "裝備自己 Equip Yourself Section",
    component: "group",
    fields: [
      {
        name: "left",
        label: "左方區塊 Left Block",
        component: "group",
        fields: equipBlockFields,
      },
      {
        name: "topRight",
        label: "右上區塊 Top Right Block",
        component: "group",
        fields: equipBlockFields,
      },
      {
        name: "bottomRight",
        label: "右下區塊 Bottom Right Block",
        component: "group",
        fields: equipBlockFields,
      },
    ],
  },

  {
    name: "jobOpportunitySection",
    label: "職位空缺 Job Opportunity Section",
    component: "group",
    fields: [
      {
        name: "title",
        component: "title",
        label: "標題 title",
      },
      {
        name: "description",
        component: "textarea",
        label: "描述 Remark",
      },
      {
        name: "buttons",
        label: "所有按鈕 Buttons",
        component: "group-list",
        itemProps: ({ id: key, label }) => ({
          key,
          label,
        }),
        defaultItem: () => ({
          id: Math.random().toString(36).substr(2, 9),
        }),
        fields: [
          {
            name: "label",
            component: "text",
            label: "標籤 label",
          },
          {
            name: "link",
            component: "text",
            label: "鏈結 Link",
          },
        ],
      },
    ],
  },
];
