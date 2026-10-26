import React, { useState } from 'react';
import { Bot, Send, Sparkles, Database, CheckCircle2, ArrowRight, CornerDownLeft, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { api } from '../../services/api';

interface ChatMessage {
  id: string;
  sender: 'user' | 'copilot';
  text: string;
  data?: any;
  visualizationType?: string;
  matchedTool?: string;
  followUpSuggestions?: string[];
  timestamp: string;
}

export const RegulatoryCopilotPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'copilot',
      text: 'Welcome to the AICTE Regulatory AI Copilot. You can query institutional databases in natural language to inspect intake compliance, duplicate enrolments, verification rates, and anomaly factors.',
      matchedTool: 'Initialized Regulatory Query Engine',
      followUpSuggestions: [
        'Show colleges in West Bengal exceeding approved CSE intake',
        'Which institutions have the most unresolved duplicate enrolment cases?',
        'What is the verification rate for engineering students in Maharashtra?',
        'Compare admission utilization across three institutions',
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [queryInput, setQueryInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const q = (textToSend || queryInput).trim();
    if (!q || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setQueryInput('');
    setLoading(true);

    try {
      const res = await api.queryCopilot(q);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'copilot',
        text: res.summary,
        data: res.data,
        visualizationType: res.visualizationType,
        matchedTool: res.matchedTool,
        followUpSuggestions: res.followUpSuggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      const errMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'copilot',
        text: 'Error processing regulatory query: ' + err.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Bot className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              AICTE Regulatory AI Copilot
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Natural language interface executing controlled, deterministic analytical tools on institutional databases with zero hallucination.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200/90 rounded-xl text-xs font-bold shadow-2xs">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>Deterministic Tool Routing Active</span>
          </span>
        </div>
      </div>

      {/* Chat Conversation Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-elevated flex flex-col h-[640px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6 bg-slate-50/40">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'copilot' && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-glow-primary">
                  <Bot className="w-5 h-5 stroke-[2]" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-xs shadow-md'
                    : 'bg-white border border-slate-200/90 text-slate-900 rounded-bl-xs shadow-subtle'
                }`}
              >
                {/* Tool Tag if bot */}
                {msg.matchedTool && (
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/80 w-fit mb-3">
                    <Database className="w-3.5 h-3.5 text-blue-600" />
                    <span>Tool Executed: {msg.matchedTool}</span>
                  </div>
                )}

                <p className="leading-relaxed font-medium text-xs sm:text-sm">{msg.text}</p>

                {/* Structured Data Table Output */}
                {msg.data && Array.isArray(msg.data) && msg.data.length > 0 && (
                  <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                        <tr>
                          {Object.keys(msg.data[0]).map(k => (
                            <th key={k} className="py-2.5 px-3 capitalize">
                              {k.replace(/_/g, ' ')}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {msg.data.map((row: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            {Object.values(row).map((val: any, vIdx: number) => (
                              <td key={vIdx} className="py-2.5 px-3 font-mono text-slate-800">
                                {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Follow up suggestions */}
                {msg.followUpSuggestions && msg.followUpSuggestions.length > 0 && (
                  <div className="mt-4 pt-3.5 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Recommended Follow-Up Inquiries:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.followUpSuggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(s)}
                          className="text-[11px] font-semibold bg-slate-50 hover:bg-blue-50 text-blue-700 hover:text-blue-800 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-lg text-left transition-all flex items-center gap-1.5 active:scale-98 shadow-2xs"
                        >
                          <span>{s}</span>
                          <ArrowRight className="w-3 h-3 text-blue-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`text-[10px] mt-2.5 font-medium ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start animate-fade-in">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-glow-primary">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-slate-200/90 p-4 rounded-2xl rounded-bl-xs text-xs text-slate-600 flex items-center gap-2 shadow-subtle">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                <span className="font-semibold">Executing allowlisted regulatory database query...</span>
              </div>
            </div>
          )}
        </div>

        {/* Query Input Box */}
        <div className="p-4 bg-white border-t border-slate-200/90 flex gap-2.5 items-center">
          <input
            type="text"
            placeholder="Ask questions about intake violations, duplicate enrolments, verification statistics..."
            value={queryInput}
            onChange={e => setQueryInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-2xs"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !queryInput.trim()}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-glow-primary active:scale-98"
          >
            <span>Ask AI</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
