<template>
  <nav
    :class="`fixed ${
      content !== 'detail' ? 'bg-white/5' : 'bg-transparent'
    } flex items-center justify-between h-16 px-8 w-full z-10 xl:px-28 2xl:px-28`"
    id="nav">
    <img
      alt="MoovieTime"
      class="cursor-pointer"
      @click="moveToHome()"
      src="@/static/icon-md.svg" />
    <div class="hidden lg:block lg:w-[400px] xl:block xl:w-[400px] 2xl:block 2xl:w-[400px]">
      <label
        class="sr-only"
        for="default-search"
        >Search</label
      >
      <div class="relative">
        <div class="absolute inset-y-0 pointer-events-none ml-3 top-1/2 transform -translate-y-1/2">
          <img
            alt="Movie"
            src="@/static/movie.svg" />
        </div>
        <input
          class="bg-black/[.2] h-10 pl-12 p-4 rounded text-white w-full"
          id="default-search"
          placeholder="Find Movie"
          required
          type="search"
          v-on:click="toggleSearch()"
          v-on:keyup="autocompleteSearch($event)" />
        <div class="absolute pointer-events-none mr-2 right-0 top-1/2 transform -translate-y-1/2">
          <img
            alt="Search"
            class=""
            src="@/static/search.svg" />
        </div>
        <div :class="`${hideDropdownSearch && 'hidden'} absolute bg-black rounded w-full z-10`">
          <ul class="text-sm text-[#E5E5E5]">
            <li
              v-for="(item, index) in search"
              :key="index">
              <NuxtLink :to="`/detail/${item.id}`">
                <div
                  class="block py-2 px-4 text-sm"
                  v-html="item.content"></div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="flex gap-3 items-center justify-center"
      data-dropdown-toggle="dropdown"
      @click="toggleDropdown()">
      <div class="cursor-pointer gap-3 flex items-center justify-center">
        <img
          alt="Menu"
          src="@/static/grid-menu.svg" />
        <span class="font-semibold text-[#E5E5E5] uppercase">categories</span>
      </div>
      <div
        :class="`${hideDropdown && 'hidden'} absolute bg-white rounded-md top-16 w-[180px] z-10`"
        id="dropdown">
        <ul class="py-2 w-40">
          <li
            v-for="(item, index) in categories"
            :key="index">
            <a
              class="block font-semibold px-4 py-2 uppercase hover:bg-gray-200"
              href=""
              >{{ item }}</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div
      v-for="(item, index) in navigationItems"
      :key="index">
      <NuxtLink :to="item.to">
        <span class="font-semibold text-[#E5E5E5] uppercase">{{ item.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["content"],
  data() {
    return {
      hideDropdown: true,
      message: null,
      debounce: null,
      categories: [
        "action",
        "adventure",
        "animation",
        "comedy",
        "crime",
        "documentary",
        "drama",
        "family",
        "fantasy",
        "history",
        "horror",
      ],
      navigationItems: [
        {
          label: "movies",
          to: "/movies",
        },
        {
          label: "tv show",
          to: "",
        },
        {
          label: "login",
          to: "",
        },
      ],
    };
  },
  methods: {
    moveToHome() {
      this.$router.push("/");
    },
    toggleDropdown() {
      this.hideDropdown = !this.hideDropdown;
    },
    toggleSearch() {
      this.$store.commit(
        "setDropdownSearch",
        this.$store.state.search.length !== 0 ? !this.$store.state.hideDropdownSearch : false,
      );
    },
    async autocompleteSearch(event) {
      this.message = null;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        this.typing = null;
        this.message = event.target.value;
        await this.$store.dispatch("searchMovie", event.target.value);
      }, 600);
    },
  },
  mounted() {
    let content = this.content;
    this.$nextTick(function () {
      window.addEventListener("scroll", function () {
        let navbar = document.getElementById("nav");
        let nav_classes = navbar.classList;
        if (content === "detail") {
          nav_classes.toggle("bg-dark-400");
          nav_classes.toggle("bg-black-200");
        }
      });
    });
  },
  computed: {
    hideDropdownSearch() {
      return this.$store.getters.hideDropdownSearch;
    },
    search() {
      return this.$store.getters.search;
    },
  },
};
</script>
