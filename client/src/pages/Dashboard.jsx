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
        <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">
                    What Did I Just Read?
                </h1>

                <div className="space-y-4">
                    <textarea
                        rows="6"
                        placeholder="Paste your dense or confusing text here..."
                        className="w-full border border-gray-300 p-4 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />

                    <button
                        onClick={handleSummarize}
                        disabled={loading || !inputText.trim()}
                        className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
                    >
                        {loading ? 'Summarizing...' : 'Summarize'}
                    </button>
                </div>

                {summary && (
                    <div className="mt-8 bg-white border border-gray-300 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-purple-700 mb-2">Summary:</h2>
                        <p className="text-gray-800 whitespace-pre-wrap">{summary}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Dashboard;