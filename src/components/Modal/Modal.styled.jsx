import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalContent = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-size: 24px;
  width: 100%;
  min-width: 300px;
  margin-top: 5px;
  transition: all 0.4s ease-in-out;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #444;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease-in-out;
  width: 48%;

  &:hover {
    background-color: #333;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const EditWrap = styled.div`
width: 350px;

`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;
