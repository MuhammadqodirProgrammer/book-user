"use client";

import React from "react";
import styled from "styled-components";

interface ButtonProps {
  name: string;
  icon?: React.ReactNode;
  background?: string;
  color?: string;
  border?: string;
  className?: string;
}

function Button({
  name,
  icon,
  background = "var(--color-bg)",
  color,
  border,
  className,
}: ButtonProps) {
  return (
    <ButtonStyled
      style={{
        background: background,
        color: color,
        border: border,
      }}
      onClick={() => {
        location.replace("/auth/login");
      }}
      className={className}
    >
      {icon && icon}
      {name}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 30px;
  border: 2px solid #ea8e3c;
  cursor: pointer;
  font-family: "Mulish", sans-serif;
  font-weight: 700;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background-color: #ea8e3c !important;
    color: white;
    transform: scale(0.96);
  }
`;

export default Button;
