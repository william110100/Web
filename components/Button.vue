<template>
  <button
    class="bg-[#FF0000] px-8 py-2 rounded-full"
    type="button">
    <span class="text-[#E5E5E5]">{{ title }}</span>
  </button>
</template>

<script>
export default {
  props: ["title"],
};
</script>
