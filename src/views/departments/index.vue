<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <tree-tools :tree-node="company" :is-root="true" />
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <tree-tools
            slot-scope="{ data }"
            :treeNode="data"
            @delDepts="getDepartments"
          ></tree-tools>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools.vue";
import { getDepartmentsAPI } from "@/api/departments";
import { tranListToTreeData } from "@/utils/index";
export default {
  components: {
    TreeTools,
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: "name", // 表示 从这个属性显示内容
      },
    };
  },
  created() {
    this.getDepartments();
  },
  methods: {
    async getDepartments() {
      const result = await getDepartmentsAPI();
      this.company = { name: result.companyName, manager: "非洲" };
      this.departs = tranListToTreeData(result.depts, "");
    },
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>