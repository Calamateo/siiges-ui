import React, { useContext, useState } from 'react';
import router from 'next/router';
import { Grid } from '@mui/material';
import {
  ButtonsForm, Context, Input, Select,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import userRolOptions from '../utils/userRolOptions';

export default function EditUserForm({ user }) {
  const { persona, rol } = user.data;
  const { session } = useContext(Context);
  const [userRol, setUserrol] = useState([]);
  const [form, setForm] = useState({});
  const [error, setError] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (
      name === 'nombre'
      || name === 'apellidoPaterno'
      || name === 'apellidoMaterno'
    ) {
      setForm({ ...form, persona: { ...form.persona, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    if (form.persona !== undefined) {
      if (name === 'nombre') {
        if (form.persona.nombre === undefined || form.persona.nombre === '') {
          setError({ ...error, nombre: 'Nombre invalido' });
        } else {
          setError({ ...error, nombre: '' });
        }
      }

      if (name === 'apellidoPaterno') {
        if (
          form.persona.apellidoPaterno === undefined
          || form.persona.apellidoPaterno === ''
        ) {
          setError({ ...error, apellidoPaterno: 'Apellido paterno invalido' });
        } else {
          setError({ ...error, apellidoPaterno: '' });
        }
      }

      if (name === 'apellidoMaterno') {
        if (
          form.persona.apellidoMaterno === undefined
          || form.persona.apellidoMaterno === ''
        ) {
          setError({ ...error, apellidoMaterno: 'Apellido materno invalido' });
        } else {
          setError({ ...error, apellidoMaterno: '' });
        }
      }
    }

    if (name === 'titulo_cargo') {
      if (form.titulo_cargo === undefined || form.titulo_cargo === '') {
        setError({ ...error, titulo_cargo: 'Cargo invalido' });
      } else {
        setError({ ...error, titulo_cargo: '' });
      }
    }

    if (name === 'correo') {
      if (form.correo === undefined || form.correo === '') {
        setError({ ...error, correo: 'Correo invalido' });
      } else {
        setError({ ...error, correo: '' });
      }
    }
  };

  function submit() {
    if (Object.values(error).every((x) => x === null || x === '')) {
      fetch(`http://localhost:3000/api/v1/usuarios/${session.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
  }

  userRolOptions(setUserrol);

  return (
    <Grid item sx={{ ml: 15 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Input
            label="Nombre(s)"
            id="nombre"
            name="nombre"
            auto="nombre"
            value={persona.nombre}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.nombre}
            class="data"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            label="Primer Apellido"
            id="apellidoPaterno"
            name="apellidoPaterno"
            auto="apellidoPaterno"
            value={persona.apellidoPaterno}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.apellidoPaterno}
            class="data"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            label="Segundo Apellido"
            id="apellidoMaterno"
            name="apellidoMaterno"
            auto="apellidoMaterno"
            value={persona.apellidoMaterno}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.apellidoMaterno}
            class="data"
          />
        </Grid>
        <Grid item xs={3}>
          <Select
            title="Rol"
            options={userRol}
            value={rol.id}
            name="rolId"
            onchange={handleOnChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input
            label="Cargo"
            id="titulo_cargo"
            name="titulo_cargo"
            auto="titulo_cargo"
            value="Cargo"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.titulo_cargo}
            class="data"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Correo Electronico"
            id="correo"
            name="correo"
            auto="correo"
            value={user.data.correo}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.correo}
            class="data"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Input
            label="Usuario"
            id="usuario"
            name="usuario"
            auto="usuario"
            value={user.data.usuario}
            onchange={handleOnChange}
            class="data"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            label="Contraseña"
            id="contrasena"
            name="contrasena"
            auto="contrasena"
            value={user.data.contrasena}
            onchange={handleOnChange}
            class="data"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            label="Repetir contraseña"
            id="repeatContrasena"
            name="repeatContrasena"
            auto="repeatContrasena"
            value={user.data.contrasena}
            onchange={handleOnChange}
            class="data"
          />
        </Grid>
      </Grid>
      <ButtonsForm cancel={() => router.back()} confirm={() => submit()} />
    </Grid>
  );
}

EditUserForm.propTypes = {
  user: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      nombre: PropTypes.string,
      correo: PropTypes.string,
      usuario: PropTypes.string,
      contrasena: PropTypes.string,
      persona: PropTypes.shape({
        id: PropTypes.number,
        nombre: PropTypes.string,
        apellidoPaterno: PropTypes.string,
        apellidoMaterno: PropTypes.string,
      }),
      rol: PropTypes.shape({ id: PropTypes.number }),
    }),
  ).isRequired,
};
