// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { AddList, DeleteList, EditList, GetList } from "./redux/action/action";
// import "./App.css";

// const App = () => {
//   const dispatch = useDispatch();
//   const [inputValue, setInputValue] = useState("");
//   const info = useSelector((state) => state.listReducer.list);

//   const fetchData = async () => {
//     try {
//       const response = await axios("http://localhost:3000/users");
//       dispatch(GetList(response.data));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     setInputValue("");

//     try {
//       const response = await axios.post("http://localhost:3000/users", {
//         id: (info.length + 1).toString(),
//         name: inputValue,
//       });
//       dispatch(AddList(response.data));
//     } catch (error) {
//       console.error("Error adding item:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/users/${id}`);
//       dispatch(DeleteList(id));
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   };



//   const handleEdit = async (id) => {
//     try {
//       await axios.put(`http://localhost:3000/users/${id}`, {
//         name: inputValue,
//       });
//       dispatch(EditList({ id, name: inputValue }));
//     } catch (error) {
//       console.error("Error editing item:", error);
//     }
//   };






//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="app-container">
//       <h1>To-Do List</h1>
//       <form onSubmit={handleAdd}>
//         <input
//           placeholder="Enter your list"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           className="input-field"
//           type="text"
//           name="input"
//           id=""
//         />
//         <button type="submit" className="add-button">
//           Add
//         </button>
//       </form>
//       <ul className="item-list">
//         {info.map((item) => (
//           <li key={item.id} className="list-item">
//             {item.name}
//             <button onClick={() => handleDelete(item.id)}>delete</button>
//             <button onClick={handleEdit} >Edit</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;




// App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddList, DeleteList, EditList, GetList } from "./redux/action/action";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [editItemId, setEditItemId] = useState(null); // Добавлено состояние для отслеживания редактируемого элемента
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
        id: (info.length + 1).toString(),
        name: inputValue,
      });
      dispatch(AddList(response.data));
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      dispatch(DeleteList(id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };


  

  const handleEdit = async (id) => {
    try {
      await axios.put(`http://localhost:3000/users/${id}`, {
        name: inputValue,
      });
      dispatch(EditList({ id, name: inputValue }));
      setEditItemId(null); // После редактирования сбрасываем состояние редактируемого элемента
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            {editItemId === item.id ? (
              <>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={() => handleEdit(item.id)}>Save</button>
              </>
            ) : (
              <>
                {item.name}
                <button onClick={() => handleDelete(item.id)}>delete</button>
                <button onClick={() => setEditItemId(item.id)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
