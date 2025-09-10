import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx';
import './index.css'
import Providers from './Providers.jsx';

import Home from './routes/Home.jsx';
import Login from './routes/Login.jsx';
import Demo from './routes/Demo.jsx';
import CharacterCustomizer from './components/CharacterSelection.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Providers>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/customize" element={<CharacterCustomizer />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/game" element={<App />} />
                    <Route path="/demo" element={<Demo />} />
                </Routes>
            </BrowserRouter>
        </Providers>
    </React.StrictMode>,
)