import React from 'react';
import Header from './components/Header';
import "./styles/App.css"
import { PageProvider } from './components/contexts/PageContext';
import LoginWindow from './components/LoginWindow';
import { AuthWindowProvider } from './components/contexts/AuthWindowContext';

function App() {
    return (
        <div className="App">
            <PageProvider>
                <AuthWindowProvider>
                    <Header />
                    <LoginWindow />
                </AuthWindowProvider>
            </PageProvider>
        </div>
    );
}

export default App