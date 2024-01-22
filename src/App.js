import React from 'react';
import Header from './components/Header';
import "./styles/App.css"
import { PageProvider } from './components/contexts/PageContext';
import LoginWindow from './components/LoginWindow';
import { AuthWindowProvider } from './components/contexts/AuthWindowContext';
import { AuthStatusProvider } from './components/contexts/AuthStatusContext';
import SessionChecker from './components/SessionChecker';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import FileReciever from './components/FileReciever';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                    <AuthStatusProvider>
                        <PageProvider>
                            <AuthWindowProvider>
                                <SessionChecker />
                                <Header />
                                <LoginWindow />
                                <FileReciever/>
                                <AppRouter />
                            </AuthWindowProvider>
                        </PageProvider>
                    </AuthStatusProvider>
            </BrowserRouter>
        </div>
    );
}

export default App