// App.js
import React, { useState } from 'react';
import './App.css';
import Upload from './components/Upload';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token al cerrar sesión
        setIsAuthenticated(false);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Image Upload Application</h1>
            </header>
            <main>
                {!isAuthenticated ? (
                    isRegistering ? (
                        <Register onRegister={() => setIsRegistering(false)} />
                    ) : (
                        <Login onLogin={handleLogin} />
                    )
                ) : (
                    <>
                        <Upload onLogout={handleLogout} /> {/* Asegúrate de que el componente Upload maneje la carga de imágenes */}
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
                <button onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? 'Switch to Login' : 'Switch to Register'}
                </button>
            </main>
        </div>
    );
}

export default App;


