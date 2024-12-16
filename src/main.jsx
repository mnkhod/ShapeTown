import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import { cookieToInitialState } from "@account-kit/core";
import App from './App.jsx';
import './index.css'
import Providers from './Providers.jsx';

import Home from './routes/Home.jsx';
import Login from './routes/Login.jsx';
import Demo from './routes/Demo.jsx';

import { config } from './config.js';

const initialState = cookieToInitialState(
    config,
    document.cookie ?? undefined
);


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Providers initialState={initialState}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/game" element={<App />} />
                    <Route path="/demo" element={<Demo />} />
                </Routes>
            </BrowserRouter>
        </Providers>
    </React.StrictMode>,
)