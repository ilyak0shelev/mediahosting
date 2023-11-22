import React from 'react';
import Header from './components/Header';
import "./styles/App.css"
import { PageProvider } from './components/contexts/PageContext';
import LoginWindow from './components/LoginWindow';
import { AuthWindowProvider } from './components/contexts/AuthWindowContext';
import { AuthStatusProvider} from './components/contexts/AuthStatusContext';
import SessionChecker from './components/SessionChecker';

function App() {
    return (
        <div className="App">
            <AuthStatusProvider>
                <PageProvider>
                    <AuthWindowProvider>
                        <SessionChecker />
                        <Header />
                        <LoginWindow />
                    </AuthWindowProvider>
                </PageProvider>
            </AuthStatusProvider>
        </div>
    );
}

export default App