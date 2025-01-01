# Movie Database

ReelsRadar is an engaging and dynamic web application designed for movie enthusiasts to explore, discover, and track their favorite films effortlessly. Built using the powerful TMDB API, ReelsRadar provides users with access to an extensive database of movies, featuring detailed information such as genres, cast, release dates, and ratings.

## Features

- **Search Movies:** Search for movies and TV shows by title, genre, or release year.
- **Movie Details:** View detailed information including synopses, cast, ratings, and release dates.
- **Favorites:** Add movies and shows to a personal favorites list for easy access.
- **Trending Content:** Discover trending movies and TV shows based on popularity.
- **Watchlist:** Create and manage a watchlist for upcoming content.
- **Filter by Genre:** Filter movies by genre, ratings, and other categories.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Shadcn/UI
- **Backend:** TMDB API (The Movie Database API) for movie data and details, Google Firebase for Authentication and Database
- **Deployment:** Netlify

## Installation

Follow the steps below to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/amnesia2k/capstone-film-radar.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd capstone-film-radar
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Access the app:**
   Open [http://localhost:9000](http://localhost:9000) in your browser.

## Usage

- **Search Movies:** Use the search bar to find movies and TV shows.
- **Explore Genres:** Browse movies by genre.
- **Add to Watchlist:** Movies can be added to your watchlist, you need to logged in for this.
- **Trending Movies:** Check out what’s trending on the homepage.
- **View Details:** Click on a movie to view its detailed page with cast, trailers, and ratings.

## Folder Structure

```
film-radar/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── lib/
│   ├── pages/
│   ├── services/
│   └── utils/
├── README.md
└── package.json
```

## API Integration

This app integrates the TMDB API to power the movie-related features, providing:

- Access to a vast movie database.
- Detailed movie information such as descriptions, cast, trailers, and ratings.
- Data about trending and top-rated movies.
- Search and filter capabilities for personalized movie exploration.

## UI

![ReelsRadar_UI_Screenshot](/public/ui_screenshot.png)

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your branch:
   ```bash
   git push -u origin feature-name
   ```
4. Open a pull request.

## Contact

For questions or feedback, feel free to reach out:

- **Project Documentation:** [Film Radar Documentation](https://docs.google.com/document/d/1q_Gc8wkJJfybNzDrqdFjBqnnXI268CSfgbt_gwGO5aE/edit?usp=sharing)
- **Email:** tilewaolatoye17@gmail.com
- **GitHub:** [amnesia2k](https://github.com/amnesia2k)
