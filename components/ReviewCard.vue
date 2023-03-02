<template>
  <div class="bg-[#F9F9F9] p-6 rounded-2xl hover:bg-gray-100">
    <div class="flex justify-between">
      <div class="flex gap-4">
        <img
          :alt="name"
          class="rounded-full w-[48px]"
          :src="`https://image.tmdb.org/t/p//w300/${avatar}`" />
        <div class="flex flex-col justify-center">
          <span class="font-bold text-sm">{{ name }}</span>
          <span class="text-xs text-[#666666]">{{ formatDate }}</span>
        </div>
      </div>
      <div class="bg-[#C4C4C4]/[.3] flex gap-2 px-4 py-2 rounded-lg">
        <img
          alt="Star"
          class="w-[18px]"
          src="@/static/star.svg" />
        <span class="font-semibold text-4xl">{{ formatDecimal ?? 0.0 }}</span>
      </div>
    </div>
    <div class="flex mt-4">
      <p class="italic text-sm truncate-1">
        {{ truncateText }}
        <span
          class="cursor-pointer text-sm text-[#E74C3C]"
          @click="expandParagraph">
          {{ isExpanded ? "Show less" : "Read the rest" }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  props: ["name", "date", "rating", "comment", "avatar"],
  computed: {
    formatDecimal() {
      return this.rating?.toFixed(1);
    },
    formatDate() {
      const date = new Date(this.date);
      return format(date, "MMMM d, yyyy");
    },
    truncateText() {
      return this.isExpanded ? this.comment : `${this.comment.slice(0, 300)}...`;
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    expandParagraph() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>
