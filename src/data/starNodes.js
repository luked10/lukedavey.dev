// Constellation order (used to draw connector arcs in order):
// About → Journal → Photography → Listening → Today → Archive
export const starNodes = [
  {
    id: "about",
    title: "About Me",
    subtitle: "who I am",
    content: "A soft introduction.",
    x: "13%",
    y: "50%",
    delay: 0
  },
  {
    id: "journal",
    title: "Journal",
    subtitle: "",
    content: "Longer reflections.",
    x: "24%",
    y: "15%",
    delay: 0.3
  },
  {
    id: "photography",
    title: "Photography",
    subtitle: "moments",
    content: "Visual memories.",
    x: "76%",
    y: "16%",
    delay: 0.6
  },
  {
    id: "listening",
    title: "Listening",
    subtitle: "what moves me",
    content: "Music + writing.",
    x: "88%",
    y: "47%",
    delay: 0.9
  },
  {
    id: "today",
    title: "Today",
    subtitle: "current log",
    content: "Daily thoughts.",
    x: "80%",
    y: "70%",
    delay: 1.2
  },
  {
    id: "archive",
    title: "Archive",
    subtitle: "kept thoughts",
    content: "Older entries.",
    x: "90%",
    y: "88%",
    delay: 1.5
  }
];
