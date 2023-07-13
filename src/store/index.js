import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// reducers start
import authReducer from "../features/authSlice";
import commonReducer from "../features/commonSlice"
// reducers end



// Api slices start
import { apiSliceAdmin } from "./api/apiSliceAdmin";
//Api slices end



// services start

// services end



// Combine the generated reducer with the other reducers
const store = configureStore({
  reducer: {

    //<---------------- reducers start -------------->
    auth: authReducer,
    common:commonReducer,

    
    //<----------------- reducers end ------------->


    //<---------------Api slices start --------------->

    [apiSliceAdmin.reducerPath]: apiSliceAdmin.reducer,

    //<----------------- Api slices end  --------------->


    //<-----------------services start --------------->
   

    //<------------------ services end ------------------>

    devTools: true,
  },

  // Add the generated middleware to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      //<----------------Api slices start --------------->
 
      apiSliceAdmin.middleware,
      //<----------------Api slices end --------------->


      //<------------------- services start ----------------->
    
  
      //<------------------ services end ------------------>
    ]),
});
setupListeners(store.dispatch);
export const useSelector = useReduxSelector;
export const useDispatch = () => useReduxDispatch();
export default store;
