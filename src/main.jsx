import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./assets/styles/_main.scss";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import store from "./store/index";

ReactDOM.createRoot(document.getElementById("root")
).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
           
                    <App/>
          
                <ToastContainer/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
