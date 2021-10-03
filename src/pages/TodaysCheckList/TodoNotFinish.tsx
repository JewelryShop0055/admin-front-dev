import React from "react";
import styled from "styled-components";

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

export default function TodoTemplete() {
  return (
    <TodoHeadBlock>
      <h1>고객 미수령 상품</h1>
      <div className="tasks-left">6개 남음</div>
    </TodoHeadBlock>
  );
}
