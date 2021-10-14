import styled from "styled-components";

export const LoginBlock = styled.div`
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const InputBlock = styled.div`
  border: 0.5px solid black;
  border-radius: 5px;
  width: 512px;
  height: 280px;

  padding-top: 30px;
`;

export const ButtonBlock = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;

  &:not(:first-child) {
    margin: 10px;
    padding: 20px;
  }
`;
