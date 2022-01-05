import { Craftshop } from "../../../types";

interface CraftshopDetailProps {
  craftshopValue: Craftshop | undefined;
}

export default function CraftshopDetail({
  craftshopValue,
}: CraftshopDetailProps) {
  console.log(craftshopValue);
  return (
    <div>
      <div>
        공방상세정보
        <button>수정</button>
        <button>삭제</button>
      </div>
      <div>공방명</div>
      {craftshopValue === undefined ? (
        <div>선택된 공방이 없습니다</div>
      ) : (
        <div>{craftshopValue.name}</div>
      )}
    </div>
  );
}
