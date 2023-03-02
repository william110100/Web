<template>
  <div
    class="flex items-center justify-center"
    v-if="section === 'carousel'">
    <img
      :alt="title"
      class="h-[364px] w-[243px]"
      :src="`https://image.tmdb.org/t/p//w300/${poster}`" />
    <div class="py-4 w-[500px]">
      <div class="bg-black h-[324px] p-4">
        <div class="flex gap-2 items-center">
          <img
            alt="Star"
            class="w-4"
            src="@/static/star.svg" />
          <span class="font-bold text-lg text-white">{{ rating }}</span>
        </div>
        <span class="font-medium text-3xl text-white">{{ title }}</span>
        <div class="flex gap-2 items-center">
          <span class="text-white">{{ year }}</span>
          <span class="bg-white/[.5] h-1.5 rounded-full w-1.5"></span>
          <span class="font-medium text-white">{{ genre }}</span>
        </div>
        <div class="mt-2">
          <p class="font-medium text-xs text-white">{{ overview.slice(0, 200) }}...</p>
        </div>
      </div>
    </div>
  </div>
  <div
    class="w-[220px]"
    v-else>
    <div
      class="relative"
      href=""
      v-for="i in 1"
      @mouseout="showByIndex = null"
      @mouseover="showByIndex = i">
      <img
        :alt="title"
        class="h-[330px] w-[220px]"
        :src="`https://image.tmdb.org/t/p//w300/${poster}`"
        v-if="poster" />
      <img
        :alt="title"
        class="h-80 w-[220px]"
        src="@/static/placeholder.jpg"
        v-else />
      <div class="absolute bg-[#1E232B] px-2.5 py-[5px] right-0 top-0">
        <span class="font-bold text-lg text-[#E5E5E5]">{{ formatDecimal }}</span>
      </div>
      <div
        class="absolute bg-black/[.9] gap-6 flex flex-col h-full items-center justify-center top-0 w-full z-30"
        v-show="showByIndex === 1">
        <div class="flex gap-2 items-center">
          <img
            alt="Star"
            src="@/static/star.svg" />
          <span class="font-semibold text-2xl text-white">{{ formatDecimal }}</span>
        </div>
        <span class="font-semibold text-lg text-white">{{ genre }}</span>
        <NuxtLink :to="`/detail/${id}`">
          <Button title="VIEW" />
        </NuxtLink>
      </div>
    </div>
    <div class="flex flex-col mt-3.5">
      <span class="font-semibold text-base text-[#E5E5E5]">{{ title }}</span>
      <span class="text-sm text-[#929292]">{{ year }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "img", "section", "year", "genre", "rating", "overview", "poster", "id"],
  computed: {
    formatDecimal() {
      return this.rating?.toFixed(1);
    },
  },
  data() {
    return {
      showByIndex: null,
    };
  },
};
</script>
