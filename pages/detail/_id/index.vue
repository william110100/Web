<template>
  <div>
    <Header content="detail" />
    <div
      class="bg-center bg-cover flex h-[388px]"
      :style="`background-image: url(https://image.tmdb.org/t/p//w300/${movie?.backdrop_path})`"
      v-if="movie?.backdrop_path">
      <div class="self-end">
        <div class="flex px-8 xl:px-28 2xl:px-28">
          <img
            alt=""
            class="bottom-[-200px] h-[330px] mr-7 w-[220px] relative xs:hidden sm:hidden md:hidden"
            :src="`https://image.tmdb.org/t/p//w300/${movie?.poster_path}`"
            v-if="movie?.poster_path" />
          <img
            alt=""
            class="bottom-[-200px] h-[330px] mr-7 w-[220px] relative xs:hidden sm:hidden md:hidden"
            src="@/static/placeholder.jpg"
            v-else />
          <div class="flex flex-col self-end">
            <span class="text-lg text-white">{{ getYear }}</span>
            <span class="font-semibold text-4xl text-[#E5E5E5]">{{ movie?.title }}</span>
            <span class="text-lg text-white">{{ movie?.genre_name }}</span>
          </div>
        </div>
        <div
          class="bg-black/[.5] flex items-center mt-4 px-8 py-5 w-screen xs:flex-col lg:pl-[280px] xl:pl-[360px] 2xl:pl-[360px] xl:pr-28 2xl:pr-28">
          <div class="flex">
            <div class="flex gap-4 items-center">
              <img
                alt="Star"
                src="@/static/star.svg" />
              <span class="font-semibold text-4xl text-[#E5E5E5]">{{ formatDecimal }}</span>
              <div class="flex flex-col pr-8">
                <span class="font-medium text-xs text-white/[.5] uppercase">user score</span>
                <span class="font-medium text-white text-xs uppercase">{{ movie?.vote_count }} votes</span>
              </div>
            </div>
          </div>
          <div class="border-l flex flex-col px-8">
            <span class="font-medium text-xs text-white/[.5] uppercase">status</span>
            <span class="font-medium text-white text-xs uppercase">{{ movie?.status }}</span>
          </div>
          <div class="border-l flex flex-col px-8">
            <span class="font-medium text-xs text-white/[.5] uppercase">language</span>
            <span class="font-medium text-white text-xs uppercase">{{
              movie?.spoken_languages?.[0]?.english_name
            }}</span>
          </div>
          <div class="border-l flex flex-col px-8">
            <span class="font-medium text-xs text-white/[.5] uppercase">budget</span>
            <span class="font-medium text-white text-xs uppercase">$ {{ movie?.budget }}</span>
          </div>
          <div class="border-l flex flex-col px-8">
            <span class="font-medium text-xs text-white/[.5] uppercase">production</span>
            <span class="font-medium text-white text-xs uppercase">{{ movie?.production_companies?.[0]?.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col mt-7 px-8 lg:pl-[280px] xl:pl-[360px] 2xl:pl-[360px] xl:pr-28 2xl:pr-28">
      <span class="font-semibold text-xs text-[#FF0000] uppercase">overview</span>
      <span class="mt-2 text-sm">{{ movie?.overview }}</span>
    </div>
    <div class="flex flex-col gap-5 px-8 py-14 xl:px-28 2xl:px-28">
      <span class="font-semibold text-[#FF0000] uppercase">reviews</span>
      <div
        class="gap-5 grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-1"
        v-if="review && review.length > 1">
        <div
          v-for="(item, index) in review"
          :key="index">
          <ReviewCard
            :name="item.author"
            :date="item.updated_at"
            :rating="item.author_details.rating"
            :avatar="item.author_details.avatar_path"
            :comment="item.content" />
        </div>
      </div>
    </div>

    <div class="bg-black/[.8] px-8 py-14 xl:px-28 2xl:px-28">
      <span class="font-semibold text-white uppercase">recommendation movies</span>
      <div
        class="gap-x-6 gap-y-9 grid mt-9 grid-cols-5 justify-items-center xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card
          :title="item.title"
          :rating="item.vote_average"
          :year="item.release_date?.split('-')?.[0]"
          :overview="item.overview"
          :genre="item.genre"
          :poster="item.poster_path"
          :id="item.id"
          section="recomendation"
          v-for="(item, index) in recomendationData"
          :key="index" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: "DetailPage",
  data() {
    return {
      movie: {},
      recomendationData: [],
      review: [],
    };
  },
  computed: {
    formatDecimal() {
      return this.movie?.vote_average?.toFixed(1);
    },
    getYear() {
      return new Date(this.movie?.release_date).getFullYear();
    },
  },
  async fetch() {
    await this.$store.dispatch("getSingleMovie", this.$route.params.id);
    await this.$store.dispatch("getReviewMovie", this.$route.params.id);
    await this.$store.dispatch("getRecommendationsMovies", this.$route.params.id);
    this.movie = await this.$store.state.movie;
    this.review = await this.$store.state.review;
    this.recomendationData = await this.$store.state.recommendationsMovies;
  },
};
</script>
