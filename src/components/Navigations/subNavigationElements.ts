interface SubNavigationElements {
  elementName: string;
  elementLink: string;
}

const ItemCategoryCrafthopManagePageSubNaviElements: Array<SubNavigationElements> =
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
    case "ItemCategoryCrafthopManage":
      return ItemCategoryCrafthopManagePageSubNaviElements;

    default:
      return ItemCategoryCrafthopManagePageSubNaviElements; //로그인 첫페이지가 올곳
  }
};

export default subNavigationElements;
