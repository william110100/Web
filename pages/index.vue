<template>
  <div>
    <Header />
    <div class="bg-black/[.9] pt-28 xs:hidden sm:hidden">
      <carousel
        :autoplay="true"
        :autoplayTimeout="5000"
        :centerMode="true"
        :loop="true"
        :per-page="3">
        <slide
          v-for="(item, index) in popularMovies"
          :key="index"
          ><Card
            :title="item.title"
            :rating="item.vote_average"
            :year="item.release_date?.split('-')?.[0]"
            :overview="item.overview"
            :genre="item.genre"
            :poster="item.poster_path"
            section="carousel"
        /></slide>
      </carousel>
    </div>
    <div class="bg-black/[.8] px-8 py-[100px] xl:px-28 2xl:px-28">
      <div class="flex justify-between mb-11">
        <span class="border-t-[6px] border-t-[#E74C3C] font-semibold text-[#E5E5E5] text-[24px]">Discover Movies</span>
        <div class="flex gap-x-5">
          <Badge
            title="Popularity"
            :active="popularity"
            v-on:click.native="changeSortir('popularity.desc')" />
          <Badge
            title="Release Date"
            :active="date"
            v-on:click.native="changeSortir('primary_release_date.asc')" />
        </div>
      </div>
      <div
        class="gap-x-6 gap-y-9 grid grid-cols-5 justify-items-center xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card
          :title="item.title"
          :rating="item.vote_average"
          :year="item.release_date?.split('-')?.[0]"
          :overview="item.overview"
          :genre="item.genre"
          :poster="item.poster_path"
          section="discover"
          :id="item.id"
          v-for="(item, index) in discoverMovies"
          :key="index" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  created() {
    this.$store.dispatch("nuxtServerInit");
  },
  data() {
    return {
      data: [],
      discoverData: [],
      popularity: true,
      date: false,
    };
  },
  computed: {
    popularMovies() {
      return this.$store.getters.popularMovies;
    },
    discoverMovies() {
      return this.$store.getters.discoverMovies;
    },
  },
  methods: {
    async changeSortir(val) {
      val === "primary_release_date.asc"
        ? ((this.date = true), (this.popularity = false))
        : ((this.date = false), (this.popularity = true));
      await this.$store.dispatch("getDiscoverMovies", val);
    },
  },
};
</script>
