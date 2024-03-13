import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { EditList } from "../../redux/action/action";

export default function EditBtn({ item, setInputValue, setEditItemId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(item.name);

  const handleEdit = async (id) => {
    try {
      await axios.put(`http://localhost:3000/users/${id}`, {
        name: name,
      });
      dispatch(EditList({ id, name: name }));
      setEditItemId(null);
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => handleEdit(item.id)}>Save</button>
    </>
  );
}
