import { InputNumber } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';

export default function Numerico({ setForm, pregunta, id }) {
  const handleChange = (e) => {
    const questionData = {
      inspeccionId: id,
      inspeccionPreguntaId: pregunta.id,
      respuesta: e.target.value,
    };
    setForm((prevForm) => {
      const existingQuestionIndex = prevForm.findIndex(
        (item) => item.inspeccionPreguntaId === pregunta.id,
      );

      if (existingQuestionIndex !== -1) {
      // Si la pregunta ya existe en el array, actualiza su respuesta
        return prevForm
          .map((item, index) => (index === existingQuestionIndex ? questionData : item));
      }
      // Si la pregunta no existe en el array, añádela
      return [...prevForm, questionData];
    });
  };

  return (
    <InputNumber
      id={pregunta.pregunta}
      name={pregunta.pregunta}
      auto={pregunta.pregunta}
      label=""
      onchange={handleChange}
      sx={{ marginTop: 0 }}
    />
  );
}

Numerico.propTypes = {
  setForm: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  pregunta: PropTypes.shape({
    pregunta: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
