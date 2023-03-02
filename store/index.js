import axios from "axios";
import Vuex from "vuex";
import { API_KEY, API_URL } from "./constants";

const createStore = () => {
  return new Vuex.Store({
    state: {
      movies: [],
      movie: [],
      genres: [],
      discoverMovies: [],
      review: [],
      recommendationsMovies: [],
      popularMovies: [],
      page: 1,
      urlFilter: null,
      hideDropdownSearch: true,
      search: [],
    },
    mutations: {
      setMovies(state, movies) {
        state.movies = movies;
      },
      setSearch(state, search) {
        state.search = search;
      },
      setDropdownSearch(state, hideDropdownSearch) {
        state.hideDropdownSearch = hideDropdownSearch;
      },
      setPage(state, page) {
        state.page = page;
      },
      setUrlFilter(state, urlFilter) {
        state.urlFilter = urlFilter;
      },
      setPopularMovies(state, popularMovies) {
        state.popularMovies = popularMovies;
      },
      setReview(state, review) {
        state.review = review;
      },
      setDiscoverMovies(state, discoverMovies) {
        state.discoverMovies = discoverMovies;
      },
      setRecommendationsMovies(state, recommendationsMovies) {
        state.recommendationsMovies = recommendationsMovies;
      },
      setGenres(state, genres) {
        state.genres = genres;
      },
      setMovie(state, movie) {
        state.movie = movie;
      },
    },
    actions: {
      async nuxtServerInit({ dispatch }) {
        await dispatch("getGenres");
        await dispatch("getPopularMovies");
        await dispatch("getDiscoverMovies");
      },
      async getPopularMovies({ state, commit }) {
        const res = await axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data = res.data.results.slice(0, 5).map((movie) => {
          const genre = state.genres.find((g) => g.id === movie.genre_ids[0]);
          return { ...movie, genre: genre?.name };
        });

        commit("setPopularMovies", data);
      },
      async getDiscoverMovies({ state, commit }, sort = "popularity.desc") {
        const res = await axios.get(
          `${API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=1&sort_by=${sort}`,
        );
        const data = res.data.results.map((movie) => {
          const genre = state.genres.find((g) => g.id === movie.genre_ids[0]);
          return { ...movie, genre: genre?.name };
        });

        commit("setDiscoverMovies", data);
        commit("setMovies", data);
        commit("setPage", res.data.page);
      },
      async filterMovies({ state, commit }, filtering) {
        const sortBy = filtering.sorter || "popularity.desc";

        let filterGenres = "";
        if (filtering.filter) {
          const genres = state.genres.filter((g) => filtering.filter.includes(g.name));
          filterGenres = `&with_genres=${genres.map((g) => g.id).join(",")}`;
        }

        const url = `${API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${
          state.page
        }&sort_by=${sortBy}${filterGenres}&page=${filtering.next ? state.page + 1 : state.page}`;
        commit("setUrlFilter", url);

        const res = await axios.get(url);
        const data = res.data.results.map((movie) => {
          const genre = state.genres.find((g) => g.id === movie.genre_ids[0]);
          return { ...movie, genre: genre?.name };
        });

        commit("setPage", res.data.page);
        commit("setMovies", filtering.next ? [...state.movies, ...data] : data);
      },
      async getRecommendationsMovies({ state, commit }, id) {
        const res = await axios.get(`${API_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`);
        const data = res.data.results.map((movie) => {
          const genre = state.genres.find((g) => g.id === movie.genre_ids[0]);
          return { ...movie, genre: genre?.name };
        });

        commit("setRecommendationsMovies", data);
      },
      async getSingleMovie(vuexContext, id) {
        return await axios
          .get(`${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&page=1`)
          .then((response) => {
            let data = response.data;
            let genres = data.genres;
            let arrGenreName = "";
            if (genres.length < 2) {
              arrGenreName += genres[0].name;
            } else if (genres.length === 2) {
              arrGenreName += `${genres[0].name} and ${genres[1].name}`;
            } else {
              for (let i = 0; i < genres.length; i++) {
                arrGenreName += i !== genres.length - 1 ? `${genres[i].name}, ` : `and ${genres[i].name} `;
              }
            }
            data.genre_name = arrGenreName;

            vuexContext.commit("setMovie", data);
          })
          .catch((e) => {
            throw e;
          });
      },
      async getReviewMovie({ commit }, id) {
        const res = await axios.get(`${API_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`);

        let data = res.data.results;
        if (data.length > 4) {
          data = data.slice(0, 4);
        }

        commit("setReview", data);
      },
      async searchMovie({ commit }, query) {
        const res = await axios.get(`${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`);

        let data = res.data.results;
        if (data.length > 1) {
          for (let i = 0; i < data.length; i++) {
            const regex = new RegExp(query.split("").join("-?"), "i");
            data[i].content = data[i].title.replace(regex, (match) => "<b>" + match + "</b>");
          }
        }

        commit("setSearch", data.slice(0, 7));
        commit("setDropdownSearch", false);
      },
      async getGenres({ commit }) {
        const res = await axios.get(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US&page=1`);
        commit("setGenres", res.data.genres);
      },
    },
    getters: {
      loadMovies: (state) => {
        return state.movies;
      },
      popularMovies: (state) => {
        return state.popularMovies;
      },
      movie: (state) => {
        return state.movie;
      },
      page: (state) => {
        return state.page;
      },
      discoverMovies: (state) => {
        return state.discoverMovies;
      },
      recommendationsMovies: (state) => {
        return state.recommendationsMovies;
      },
      genres: (state) => {
        return state.genres;
      },
      review: (state) => {
        return state.review;
      },
      search: (state) => {
        return state.search;
      },
      hideDropdownSearch: (state) => {
        return state.hideDropdownSearch;
      },
    },
  });
};

export default createStore;
