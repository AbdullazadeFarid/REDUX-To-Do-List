export const GetList = (data) => {
  return {
    type: "Get_List",
    payload: data,
  };
};

export const AddList = (item) => {
  return {
    type: "Add_List",
    payload: item,
  };
};
