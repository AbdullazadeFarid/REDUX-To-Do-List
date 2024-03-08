import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddList, GetList } from "./redux/action/action";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const info = useSelector((state) => state.listReducer.list);

  const fetchData = async () => {
    try {
      const response = await axios("http://localhost:3000/users");
      dispatch(GetList(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setInputValue("");

    try {
      const response = await axios.post("http://localhost:3000/users", {
        id: info.length + 1,
        name: inputValue,
      });
      dispatch(AddList([response.data]));
      fetchData(); // Yeni öğe ekledikten sonra güncel veriyi getir
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Sadece bir kere çalışsın diye boş dependency array

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <form onSubmit={handleAdd}>
        <input
          placeholder="Enter your list"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input-field"
          type="text"
          name="input"
          id=""
        />
        <button type="submit" className="add-button">
          Add
        </button>
      </form>
      <ul className="item-list">
        {info.map((item) => (
          <li key={item.id} className="list-item">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
