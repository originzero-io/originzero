import React from "react";
import logo from "../../assets/images/logo.png";
import styled from "styled-components";

const Img = styled.img`
  &:hover {
    transform: scale(1.1);
  }
`;

export default function CompanyLogo({ size }) {
  return <Img src={logo} width={size} height={size} />;
}
