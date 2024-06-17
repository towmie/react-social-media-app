import styled from "styled-components";

const FormRowStyled = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
`;
const Label = styled.label`
  font-weight: 500;
`;
const Error = styled.span`
  font-size: 0.75rem;
  color: var(--color-red-700);
`;

type FormRowProps = {
  error?: string;
  label?: string;
  children: React.ReactElement | React.ReactNode;
};

function FormRow({ error, label, children }: FormRowProps) {
  return (
    <FormRowStyled>
      {label && <Label htmlFor={children?.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </FormRowStyled>
  );
}

export default FormRow;
