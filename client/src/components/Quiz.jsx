import { useState } from 'react';

function Quiz({ quiz }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [completed, setCompleted] = useState(false);
    const currentQuestion = quiz[currentQuestionIndex];

    const handleAnswer = (option) => {
        if (option === currentQuestion.answer) {
            if (currentQuestionIndex < quiz.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                setCompleted(true);
            }
        } else {
            alert("Try again!");
        }
    };

    if (completed) {
        return (
            <div className="mt-8 bg-white border border-gray-300 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-[#333333] mb-2">Quiz</h2>
                <p className="mt-4 font-semibold text-green-600">🎉 Quiz complete! You got all the answers correct!</p>
            </div>
        )
    }

                return (
                <div className="mt-8 bg-white border border-gray-300 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-[#333333] mb-2">Quiz</h2>
                    <p className="font-medium">{currentQuestion.question}</p>
                    {currentQuestion.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(option)}
                            className="block w-full text-left border border-gray-300 p-2 rounded-md mt-2 hover:bg-gray-100"
                        >
                            {option}
                        </button>
                    ))}
                </div>
                );
}

                export default Quiz;