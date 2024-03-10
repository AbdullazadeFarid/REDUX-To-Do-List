export const GetList = (data) => ({
  type: "Get_List",
  payload: data,
});

export const AddList = (item) => ({
  type: "Add_List",
  payload: item,
});

export const DeleteList = (item) => ({
  type: "Delete_List",
  payload: item,
});
