import React, { useState, useEffect, useRef } from 'react'
import { Paperclip } from 'lucide-react'

export default function ChatSupport() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'agent', text: 'Welcome to Chat Support! How can I help you today?', time: '10:00' },
    { id: 2, from: 'user', text: 'Hi, I have a question about a transaction.', time: '10:01' }
  ])
  const [input, setInput] = useState('')
  const listRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  const sendMessage = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    const newMsg = { id: Date.now(), from: 'user', text: trimmed, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
    setMessages(prev => [...prev, newMsg])
    setInput('')

    // mock agent reply
    setTimeout(() => {
      const reply = { id: Date.now()+1, from: 'agent', text: 'Thanks — we are looking into that. Can you share the Transaction ID?', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
      setMessages(prev => [...prev, reply])
    }, 800)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    // Add user message indicating file attachment
    const newMsg = { 
      id: Date.now(), 
      from: 'user', 
      text: `📎 Attached file: ${file.name}`, 
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
    }
    setMessages(prev => [...prev, newMsg])

    // mock reply
    setTimeout(() => {
      const reply = { 
        id: Date.now() + 1, 
        from: 'agent', 
        text: `Received file "${file.name}". Thank you, we will check this.`, 
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      }
      setMessages(prev => [...prev, reply])
    }, 1000)

    // Clear input
    e.target.value = ''
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden h-[520px] flex flex-col">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-slate-400 font-bold uppercase">Support</div>
          <div className="text-sm font-extrabold text-slate-800">Chat Support</div>
        </div>
        <div className="text-xs text-slate-400">Online</div>
      </div>

      <div ref={listRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 flex flex-col">
        {messages.map(m => (
          <div key={m.id} className={`${m.from === 'user' ? 'self-end' : 'self-start'} max-w-[85%]` }>
            <div className={`px-4 py-2 rounded-2xl text-sm ${m.from === 'user' ? 'bg-[#E51E25] text-white' : 'bg-white text-slate-800 border border-slate-100'}`}>
              {m.text}
            </div>
            <div className={`text-[10px] text-slate-400 mt-1 ${m.from === 'user' ? 'text-right' : 'text-left'}`}>{m.time}</div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-slate-100 flex gap-2 items-center bg-white">
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
        />
        
        {/* White Attachment Button */}
        <button 
          type="button" 
          onClick={handleAttachmentClick}
          className="w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-600 rounded-xl flex items-center justify-center transition-colors shrink-0"
          title="Attach file"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type your message..."
          className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
        />
        <button onClick={sendMessage} className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-4 py-2 rounded-xl text-sm font-bold shrink-0">Send</button>
      </div>
    </div>
  )
}
