import React from 'react';
import styled from 'styled-components';

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
`;

export default function ErrorIndicator(props) {
  const { children } = props;

  if (!children || children.length === 0) {
    return null;
  } else {
    return <ErrorText>{children}</ErrorText>;
  }
}
