// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import * as Yup from 'yup';
import { Form, TextField, SelectField, SubmitButton } from './FormElements';

const formSchema = {
  name: {
    type: "text",
    label: "Name",
    required: true
  },
  email: {
    type: "email",
    label: "Email",
    required: true
  },
  role: {
    type: "select",
    label: "Role",
    required: true,
    options: [
      {
        label: "Admin",
        value: "admin"
      },
      {
        label: "User",
        value: "user"
      }
    ]
  }
}

function App() {

  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  useEffect(() => {
    initForm(formSchema);
  }, []);

  const initForm = (formSchema) => {
    let _formData = {};
    let _validationSchema = {};

    for (var key of Object.keys(formSchema)) {
      _formData[key] = "";

      if (formSchema[key].type === "text") {
        _validationSchema[key] = Yup.string();
      } else if (formSchema[key].type === "email") {
        _validationSchema[key] = Yup.string().email()
      } else if (formSchema[key].type === "select") {
        _validationSchema[key] = Yup.string().oneOf(formSchema[key].options.map(o => o.value));
      }

      if (formSchema[key].required) {
        _validationSchema[key] = _validationSchema[key].required('Required');
      }
    }

    setFormData(_formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  }

  const getFormElement = (elementName, elementSchema) => {
    const props = {
      name: elementName,
      label: elementSchema.label,
      options: elementSchema.options
    };

    if (elementSchema.type === "text" || elementSchema.type === "email") {
      return <TextField {...props} />
    }

    if (elementSchema.type === "select") {
      return <SelectField  {...props} />
    }

  }

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    console.log(values);
    setSubmitting(false);
  }

  return (
    <div className="App">
      <Form
        enableReinitialize
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >

        {Object.keys(formSchema).map((key, ind) => (
          <div key={key}>
            {getFormElement(key, formSchema[key])}
          </div>
        ))}

      </Form>
    </div>
  );
}

export default App;