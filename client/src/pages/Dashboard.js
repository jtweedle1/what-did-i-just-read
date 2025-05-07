import { useState } from 'react';

function Dashboard() {

    const [inputText, setInputText] = useState('');

    return (
        <div>
            <h1>🧠 What Did I Just Read?</h1>

            <textarea
                placeholder="Paste your dense or confusing text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />

            <button
                onClick={() => console.log('Summarize clicked')}
            >
                Summarize
            </button>
        </div>
    )
}
export default Dashboard;