import styled from 'styled-components';

//TODO: Add colors and hover styles to buttons
export const Button = styled.button.attrs((props) => ({
  type: 'button'
}))`
  border: ${(props) => (props.noBorder ? 'none' : 'auto')};
  cursor: pointer;
`;

export const FormLabel = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
