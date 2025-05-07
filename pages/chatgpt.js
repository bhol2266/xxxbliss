import { useState, useRef, useEffect } from 'react';

export default function Home() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null); // New ref for messages container

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);

        const response = await fetch(`https://backend.fuckvideo.live/chutlunds/chatgpt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: input }),
        });
        const data = await response.json();
        const aiMessage = { text: data.reply, sender: 'ai' };
        setMessages((prev) => [...prev, aiMessage]);
        setInput('');

        // Scroll to the bottom after a new message
        scrollToBottom();
    };

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    const handleReset = () => {
        setMessages([]);
        setInput('');
    };

    return (
        <div className="lg:w-4/5  2xl:w-3/5 w-full mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">ChatGPT Playground</h1>
            <div
                ref={messagesContainerRef} // Set ref to the messages container
                className="border rounded-lg p-4 h-96 overflow-y-scroll mb-4 bg-gray-100"
            >
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.sender === 'ai' ? 'text-left' : 'text-right'}`}>
                        <strong className={msg.sender === 'ai' ? 'text-blue-600' : 'text-green-600'}>
                            {msg.sender === 'ai' ? 'AI' : 'You'}:
                        </strong> {msg.text}
                        <button
                            onClick={() => handleCopy(msg.text)}
                            className="ml-2 text-xs text-gray-500 hover:text-gray-800"
                        >
                            Copy
                        </button>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-r-lg px-4 hover:bg-blue-600"
                >
                    Send
                </button>
                <button
                    type="button"
                    onClick={handleReset}
                    className="ml-2 bg-red-500 text-white rounded px-4 hover:bg-red-600"
                >
                    Reset
                </button>
            </form>
        </div>
    );
}
