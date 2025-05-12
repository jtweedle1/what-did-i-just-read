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
        <div className="min-h-screen bg-[#FDF6E3] px-4 py-10 sm:px-6 lg:px-8 text-[#333333]">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-[#333333]">
                    What Did I Just Read?
                </h1>

                <div className="space-y-4">
                    <textarea
                        rows="6"
                        placeholder="Paste your dense or confusing text here..."
                        className="w-full border border-gray-300 p-4 rounded-md shadow-sm focus:ring-[#90D8C9] focus:border-[#90D8C9] bg-white text-[#333333] placeholder-gray-500"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />

                    <button
                        onClick={handleSummarize}
                        disabled={loading || !inputText.trim()}
                        className="w-full bg-[#90D8C9] text-[#333333] font-semibold py-2 px-4 rounded-md shadow hover:bg-[#7ecdbd] disabled:bg-gray-300 transition-colors"
                    >
                        {loading ? 'Summarizing...' : 'Summarize'}
                    </button>
                </div>

                {summary && (
                    <div className="mt-8 bg-white border border-gray-300 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-[#333333] mb-2">Summary:</h2>
                        <p className="text-[#333333] whitespace-pre-wrap">{summary}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Dashboard;