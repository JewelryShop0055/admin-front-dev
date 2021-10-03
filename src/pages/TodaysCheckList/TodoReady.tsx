// import { useTodoDispatch } from "../TodoContext";
// import reactDom from "react-dom";

// function TodoItem({ id, done, text }) {
//   const dispatch = useTodoDispatch();
//   const onToggle = () =>
//     dispatch({
//       type: "TOGGLE",
//       id,
//     });
//   const onRemove = () =>
//     dispatch({
//       type: "REMOVE",
//       id,
//     });

//   return (
//     <TodoItemBlock>
//       <CheckCircle done={done} onClick={onToggle}>
//         {done && <MdDone />}
//       </CheckCircle>
//       <Text done={done}>{text}</Text>
//       <Remove onClick={onRemove}>
//         <MdDelete />
//       </Remove>
//     </TodoItemBlock>
//   );
// }
//기 주석 처리

import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";

const Remove = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
`;
const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid gray;
  font-size: 24px; //여기서는 아이콘의 크기를 의미한다
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;
const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
`;
const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;

  &:hover {
    ${Remove} {
      opacity: 1;
    }
  }
`;

function TodoItem() {
  return (
    <>
      <TodoItemBlock>
        <CheckCircle>
          <MdDone />
          체크마크
        </CheckCircle>
        <Text>실제내용올곳</Text>
        <Remove>
          <MdDelete />
        </Remove>
      </TodoItemBlock>
    </>
  );
}

//========================================

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  display: flex;

  h1 {
    flex-wrap: 1;
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .tasks-left {
    color: #f18926;
    font-size: 18px;
    margin-left: auto;
    margin-top: 25px;
    font-weight: bold;
  }
`;

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;
export default function TodoReady() {
  return (
    <>
      <TodoHeadBlock>
        <h1>제품 발주준비</h1>
        <div className="tasks-left">4개 남음</div>
      </TodoHeadBlock>
      <TodoListBlock>
        <TodoItem />
      </TodoListBlock>
    </>
  );
}
