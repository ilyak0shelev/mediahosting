import React from 'react';
import Header from './components/Header';
import "./styles/App.css"
import { PageProvider } from './components/contexts/PageContext';
import LoginWindow from './components/LoginWindow';
import RegWindow from './components/RegWindow';

function App() {
    return (
        <div className="App">
            <PageProvider>
                <Header />
                <LoginWindow/>
                <RegWindow/>
            </PageProvider>
        </div>
    );
}

export default App