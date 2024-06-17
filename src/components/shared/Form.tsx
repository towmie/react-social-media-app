import styled, { css } from "styled-components";
interface StyledComponentProps {
  type?: string;
}

const Form = styled.form<StyledComponentProps>`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 1rem;

      /* Box */
      /* border: 1px solid var(--color-grey-100); */
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
  width: 100%;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
