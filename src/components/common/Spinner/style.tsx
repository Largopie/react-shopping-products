import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const pulse = keyframes`
  0%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const SpinnerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 1.25rem;
  width: 1.25rem;
`;

export const SpinnerDot = styled.div<{ $isInCart: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;

  &::before {
    content: '';
    height: 20%;
    width: 20%;
    border-radius: 50%;
    background-color: ${(props) =>
      props.$isInCart ? props.theme.color.darkBlack : props.theme.color.white};
    transform: scale(0);
    opacity: 0.5;
    animation: ${pulse} calc(0.9s * 1.111) ease-in-out infinite;
    box-shadow: 0 0 20px rgba(18, 31, 53, 0.3);
  }

  &:nth-of-type(2) {
    transform: rotate(45deg);
  }

  &:nth-of-type(2)::before {
    animation-delay: calc(0.9s * -0.875);
  }

  &:nth-of-type(3) {
    transform: rotate(90deg);
  }

  &:nth-of-type(3)::before {
    animation-delay: calc(0.9s * -0.75);
  }

  &:nth-of-type(4) {
    transform: rotate(135deg);
  }

  &:nth-of-type(4)::before {
    animation-delay: calc(0.9s * -0.625);
  }

  &:nth-of-type(5) {
    transform: rotate(180deg);
  }

  &:nth-of-type(5)::before {
    animation-delay: calc(0.9s * -0.5);
  }

  &:nth-of-type(6) {
    transform: rotate(225deg);
  }

  &:nth-of-type(6)::before {
    animation-delay: calc(0.9s * -0.375);
  }

  &:nth-of-type(7) {
    transform: rotate(270deg);
  }

  &:nth-of-type(7)::before {
    animation-delay: calc(0.9s * -0.25);
  }

  &:nth-of-type(8) {
    transform: rotate(315deg);
  }

  &:nth-of-type(8)::before {
    animation-delay: calc(0.9s * -0.125);
  }
`;