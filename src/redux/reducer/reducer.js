const initialState = {
  list: [],
};

const reducer = (data = initialState, action) => {
  switch (action.type) {
    case "Get_List":
      return {
        ...data, // ... spread operator adlanir
        list: action.payload, // payload da o
      };

    case "Add_List":
      return {
        ...data, // ... spread operator adlanir
        list: [...data.list, action.payload],
      };

    case "Delete_List":
      return {
        ...data,
        list: data.list.filter((item) => item.id !== action.payload),
      };


      case "Edit_List":
        return {
          ...data,
          list: data.list.map((item) =>
            item.id === action.payload.id ? { ...item, name: action.payload.name } : item
          ),
        };

    default:
      return data;
  }
};

export default reducer;
