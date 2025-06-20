import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [log, setLog] = useState<string[]>([
    "Welcome to Wellplayed chat!",
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [log, open]);

  const send = () => {
    if (!msg.trim()) return;
    setLog((l) => [...l, `You: ${msg}`]);
    setMsg("");
    // placeholder: here you’d emit via WebSocket
  };

  return (
    <>
      {/* toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 left-4 z-50 bg-primary hover:bg-primary-dark text-white p-3 rounded-full shadow-lg"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {/* panel */}
      {open && (
        <div className="fixed bottom-20 left-4 w-80 h-72 bg-gray-900/90 backdrop-blur border border-gray-700 rounded-xl shadow-lg flex flex-col z-50">
          <div className="flex-1 overflow-y-auto p-3 text-sm space-y-1">
            {log.map((line, i) => (
              <p key={i} className="text-gray-300 whitespace-pre-wrap">
                {line}
              </p>
            ))}
            <div ref={endRef} />
          </div>
          <div className="border-t border-gray-700 p-2">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message…"
              className="w-full bg-gray-800/70 rounded-md px-3 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>
      )}
    </>
  );
}