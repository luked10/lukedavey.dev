export const sections = {
  journal: {
    id: "journal",
    title: "Journal",
    subtitle: "late thoughts",
    eyebrow: "desiderium / journal",
    description: "A space for the things I think about when the world gets quiet.",
    background: "/journal.png",
    buttonLabel: "Open Journal",
    route: "/journal",
    links: [
      { label: "Recent Entries", value: "Things I Almost Said" },
      { label: "Mood", value: "late night static" },
      { label: "Archive", value: "kept thoughts" }
    ]
  },

  photography: {
    id: "photography",
    title: "Photography",
    subtitle: "moments",
    eyebrow: "desiderium / photography",
    description: "Visual fragments, edits, and the little scenes I wanted to keep.",
    background: "/camera.png",
    buttonLabel: "Open Photography",
    route: "/photography",
    links: [
      { label: "Handle", value: "@yourphotohandle" },
      { label: "Portfolio", value: "your portfolio link" },
      { label: "Camera", value: "Sony a6400" }
    ]
  },

  listening: {
    id: "listening",
    title: "Listening",
    subtitle: "what moves me",
    eyebrow: "desiderium / listening",
    description: "Songs, artists, playlists, and sounds attached to memories.",
    background: "/listening.png",
    buttonLabel: "Open Listening",
    route: "/listening",
    links: [
      { label: "Now Playing", value: "add current song" },
      { label: "Playlist", value: "Spotify playlist link" },
      { label: "Artists", value: "Quadeca, PARTYNEXTDOOR, Frank Ocean" }
    ]
  },

  about: {
    id: "about",
    title: "About Me",
    subtitle: "who I am",
    eyebrow: "desiderium / about",
    description: "A soft introduction to the person behind the site.",
    background: "/dream-bg.webp",
    buttonLabel: "Open About",
    route: "/about",
    links: [
      { label: "Currently", value: "building a digital room for my thoughts" },
      { label: "Focus", value: "writing, photos, music, memory" }
    ]
  },

  archive: {
    id: "archive",
    title: "Archive",
    subtitle: "kept thoughts",
    eyebrow: "desiderium / archive",
    description: "Older entries, drafts, photo fragments, and half-finished thoughts.",
    background: "/dream-bg.webp",
    buttonLabel: "Open Archive",
    route: "/archive",
    links: [
      { label: "2026", value: "new entries" },
      { label: "Drafts", value: "things half written" }
    ]
  },

  today: {
    id: "today",
    title: "Today",
    subtitle: "current log",
    eyebrow: "desiderium / today",
    description: "A small snapshot of what life feels like right now.",
    background: "/dream-bg.webp",
    buttonLabel: "Open Today",
    route: "/today",
    links: [
      { label: "Mood", value: "city-light brain fog" },
      { label: "Thought", value: "I keep wanting to build places instead of profiles." }
    ]
  }
};
