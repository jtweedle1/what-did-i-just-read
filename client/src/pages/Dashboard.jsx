import axios from 'axios';
import { useState } from 'react';

function Dashboard() {

    const [inputText, setInputText] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSummarize = async () => {
        setLoading(true);
        setSummary('');
        try {
            const response = await axios.post('https://refactored-pancake-x74gvvj94w9cvvqv-3000.app.github.dev/api/summarize', {
                inputText,
            });
            setSummary(response.data.summary);
        } catch (error) {
            console.error('Summarization failed:', error);
            setSummary('Failed to summarize.');
        } finally {
            setLoading(false);
        }
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