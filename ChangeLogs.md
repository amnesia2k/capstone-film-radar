# ChangeLogs

## Pull Request: Development Branch

**Branch:** dev branch  
**Date Created:** December 13, 2024  
**Merged into:** master

### Summary of Changes:

1. **Project Setup:**

   - Initialized project structure and environment using React with Vite.
   - Configured Tailwind CSS and ShadCN UI for styling.

2. **Feature Implementation:**

   - **Search Movies:** Implemented a dynamic search bar to find movies and TV shows by title, genre, or release year.
   - **Movie Details Page:** Developed a detailed page to display movie synopses, cast, ratings, and release dates.
   - **Trending Content:** Integrated trending movies and TV shows section on the homepage using the TMDB API.
   - **Watchlist:** Added functionality for users to manage a watchlist (requires login).
   - **Filter by Genre:** Created a filter feature to allow users to browse movies by genre and other categories.
   - **Trailers:** Added trailers to the movie details page for a more engaging user experience.

3. **Authentication:**

   - Integrated Firebase Authentication for user login and registration.
   - Implemented user-specific data management for watchlists.

4. **API Integration:**

   - Connected the TMDB API to fetch movie data, including trending, top-rated, and detailed information.

5. **Responsive Design:**

   - Ensured responsive UI across devices using Tailwind CSS.

6. **Deployment:**
   - Deployed the project on Netlify for live access.

### Next Steps:

- Implement a reviews and ratings system.
- Enhance filtering capabilities with additional options like runtime and language.
- Optimize the app for better performance and load times.
