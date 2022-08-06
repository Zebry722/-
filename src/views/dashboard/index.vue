<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <div class="box">hahah</div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  //   name: "Dashboard",
  //   computed: {
  //     ...mapGetters(["name"]),
  //   },
};
</script>

<style lang="scss" scoped>
$title-color: #333;
$title-width: 100px;
$title-font-size: 30px;
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.box {
  color: $title-color;
  width: $title-width;
  font-size: $title-font-size;
}
</style>
