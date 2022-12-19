import { Container } from "./styles";
import Form from 'react-bootstrap/Form';

export const Select = (props) => {
  return (
    <Container>
      <Form.Group className="mb-3" controlId="select">
        <Form.Label>Selecione:</Form.Label>
        <Form.Select
          onChange={(e) => props.setCount(e.target.value)}
        >
          <option value="count">Por data selecionada</option>
          <option value="cumulative">Pelo acumulado até a data selecionada</option>
        </Form.Select>
      </Form.Group>
    </Container>
  );
};