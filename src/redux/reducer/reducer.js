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

    default:
      return data;
  }
};

export default reducer;
