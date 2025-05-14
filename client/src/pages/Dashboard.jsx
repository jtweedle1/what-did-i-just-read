import axios from 'axios';
import { useState } from 'react';
import Mermaid from '../components/Mermaid';

function speakSummary(text) {
    if (!window.speechSynthesis) {
        alert('Sorry, your browser does not support text-to-speech.');
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;     // Normal speed
    utterance.pitch = 1;    // Normal pitch
    utterance.volume = 1;   // Full volume

    window.speechSynthesis.speak(utterance);
}

function Dashboard() {

    const [inputText, setInputText] = useState(''); // Overall input text for all generations
    const [summary, setSummary] = useState(''); // Text summary
    const [loading, setLoading] = useState(false); // Loading state for feedback
    const [diagramCode, setDiagramCode] = useState(''); // Flowchart output
    const [quiz, setQuiz] = useState('');

    const handleSummarize = async () => {
        setLoading(true);
        setSummary('');
        setDiagramCode('');
        setQuiz('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/summarize`, {
                inputText,
            });
            setSummary(response.data.summary);
            setDiagramCode(response.data.diagram);
            setQuiz(response.data.quiz)
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
                        <h2 className="text-xl font-semibold text-[#333333] mb-2">Summary</h2>
                        <p className="text-[#333333] whitespace-pre-wrap">{summary}</p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => speakSummary(summary)}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                            >
                                🔊 Play Summary
                            </button>
                        </div>
                    </div>
                )}

                {diagramCode && (
                    <div className="mt-8 bg-white border border-gray-300 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-[#333333] mb-2">Flowchart/Diagram</h2>
                        <Mermaid chart={diagramCode} />
                    </div>
                )}

                {quiz.length > 0 && (
                    <div className="mt-8 bg-white border border-gray-300 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-[#333333] mb-2">Quiz</h2>
                        {quiz.map((q, index) => (
                            <div key={index} className="mb-4">
                                <p className="font-medium">{q.question}</p>
                                {q.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => alert(option === q.answer ? "✅ Correct!" : "❌ Try Again")}
                                        className="block w-full text-left border border-gray-300 p-2 rounded-md mt-2 hover:bg-gray-100"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    )
}
export default Dashboard;