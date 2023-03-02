<template>
  <div class="bg-black flex h-[160px] items-center justify-between px-28 w-full xs:flex-col xs:p-4 sm:flex-col sm:p-4">
    <span class="text-[#929292]">&copy; {{ currentYear }} MoovieTime. All rights reserved.</span>
    <img
      alt="MoovieTime"
      src="@/static/icon-xs.svg" />
    <span class="text-[#929292]">Made with William</span>
  </div>
</template>

<script>
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>
