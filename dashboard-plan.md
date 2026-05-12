# dashboard plan boi

## overview boi
build a session-driven trading dashboard with an opus-inspired control room feel: dark, high-contrast, neon-accented, dense with signal, and intentionally vibe-coded rather than corporate.

## layout boi
- left rail boi: session status, quick nav, and live market context
- center stage boi: active session card stack and decision log feed
- right rail boi: broker-agnostic performance summary and compact diagnostics
- mobile boi: collapse into a single feed-first stack with sticky session state

## active session boi
show one dominant state at a time with the four trading phases:
- pre-market boi
- execution boi
- midday boi
- close boi

state treatment boi:
- large status chip boi
- elapsed time / remaining time boi
- current objective boi
- next action boi
- soft transitions boi between states with subtle glow and motion

## audit trail boi
add a real-time feed that reads like a decision log from the repo:
- append-only timeline boi
- source-linked entries boi from repo activity
- decision, rationale, and outcome fields boi
- timestamp + author/context boi
- filter by session, symbol, or strategy boi

presentation boi:
- terminal-inspired cards boi
- compact monospace metadata boi
- subtle diff / commit energy boi without feeling like a raw git viewer

## performance boi
show a broker-agnostic performance overview so the stack stays portable:
- pnl boi
- win rate boi
- avg win / avg loss boi
- exposure boi
- drawdown boi
- fill quality boi
- session-by-session breakdown boi

rules boi:
- no broker-specific language boi
- no hard dependency on one execution venue boi
- normalize metrics so the view works across providers boi

## vibe code boi
- black / graphite base boi with electric accent colors boi
- glassy panels boi, minimal chrome, strong typography boi
- animated but restrained micro-interactions boi
- dense information hierarchy boi with crisp spacing boi
- feels handcrafted and slightly experimental boi, not enterprise-polished boi

## content model boi
- session state boi
- live repo decision events boi
- performance metrics boi
- annotations / notes boi
- source references boi

## acceptance boi
- the dashboard clearly reflects the current session phase boi
- the audit trail updates in real time from repo activity boi
- the performance view remains broker-agnostic boi
- the overall aesthetic matches the vibe-coded direction boi
