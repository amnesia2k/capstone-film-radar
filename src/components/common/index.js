import { Search } from "lucide-react"; // Import the Lucide icon

export const navLinks = [
  {
    id: 1,
    name: "Home",
    link: "/",
    tooltip: "Home"
  },

  {
    id: 2,
    name: "Movies",
    link: "/movies",
    tooltip: "Movies"
  },

  {
    id: 3,
    name: "TV Shows",
    link: "/tv",
    tooltip: "TV Shows"
  },

  {
    id: 4,
    name: "Search",
    link: "/search",
    tooltip: "Search",
    icon: Search, // Add the Lucide icon here
  },
];
