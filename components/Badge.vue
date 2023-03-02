<template>
  <div :class="`${active ? 'bg-[#FF0000]' : 'bg-black/20'} cursor-pointer px-4 py-2 rounded-full`">
    <span class="font-semibold text-[#E5E5E5]">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: ["active", "title"],
};
</script>
