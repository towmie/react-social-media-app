import styled, { css } from "styled-components";

interface ButtonProps {
  size?: "small" | "medium" | "large";
  variation?: "primary" | "secondary" | "danger";
  type: "button" | "submit" | "reset";
}

const sizes = {
  small: css`
    font-size: 0.8rem;
    padding: 0.4rem 1rem;

    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 0.9rem;
    padding: 0.5rem 1.2rem;

    font-weight: 500;
  `,
  large: css`
    font-size: 1rem;
    padding: 0.6rem 1.5rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.size ? props.size : sizes.medium]}
  ${(props) =>
    variations[props.variation ? props.variation : variations.primary]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
