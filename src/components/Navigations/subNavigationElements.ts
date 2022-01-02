interface SubNavigationElements {
  elementName: string;
  elementLink: string;
}

const checkListPageSubNaviElements: Array<SubNavigationElements> = [
  {
    elementName: "오늘의 체크리스트(임시)",
    elementLink: "#",
  },
  {
    elementName: "내일의 체크리스트(임시)",
    elementLink: "#",
  },
  {
    elementName: "어제의 체크리스트(임시)",
    elementLink: "#",
  },
];

const itemCategoryCrafthopManagePageSubNaviElements: Array<SubNavigationElements> =
  [
    {
      elementName: "카테고리 리스트",
      elementLink: "/pages/ItemCategoryCrafthopManage/Category",
    },
    {
      elementName: "공방 리스트",
      elementLink: "/pages/ItemCategoryCrafthopManage/Craftshop",
    },
  ];

export const subNavigationElements = (pathName: string) => {
  const nowPage = pathName.split("/")[2];

  switch (nowPage) {
    case "TodaysChecklist":
      return checkListPageSubNaviElements;
    case "ItemCategoryCrafthopManage":
      return itemCategoryCrafthopManagePageSubNaviElements;

    default:
      return checkListPageSubNaviElements;
  }
};

export default subNavigationElements;
