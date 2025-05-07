import { useState } from 'react';

function Dashboard() {

    const [inputText, setInputText] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSummarize = () => {
        setLoading(true);
        setSummary('');
        setTimeout(() => {
            setSummary("Here's your summary!"); //temorary]
            setLoading(false);
        }, 1000);
    };

    return (
        <div>
            <h1>What Did I Just Read?</h1>

            <textarea
                placeholder="Paste your dense or confusing text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />

            <button
                onClick={handleSummarize}
                disabled={loading || !inputText.trim()} // Disables button while loading
            >
                {loading ? 'Summarizing...' : 'Summarize'}
            </button>

            {summary && (
                <div>
                    <h2>Summary:</h2>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    )
}
export default Dashboard;