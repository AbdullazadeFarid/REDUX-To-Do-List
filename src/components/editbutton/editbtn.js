

import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { EditList } from "../../redux/action/action";

export default function EditBtn({
  item,
  inputValue,
  setInputValue,
  setEditItemId,
  handleDelete,
}) {
  const dispatch = useDispatch(); // Get dispatch function from useDispatch

  const handleEdit = async (id) => {
    try {
      await axios.put(`http://localhost:3000/users/${id}`, {
        name: inputValue,
      });
      dispatch(EditList({ id, name: inputValue }));
      setEditItemId(null); 
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => handleEdit(item.id)}>Save</button>
    </>
  );
}
