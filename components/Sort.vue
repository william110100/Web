<template>
  <div class="bg-black h-fit rounded-lg w-80 xs:w-full">
    <div class="p-5">
      <span class="font-semibold text-base text-[#E5E5E5]">Sort Result By</span>
    </div>
    <div class="border-y p-5">
      <select
        id="sorted"
        class="bg-gray-800 p-2.5 rounded text-[#E5E5E5] w-full"
        @change="onChange($event)"
        v-model="key">
        <option value="popularity.asc">Popularity Ascending</option>
        <option value="popularity.desc">Popularity Descending</option>
        <option value="primary_release_date.asc">Released Date Ascending</option>
        <option value="primary_release_date.desc">Released Date Descending</option>
        <option value="vote_average.asc">Rating Ascending</option>
        <option value="vote_average.desc">Rating Descending</option>
      </select>
    </div>
    <div class="border-b px-5 py-2.5">
      <span class="font-semibold text-base text-[#E5E5E5]">Genres</span>
    </div>
    <div
      :class="`${index === 0 && 'pt-5'} flex items-center justify-between pb-5 px-5`"
      v-for="(item, index) in data"
      :key="index">
      <span
        class="text-sm text-white"
        :for="item.value"
        >{{ item.label }}</span
      >
      <input
        :id="item.value"
        type="checkbox"
        :value="item.value"
        :checked="item.checked"
        @change="check($event)" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { label: "Action", value: "Action", checked: false },
        { label: "Adventure", value: "Adventure", checked: false },
        { label: "Animation", value: "Animation", checked: false },
        { label: "Comedy", value: "Comedy", checked: false },
        { label: "Crime", value: "Crime", checked: false },
        { label: "Documentary", value: "Documentary", checked: false },
        { label: "Drama", value: "Drama", checked: false },
        { label: "Family", value: "Family", checked: false },
        { label: "Fantasy", value: "Fantasy", checked: false },
        { label: "History", value: "History", checked: false },
        { label: "Horror", value: "Horror", checked: false },
      ],
      key: "popularity.desc",
    };
  },
  methods: {
    async onChange(event) {
      this.key = event.target.value;
      await this.$store.dispatch("filterMovies", {
        sorter: this.key,
        filter: null,
        next: false,
      });
    },
    async check(event) {
      this.data.map((dt) => {
        dt.value === event.target.value && (dt.checked = event.target.checked);
      });
      let filter = this.data.map((dt) => dt.checked && dt.value);
      await this.$store.dispatch("filterMovies", {
        sorter: this.key,
        filter,
        next: false,
      });
    },
  },
};
</script>
