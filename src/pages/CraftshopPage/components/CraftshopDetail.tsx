import { Craftshop } from "../../../types";

interface CraftshopDetailProps {
  selectedCraftshop: Craftshop | undefined;
}

export default function CraftshopDetail({
  selectedCraftshop,
}: CraftshopDetailProps) {
  console.log(selectedCraftshop);
  return (
    <div>
      <div>
        공방상세정보
        <button>수정</button>
        <button>삭제</button>
      </div>
      <div>공방명</div>
      {selectedCraftshop === undefined ? (
        <div>선택된 공방이 없습니다</div>
      ) : (
        <div>{selectedCraftshop.name}</div>
      )}
    </div>
  );
}
