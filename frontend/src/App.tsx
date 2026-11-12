import {useState, useEffect} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet, GetHealth} from "../wailsjs/go/main/App";

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [healthStatus, setHealthStatus] = useState<string>("Checking backend...");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    useEffect(() => {
        GetHealth()
            .then((resp) => {
                setHealthStatus(`Backend: ${resp.status} (v${resp.version})`);
            })
            .catch(() => {
                setHealthStatus("Backend: disconnected");
            });
    }, []);

    function greet() {
        Greet(name)
            .then(updateResultText)
            .catch((err) => updateResultText(`Error: ${err}`));
    }

    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo"/>
            <div id="health" style={{fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem'}}>{healthStatus}</div>
            <div id="result" className="result">{resultText}</div>
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text"/>
                <button className="btn" onClick={greet}>Greet</button>
            </div>
        </div>
    )
}

export default App
