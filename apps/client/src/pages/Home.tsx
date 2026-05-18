import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export function Home() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSearch() {
    const parts = input.split('#');
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      setError('Enter your Riot ID — Name#TAG');
      return;
    }
    setError(null);
    navigate(`/player/${parts[0].trim()}/${parts[1].trim()}`);
  }

  return (
    <div className="home">

      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero-left">
          <div className="home-eyebrow">Valorant Performance Analytics</div>
          <h1 className="home-title">
            PRO<span className="home-title-accent">QUEUE</span>
          </h1>
          <p className="home-subtitle">
            Role-based impact scoring and contextual performance analysis for competitive players.
          </p>
          <div className="home-search">
            <div className="search-wrapper">
              <input
                className="search-input"
                type="text"
                placeholder="RiotID#TAG"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                autoFocus
              />
              <button className="search-btn" onClick={handleSearch}>
                Search
              </button>
            </div>
            {error && <p className="search-error">{error}</p>}
          </div>
        </div>
        <div className="home-hero-right">
          <div className="home-hero-stat">
            <span className="home-hero-stat-value">4</span>
            <span className="home-hero-stat-label">Roles Tracked</span>
          </div>
          <div className="home-hero-stat">
            <span className="home-hero-stat-value">3s</span>
            <span className="home-hero-stat-label">Trade Window</span>
          </div>
          <div className="home-hero-stat">
            <span className="home-hero-stat-value">IS</span>
            <span className="home-hero-stat-label">Impact Score</span>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="home-philosophy">
        <div className="home-philosophy-header">
          <div className="home-section-label">Philosophy</div>
          <h2 className="home-philosophy-title">
            Performance is context.<br />Context is everything.
          </h2>
        </div>
        <div className="home-philosophy-body">
          <p className="home-philosophy-lead">
            Most trackers count. PROQUEUE interprets.
          </p>
          <p className="home-philosophy-text">
            A kill is not a kill. An entry frag into a site with no follow-up is a
            failed play dressed as a stat. A death that was immediately traded is a
            sacrifice, not a mistake. Raw numbers collapse this distinction.
            PROQUEUE doesn't.
          </p>
          <p className="home-philosophy-text">
            Every match is decomposed into structured events - entries, trades,
            trade chains, utility-assisted kills, clutch situations, round-phase
            timing. Each event is evaluated against what your role demands. A
            Duelist dying untraded in a post-plant costs more than a Controller
            doing the same. A Sentinel holding a retake reads differently than a
            Duelist doing it. Role expectation is the lens.
          </p>
          <p className="home-philosophy-text">
            The result is an Impact Score, IS. Not a rank. Not a grade handed down
            by opaque ML. A deterministic, reproducible number you can trace back
            to the exact events that built it. Interpretability over ranking.
            Context over raw statistics. That's the whole idea.
          </p>
        </div>
      </section>

      {/* PILLARS */}
      <section className="home-pillars">
        <div className="home-section-label">How It Works</div>
        <div className="home-pillars-grid">
          <div className="home-pillar">
            <div className="home-pillar-number">01</div>
            <h3 className="home-pillar-title">Match Event Decomposition</h3>
            <p className="home-pillar-text">
              Raw match data is transformed into structured, role-relevant
              events. Entries, trades, utility kills, clutch situations,
              round-phase timing, death context. All of it classified and weighted.
            </p>
          </div>
          <div className="home-pillar">
            <div className="home-pillar-number">02</div>
            <h3 className="home-pillar-title">Role-Based Impact Scoring</h3>
            <p className="home-pillar-text">
              A contextual Impact Score is computed per match, per role.
              Duelist scores weight entry effectiveness. Sentinel scores weight
              site hold and retake contribution. The role defines the standard.
            </p>
          </div>
          <div className="home-pillar">
            <div className="home-pillar-number">03</div>
            <h3 className="home-pillar-title">Contextual Normalization</h3>
            <p className="home-pillar-text">
              Scores are normalized against match-level baselines. A 20-kill
              game on a losing team reads differently than a 20-kill game
              carrying. The engine adjusts for round state, role expectations,
              and match context.
            </p>
          </div>
          <div className="home-pillar">
            <div className="home-pillar-number">04</div>
            <h3 className="home-pillar-title">Behavioral Pattern Analysis</h3>
            <p className="home-pillar-text">
              Long-term aggregation surfaces tendencies - aggression bias,
              clutch participation rate, consistency versus volatility.
              Not just how you performed, but how you tend to perform.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="home-cta">
        <div className="home-cta-inner">
          <span className="home-cta-text">Ready to see your impact?</span>
          <div className="search-wrapper home-cta-search">
            <input
              className="search-input"
              type="text"
              placeholder="RiotID#TAG"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}