// App.js

import React, { useState } from 'react';
import './App.css';
import * as Yup from 'yup';
import { Form, TextField, SelectField, SubmitButton } from './FormElements';

function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  });

  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .required('Required')
      .min(5, "Required"),
    email: Yup.string().email()
      .required('Required')
      .min(1, "Required"),
    role: Yup.string().oneOf(['admin', 'user'])
      .required('Required')
      .min(1, "Required"),
  });

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    console.log(values);
    setSubmitting(false);
  }

  return (
    <div className="App">
      <Form
        enableReinitialize
        validationSchema={FormSchema}
        initialValues={formData}
        onSubmit={onSubmit}
      >
        <div>
          <TextField
            name="name"
            label="Name"
          />
        </div>

        <div>
          <TextField
            name="email"
            label="Email"
          />
        </div>

        <div>
          <SelectField
            name="role"
            label="Role"
            options={[
              {
                label: "Admin",
                value: "admin"
              },
              {
                label: "User",
                value: "user"
              }
            ]}
          />
        </div>

        <SubmitButton
          title="Submit"
        />
      </Form>
    </div>
  );
}

export default App;