
import { useState } from 'react'
import './App.css'

const suggestions = [
  {
    icon: '✳',
    title: 'Learn something new',
    description: 'Understand complex topics with simple explanations.',
    prompt: 'Explain a complex topic in simple words.',
    color: 'cyan',
  },
  {
    icon: '</>',
    title: 'Build with code',
    description: 'Explore programming, debug errors, and build projects.',
    prompt: 'Help me build a Java Spring Boot project.',
    color: 'purple',
  },
  {
    icon: '✧',
    title: 'Think creatively',
    description: 'Discover fresh ideas and new perspectives.',
    prompt: 'Suggest an innovative AI project idea.',
    color: 'pink',
  },
  {
    icon: '↗',
    title: 'Get productive',
    description: 'Organize your work and plan your next steps.',
    prompt: 'Help me create a productive study plan.',
    color: 'green',
  },
]

function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    if (!message.trim() || isLoading) return

    const userMessage = message.trim()

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: userMessage },
    ])
    setMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8082/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationId: 'genx-session-1',
        }),
      })

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }

      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response },
      ])
    } catch (error) {
      console.error('Chat error:', error)

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function newChat() {
    setMessage('')
    setMessages([])
  }

  return (
      <div className="app-shell">
        <aside className="sidebar">
          <a
              className="brand"
              href="#"
              onClick={(event) => event.preventDefault()}
          >
            <span className="brand-icon">G</span>
            <span>
            <span className="brand-name">
              GenX<span className="brand-accent">.AI</span>
            </span>
            <span className="brand-caption">
              INTELLIGENCE, REIMAGINED
            </span>
          </span>
          </a>

          <button className="new-chat" onClick={newChat}>
            <span>＋</span> New conversation
          </button>

          <div className="side-label">WORKSPACE</div>

          <button className="nav-item active">
            <span>◈</span> AI Assistant
            <span className="online-dot" />
          </button>

          <div className="side-label recent-label">YOUR SPACE</div>

          <div className="empty-history">
            <span>◷</span>
            <p>Your conversations will appear here.</p>
          </div>

          <div className="sidebar-bottom">
            <span className="status-dot" />
            <div>
              <strong>Gemini connected</strong>
              <p>Powered by Spring AI</p>
            </div>
          </div>
        </aside>

        <main className="main-panel">
          <header className="topbar">
            <div className="mobile-brand">
              <span className="brand-icon small">G</span>
              <strong>
                GenX<span className="brand-accent">.AI</span>
              </strong>
            </div>

            <div className="breadcrumb">
              Workspace <span>/</span> <strong>AI Assistant</strong>
            </div>

            <div className="topbar-right">
            <span className="model-badge">
              <span className="model-spark">✦</span> Gemini AI
            </span>
              <div className="avatar">G</div>
            </div>
          </header>

          <section className="workspace">
            <div className="ambient ambient-one" />
            <div className="ambient ambient-two" />

            {messages.length === 0 && (
                <div className="welcome-content">
                  <div className="hero-symbol">
                    <div className="hero-orbit orbit-one" />
                    <div className="hero-orbit orbit-two" />
                    <div className="hero-core">✳</div>
                    <span className="hero-status" />
                  </div>

                  <div className="eyebrow">
                    YOUR INTELLIGENT WORKSPACE
                  </div>

                  <h1 className="hero-title">
                    Think beyond
                    <br />
                    <span>the ordinary.</span>
                  </h1>

                  <p className="hero-description">
                    Ideas, code, and curiosity — bring them all here.
                    <br className="desktop-break" />
                    What would you like to explore today?
                  </p>

                  <div className="suggestion-grid">
                    {suggestions.map((item) => (
                        <button
                            key={item.title}
                            className="suggestion-card"
                            onClick={() => setMessage(item.prompt)}
                        >
                          <div className={`suggestion-icon ${item.color}`}>
                            {item.icon}
                          </div>

                          <div className="suggestion-copy">
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                          </div>

                          <span className="card-arrow">↗</span>
                        </button>
                    ))}
                  </div>
                </div>
            )}

            {messages.length > 0 && (
                <div className="chat-messages">
                  {messages.map((item, index) => (
                      <div
                          key={index}
                          className={`chat-message ${item.role}`}
                      >
                        <div className="message-role">
                          {item.role === 'user' ? 'You' : 'GenX.AI'}
                        </div>

                        <div className="message-content">
                          {item.content}
                        </div>
                      </div>
                  ))}

                  {isLoading && (
                      <div className="chat-message assistant">
                        <div className="message-role">GenX.AI</div>
                        <div className="message-content">
                          Thinking...
                        </div>
                      </div>
                  )}
                </div>
            )}

            <div className="composer-area">
              <form className="composer" onSubmit={handleSubmit}>
              <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault()
                      event.currentTarget.form.requestSubmit()
                    }
                  }}
                  placeholder="Message GenX.AI..."
                  rows={1}
                  aria-label="Message GenX.AI"
              />

                <div className="composer-footer">
                <span className="composer-hint">
                  <span className="hint-plus">＋</span>
                  Ask anything, explore everything
                </span>

                  <button
                      className="send-button"
                      type="submit"
                      disabled={!message.trim() || isLoading}
                      aria-label="Send message"
                  >
                    ↑
                  </button>
                </div>
              </form>

              <p className="disclaimer">
                GenX.AI can make mistakes. Verify important information.
              </p>
            </div>
          </section>
        </main>
      </div>
  )
}

export default App
