import React, { useState, useEffect, useRef } from "react";
import { Terminal, Maximize, Minimize, X } from "lucide-react";

function TerminalButton() {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [typingOutput, setTypingOutput] = useState("");
  const inputRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [history, typingOutput]);

  const typeText = (text, callback) => {
    let index = 0;
    setTypingOutput("");
    const interval = setInterval(() => {
      setTypingOutput((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(interval);
        callback && callback();
      }
    }, 20);
  };

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = input.toLowerCase();
      let output;

      switch (cmd) {
        case "hello":
          output = "Hello World!";
          break;
        case "help":
          output =
            "Available commands: hello, help, aboutme, experience, projects, skills, education, clear";
          break;
        case "aboutme":
          output = `Owais Nazir
Jammu and Kashmir, India
Email: owaisaalam38@gmail.com
Phone: +919103293240

Software engineer with hands-on experience in MERN stack and full-stack development.`;
          break;
        case "experience":
          output = `Junior Backend Developer - Rational Tabs (Currently)
- Built and maintained RESTful APIs with Node.js and Express.js
- Optimized backend performance and database queries
- Collaborated with frontend team for integration

MERN Stack Intern - Rehbarpost Pvt. Ltd. (Jan 2025 – Feb 2025)
- Developed full-stack customer support system
- Built responsive React frontend

Web Developer Intern - Phoenix Advanced Softwares (Jun 2024 – Aug 2024)
Java Trainee - Indo Danish Tool Room (Jun 2023 – Jul 2023)`;
          break;
        case "projects":
          output = `TeamSync
Gate Pass Management System
Full-Stack Blogging Website`;
          break;
        case "skills":
          output = `Programming: Java, C, C++, JS, Python
Frontend: HTML, CSS, React
Backend: Node.js, Express.js
Tools: Postman, Thunder Client`;
          break;
        case "education":
          output = `Mewar University, Chittorgarh (B.Tech in CSE) - CGPA: 7.0/10
Govt. Boys Higher Secondary School, Hadipora, J&K (12th) - CGPA: 7.0/10`;
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        default:
          output = `bash: ${input}: command not found. Type 'help' to see available commands.`;
      }
      setHistory((prev) => [...prev, { command: input, output: "" }]);
      const currentIndex = history.length;

      typeText(output, () => {
        setHistory((prev) => {
          const newHistory = [...prev];
          newHistory[currentIndex] = { command: input, output };
          return newHistory;
        });
      });

      setInput("");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-green-400 font-mono px-2 py-1 rounded-lg shadow-xl  hover:bg-gray-900"
        >
          <Terminal size={20} />
        </button>
        <span className="text-green-400 font-mono">{'terminal'}</span>
      </div>
      {open && (
        <div
          className={`absolute shadow-lg z-50 border overflow-hidden flex flex-col
            ${fullscreen
              ? "top-0 left-0 w-screen h-screen rounded-none"
              : "top-20 left-1/2 transform -translate-x-1/2 w-3/4 max-w-3xl h-96 rounded-lg"
            }`}
        >
          <div className="h-10 bg-white flex justify-end items-center px-3 border-b border-gray-300">
            <div className="flex gap-2 items-center">
               <div
                className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600"
                onClick={() => setFullscreen(!fullscreen)}
              >
                <Maximize size={12} className="text-white" />
              </div>
              <div
                className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-yellow-600"
                onClick={() => setFullscreen(false)}
              >
                <Minimize size={12} className="text-white" />
              </div>
             
              <div
                className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600"
                onClick={() => setOpen(false)}
              >
                <X size={12} className="text-white" />
              </div>
            </div>
          </div>

          <div
            className="bg-black text-green-400 font-mono p-4 flex-1 overflow-y-auto flex flex-col"
            ref={contentRef}
            onClick={(e) => {
              if (e.target === contentRef.current) {
                inputRef.current && inputRef.current.focus();
              }
            }}
          >
            {history.map((item, idx) => (
              <div key={idx} className="mb-1">
                <p>
                  <span className="font-bold">owaiseeee@owaiseeee:~$ </span>
                  {item.command}
                </p>
                <pre className="whitespace-pre-wrap">{item.output || (idx === history.length - 1 ? typingOutput : "")}</pre>
              </div>
            ))}

            <div className="flex mt-1">
              <span className="font-bold">owaiseeee@owaiseeee:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="bg-black text-green-400 font-mono border-none focus:outline-none flex-1 ml-1"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TerminalButton;
