import { Search } from "lucide-react"; // Import the Lucide icon

export const navLinks = [
  {
    id: 1,
    name: "Home",
    link: "/",
    tooltip: "Home",
  },

  {
    id: 2,
    name: "Movies",
    link: "/movies",
    tooltip: "Movies",
  },

  {
    id: 3,
    name: "TV Shows",
    link: "/tv",
    tooltip: "TV Shows",
  },

  {
    id: 4,
    name: "Search",
    link: "/search",
    tooltip: "Search",
    icon: Search, // Add the Lucide icon here
  },
];

export const mobileNavLinks = [
  {
    id: 1,
    name: "Home",
    link: "/",
    tooltip: "Home",
  },

  {
    id: 2,
    name: "Movies",
    link: "/movies",
    tooltip: "Movies",
  },

  {
    id: 3,
    name: "TV Shows",
    link: "/tv",
    tooltip: "TV Shows",
  },
];

export const footerLinks = [
  {
    label: "Github",
    href: "https://github.com/amnesia2k",
  },
  {
    label: "Twitter",
    href: "https://x.com/@ola_the_dev",
  },
  {
    label: "Contact",
    href: "mailto:tilewaolatoye17@gmail.com",
  },
  {
    label: "API",
    href: "https://developer.themoviedb.org/reference/intro/getting-started",
  },
];
