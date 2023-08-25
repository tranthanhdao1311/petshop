import { createSlice } from "@reduxjs/toolkit";
interface AppState {
  toggleShowModal: boolean;
  toggleDropdownCate: boolean;
  toggleShowSideBarMobile: boolean;
  toggleShowModalViewItem: boolean;
  toggleShowModalCart: boolean;
  addToCart: object[]
}

const initialState: AppState = {
  toggleShowModal: false,
  toggleDropdownCate: false,
  toggleShowModalViewItem: false,
  toggleShowSideBarMobile: false,
  toggleShowModalCart: false,
  addToCart: []
};
const newsSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToggleShowModal: (state: AppState, { payload }) => ({
      ...state,
      toggleShowModal: payload,
    }),
    setToggleShowModalViewItem: (state: AppState, { payload }) => ({
      ...state,
      toggleShowModalViewItem: payload,
    }),
    setToggleDropdownCate: (state: AppState, { payload }) => ({
      ...state,
      toggleDropdownCate: payload,
    }),
    setToggleShowSideBarMobile: (state: AppState, { payload }) => ({
      ...state,
      toggleShowSideBarMobile: payload,
    }),
    setToggleShowModalCart: (state: AppState, { payload }) => ({
      ...state,
      toggleShowModalCart: payload,
    }),
    setAddToCart: (state: AppState, { payload }) => {
      return {
        ...state,
        addToCart: payload
      }

    },
    setRemoveItemCart: (state: AppState, { payload }) => ({
      ...state,
      addToCart: state.addToCart.filter((item, index) => index !== payload)
    })
  },
});
export const {
  setToggleShowModal,
  setToggleDropdownCate,
  setToggleShowModalViewItem,
  setToggleShowSideBarMobile,
  setAddToCart,
  setToggleShowModalCart,
  setRemoveItemCart
} = newsSlice.actions;

export default newsSlice.reducer;
