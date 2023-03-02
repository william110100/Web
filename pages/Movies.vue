<template>
  <div>
    <Header />
    <div class="bg-black/[.8] px-8 py-[100px] xl:px-28 2xl:px-28">
      <span class="border-t-[6px] border-t-[#E74C3C] font-semibold text-[#E5E5E5] text-[36px]">Movies</span>
      <div class="flex gap-4 mt-14 xs:flex-col">
        <Sort />
        <div class="flex flex-col items-center w-full">
          <div
            class="gap-x-6 gap-y-9 grid justify-items-center mb-16 w-fit md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
            <Card
              :title="item.title"
              :rating="item.vote_average"
              :year="item.release_date?.split('-')?.[0]"
              :overview="item.overview"
              :genre="item.genre"
              :poster="item.poster_path"
              section="discover"
              :id="item.id"
              v-for="(item, index) in loadMovies"
              :key="index" />
          </div>
          <Button
            title="Load More"
            v-on:click.native="loadMore()" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: "MoviesPage",
  created() {
    this.$store.dispatch("nuxtServerInit");
  },
  data() {
    return {
      data: [],
      discoverData: [],
    };
  },
  computed: {
    loadMovies() {
      return this.$store.getters.loadMovies;
    },
  },
  methods: {
    async loadMore() {
      await this.$store.dispatch("filterMovies", {
        sorter: null,
        filter: null,
        next: true,
      });
    },
  },
};
</script>
