import { blogPosts } from './blogPosts'

export const sections = {
  journal: {
    id: 'journal',
    title: blogPosts.hanSoloBurger.title,
    subtitle: blogPosts.hanSoloBurger.subtitle,
    eyebrow: 'Journal',
    description: 'some thoughts',
    background: '/journal.png',
    buttonLabel: 'Open Journal',
    route: '/journal',
    requiresPassword: true,
    content: blogPosts.hanSoloBurger.content,
    links: []
  },

  photography: {
    id: "photography",
    title: "Photography",
    subtitle: "moments",
    eyebrow: "lukedavey / photography",
    description: "",
    background: "/camera.png",
    buttonLabel: "Open Photography",
    route: "/photography",
    links: [
      { label: "Handle", value: "@luke_photography_999" },
      { label: "Portfolio", value: "coming soon" },
      { label: "Camera", value: "Sony a6400" }
    ]
  },

  listening: {
    id: "listening",
    title: "Listening",
    subtitle: "what moves me",
    eyebrow: "lukedavey / listening",
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
    eyebrow: "lukedavey / about",
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
    eyebrow: "lukedavey / archive",
    description: "Older entries, drafts, photo fragments, and half-finished thoughts.",
    background: "/dream-bg.webp",
    buttonLabel: "Open Archive",
    route: "/archive",
    links: [
      { label: "2026", value: "new entries" },
      { label: "Drafts", value: "things half written" }
    ]
  }
};
