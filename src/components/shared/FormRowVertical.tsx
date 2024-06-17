import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px 0;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 1rem;
`;

const Error = styled.span`
  font-size: 0.75rem;
  color: var(--color-red-700);
`;

type FormRowVerticalProps = {
  label?: string;
  error?: string;
  children: React.ReactElement;
};

function FormRowVertical({ label, error, children }: FormRowVerticalProps) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children?.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
