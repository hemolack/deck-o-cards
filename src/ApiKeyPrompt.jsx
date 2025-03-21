import React, { useState } from 'react';

const ApiKeyPrompt = (props) => {
    const [apiKey, setApiKey] = useState(props.apiKey ? props.apiKey : '');

    const saveKey = (event) => {
        alert(apiKey);
        props.saveCallback(apiKey);
    }

    const changeKey = (event) => {
        setApiKey(event.target.value);
    }

    if(props.role == "GM") {
        return (
            <div>
                <div>In order to use the Deck-o-Cards extension, you must provide a valid API key from <a href="https://extendsclass.com" target="_blank">ExtendsClass</a> which you can obtain by signing up for a free acount.</div>
                <div>API Key: <input value={apiKey} onChange={changeKey}></input></div>
                <div><button onClick={saveKey}>Save</button></div>
            </div>
        
        )
    }
    else {
        return <div>The Game Master must enter a valid API key from <a href="https://extendsclass.com" target="_blank">ExtendsClass</a> to enable this extension.</div>
    }
};

export default ApiKeyPrompt;