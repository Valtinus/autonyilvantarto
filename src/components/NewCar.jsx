import React, { useState } from "react";
import "./NewCar.css";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const NewCar = (props) => {

  const validationSchema = Yup.object({
    manufacturer: Yup.string().required("Adja meg a gyártó nevét"),
    type: Yup.string().required("Adja meg az autó típusát"),
    ccm: Yup.number().required("Adja meg a motor hengerűrtartalmát"),
    color: Yup.string(),
    design: Yup.string(),
    year: Yup.date().required("Adjon meg gyártási dátumot"),
    web: Yup.string().matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Helytelen url!"
    ),
  });

  const initialValues = {
    manufacturer: "",
    type: "",
    ccm: "",
    color: "",
    design: "",
    year: "",
    web: "",
  };

  const renderError = (message) => (
    <p className="help is-danger" style={{ color: "red", fontWeight: "bold" }}>
      {message}
    </p>
  );

  const onSubmit = (values) => {

    const form_data = {
      id: Math.floor(Math.random() * 1000000),
      manufacturer: values.manufacturer,
      type: values.type,
      ccm: values.ccm,
      color: values.color,
      design: values.design,
      year: parseInt((new Date(values.year).getTime() / 1000).toFixed(0)),
      web: values.web,
    };
    console.log(form_data)

    const joined = props.state.data.concat(form_data);
    props.setState({ data: joined })

    localStorage.setItem("data", JSON.stringify(props.state.data))
  };

  return (
    <div className="form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          await onSubmit(values);
          resetForm();
        }}
      >
        <Form>
          <label htmlFor="manufacturer">Gyártó* </label>
          <Field type="text" id="manufacturer" name="manufacturer" />
          <ErrorMessage name="manufacturer" render={renderError} />
          <br />
          <label htmlFor="type">Típus* </label>
          <Field type="text" id="type" name="type" />
          <ErrorMessage name="type" render={renderError} />
          <br />
          <label htmlFor="ccm">Motor hengerűrtartalom* </label>
          <Field type="number" id="ccm" name="ccm" />
          (cm3)
          <ErrorMessage name="ccm" render={renderError} />
          <br />
          <label htmlFor="color">Szín </label>
          <Field type="text" id="color" name="color" />
          <ErrorMessage name="color" render={renderError} />
          <br />
          <label htmlFor="design">Kivitel </label>
          <Field type="text" id="design" name="design" />
          <ErrorMessage name="design" render={renderError} />
          <br />
          <label htmlFor="year">Gyártási időpont* </label>
          <Field type="date" id="year" name="year" />
          <ErrorMessage name="year" render={renderError} />
          <br />
          <label htmlFor="web">Gyártó weboldala </label>
          <Field type="text" id="web" name="web" />
          <ErrorMessage name="web" render={renderError} />
          <div className="buttons">
            <button type="submit">Új autó</button>
            <button type="reset">Törlés</button>
            <button onClick={() => props.setForm(false)}>Mégse</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default NewCar;
