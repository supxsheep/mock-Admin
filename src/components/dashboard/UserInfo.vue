<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>User信息</span>
      </div>
    </template>
    <div class="card-body">
      <el-descriptions direction="vertical" :column="4" :size="size" border>
        <el-descriptions-item label="用户名">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <user />
              </el-icon>
              用户名
            </div>
          </template>
          卡米尔
        </el-descriptions-item>
        <el-descriptions-item label="电话">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              电话
            </div>
          </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item label="居住地" :span="2">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <location />
              </el-icon>
              居住地
            </div>
          </template>
          苏州
        </el-descriptions-item>
        <el-descriptions-item label="标签" :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <tickets />
              </el-icon>
              标签
            </div>
          </template>
          <div class="tags">
            <el-tag size="small">vue3</el-tag>
            <el-tag type="success">pinia</el-tag>
            <el-tag type="info">axios</el-tag>
            <el-tag type="warning">elementplus</el-tag>
            <el-tag type="danger">vueuse</el-tag>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <office-building />
              </el-icon>
              联系地址
            </div>
          </template>
          中国
        </el-descriptions-item>
        <el-descriptions-item :span="4">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <office-building />
              </el-icon>
              个性签名
            </div>
          </template>
          {{ quotes }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
</template>
<script setup>
import { ref, reactive, computed, toRefs } from "vue";
import {
  Iphone,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from "@element-plus/icons-vue";

import { getQuotesApi } from "@/api/quotes";
//每日名言
const quotes = ref("");
const getQuotes = async () => {
  quotes.value = await getQuotesApi();
};
getQuotes();

//用户标签
const size = ref("");
const iconStyle = computed(() => {
  const marginMap = {
    large: "8px",
    default: "6px",
    small: "4px",
  };
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  };
});
const blockMargin = computed(() => {
  const marginMap = {
    large: "32px",
    default: "28px",
    small: "24px",
  };
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  };
});
</script>

<style scoped lang="scss">
@import "./common.scss";
.box-card {
  height: 380px;

  & ::v-deep .el-card__header {
    @include theme("border-color", "card-border-color");
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  & ::v-deep .el-card__body {
    .card-body {
      .el-descriptions {
        .el-descriptions__body {
          .el-descriptions__table {
            @include theme("background-color");
            th {
              @include theme("background-color", "card-th-background-color");
              @include theme("border-color", "card-border-color");
              @include theme("color", "theme-font-color");
            }
            td {
              @include theme("border-color", "card-border-color");
              @include theme("color", "theme-font-color");
            }
          }
        }
      }
    }
  }

  .card-body {
    .cell-item {
      display: flex;
      align-items: center;
    }
    .tags {
      .el-tag {
        margin-right: 5px;
      }
    }
  }
}
</style>
