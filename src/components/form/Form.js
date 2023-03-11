import * as React from "react";
import * as MU from "@mui/material";

import { useNavigate } from "react-router-dom";

function Form() {
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    price: "",
    avaliable: true,
  });

  const [formErr, setFormErr] = React.useState({});

  const [isSubmit, setIsSubmit] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErr(validate(formData));
    setIsSubmit(true);
  };

  const handlePrice = (price) => {
    var p = price.replace(",", ".");
    return parseFloat(p);
  };

  React.useEffect(() => {
    if (Object.keys(formErr).length === 0 && isSubmit) {
      const items = JSON.parse(localStorage.getItem("items"));
      var items2 = [];

      if (items) {
        items2 = items;
      }

      items2.push({ ...formData, price: handlePrice(formData.price) });

      localStorage.setItem("items", JSON.stringify(items2));
      navigate("/list", { state: { formData: formData } });
    }
  }, [formErr]);

  const validate = (values) => {
    const errors = {};
    const regexString = /[a-zA-Z]/i;
    const regexNumbers = /^[0-9]+/i;

    if (!values.name) {
      errors.name = "Nome do produto é obrigatório!";
    } else if (!regexString.test(values.name)) {
      errors.name = "O nome deve conter letras!";
    }
    if (!values.description) {
      errors.description = "Descrição do produto é obrigatória!";
    }
    if (!values.price) {
      errors.price = "Preço do produto é obrigatório!";
    } else if (!regexNumbers.test(values.price)) {
      errors.price = "Preço inválido!";
    }

    return errors;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckBoxChange = () => {
    setFormData({ ...formData, avaliable: !formData.avaliable });
  };

  return (
    <MU.Stack gap={1}>
      <MU.TextField
        fullWidth
        name="name"
        label="Nome do produto"
        variant="standard"
        value={formData.name}
        onChange={handleFormChange}
        error={formErr.name ? true : false}
        helperText={formErr.name || " "}
      />
      <MU.TextField
        fullWidth
        name="description"
        label="Descrição do produto"
        variant="standard"
        value={formData.description}
        onChange={handleFormChange}
        error={formErr.description ? true : false}
        helperText={formErr.description || " "}
      />

      <MU.FormControl fullWidth variant="standard">
        <MU.InputLabel>Valor do Produto</MU.InputLabel>
        <MU.Input
          name="price"
          defaultValue={formData.price}
          onChange={handleFormChange}
          error={formErr.price ? true : false}
          startAdornment={
            <MU.InputAdornment position="start">R$</MU.InputAdornment>
          }
        />
        <MU.FormHelperText error={formErr.price ? true : false}>
          {formErr.price || " "}
        </MU.FormHelperText>
      </MU.FormControl>
      <MU.FormGroup>
        <MU.FormControlLabel
          name="avaliable"
          control={<MU.Checkbox defaultChecked />}
          label="Disponível para venda"
          value={formData.avaliable}
          onChange={handleCheckBoxChange}
        />
      </MU.FormGroup>
      <MU.Button
        style={{ marginTop: "48px" }}
        fullWidth
        variant="outlined"
        onClick={handleSubmit}
      >
        Cadastrar
      </MU.Button>
    </MU.Stack>
  );
}

export default Form;
