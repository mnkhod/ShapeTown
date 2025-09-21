import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx';
import './index.css'
import Providers from './Providers.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

import Home from './routes/Home.jsx';
import Login from './routes/Login.jsx';
import Demo from './routes/Demo.jsx';
import CharacterCustomizer from './components/CharacterSelection.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary
            name="Application"
            critical={true}
            supportInfo={{ email: 'support@shapetown.game' }}
        >
            <Providers>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={
                            <ErrorBoundary name="HomePage">
                                <Home />
                            </ErrorBoundary>
                        } />
                        <Route path="/customize" element={
                            <ErrorBoundary name="CharacterCustomizer">
                                <CharacterCustomizer />
                            </ErrorBoundary>
                        } />
                        <Route path="/login" element={
                            <ErrorBoundary name="LoginPage">
                                <Login />
                            </ErrorBoundary>
                        } />
                        <Route path="/game" element={
                            <ErrorBoundary name="GamePage">
                                <App />
                            </ErrorBoundary>
                        } />
                        <Route path="/demo" element={
                            <ErrorBoundary name="DemoPage">
                                <Demo />
                            </ErrorBoundary>
                        } />
                    </Routes>
                </BrowserRouter>
            </Providers>
        </ErrorBoundary>
    </React.StrictMode>,
)