import { useEffect, useState } from "react";
import "./App.css";
import _ from "lodash";
import Form from "./components/NewCar";

const setLocalData = (obj) => {
  if (typeof obj !== "object") return false;
  localStorage.setItem("data", JSON.stringify(obj));
  return getLocalData();
};

const getLocalData = () => {
  return JSON.parse(localStorage.getItem("data"));
};

const getRemoteData = async () => {
  const result = await fetch("http://localhost:3004/data");
  return result.json();
};

const stampToDate = (stamp) => {
  return new Date(stamp * 1000).toLocaleString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

function App() {
  const [state, setState] = useState({ data: [] });
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(false);

  useEffect(() => {
    getRemoteData().then((remote) => {
      setState({
        ...state,
        data: 
        // !_.isEqual(getLocalData(), remote)
        //   ? setLocalData(remote)
        //   : 
          getLocalData(),
      });
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="header">
        <h1>Autónyilvántartás</h1>
        <button className="new_car" onClick={() => setForm(true)}>
          Új autó
        </button>
      </div>
      <div className="form">
        {form === true && <Form setForm={setForm} state={state} setState={setState} />}
      </div>
      <div className="container">
        <table border="1">
          <thead>
            <tr>
              <th>Gyártó</th>
              <th>Típus</th>
              <th>Motor (cm3)</th>
              <th>Szín</th>
              <th>Kivitel</th>
              <th>Gyártási időpont</th>
              <th>Gyártó weboldala</th>
            </tr>
          </thead>
          {loading === true && "Töltés..."}
          {console.log(state.data)}
          {state.data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.manufacturer}</td>
                <td>{item.type}</td>
                <td>{item.ccm}</td>
                <td>{item.color}</td>
                <td>{item.design}</td>
                <td>{stampToDate(item.year)}</td>
                <td>{item.web}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default App;
