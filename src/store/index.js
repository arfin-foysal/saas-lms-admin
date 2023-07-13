import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// reducers start
import authReducer from "../features/authSlice";


// reducers end

// slices start

import { apiSliceAdmin } from "./api/apiSliceAdmin";
// slices end

// services start

// services end



// Combine the generated reducer with the other reducers
const store = configureStore({
  reducer: {

    //<---------------- reducers start -------------->
    auth: authReducer,

    
    //<----------------- reducers end ------------->
    //<--------------- slices start --------------->

    [apiSliceAdmin.reducerPath]: apiSliceAdmin.reducer,

    //<-----------------slices end  --------------->
    //<-----------------services start --------------->
    // [authApi.reducerPath]: authApi.reducer,

    //<------------------ services end ------------------>

    devTools: true,
  },

  // Add the generated middleware to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      //<---------------- slices start --------------->
 
      apiSliceAdmin.middleware,
      //<---------------- slices end --------------->

      //<------------------- services start ----------------->
      // authApi.middleware,
  
      //<------------------ services end ------------------>
    ]),
});
setupListeners(store.dispatch);
export const useSelector = useReduxSelector;
export const useDispatch = () => useReduxDispatch();
export default store;
