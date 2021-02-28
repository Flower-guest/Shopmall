<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table
      class="rule"
      v-for="(table, ruleindex) in paramInfo.rule"
      :key="ruleindex"
    >
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, index) in tr" :key="index">{{ td }}</td>
      </tr>
    </table>
    <table class="infos">
      <tr v-for="(info, infoindex) in paramInfo.info" :key="infoindex">
        <td class="info-key">{{ info.key }}</td>
        <td class="info-value">{{ info.value }}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paramInfo: {
      type: Object,
    },
  },
};
</script>

<style lang="less" scoped>
.param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
  color: @color-text;

  table {
    width: 100%;

    tr {
      height: 42px;

      td {
        border-bottom: 1px solid rgba(100, 100, 100, 0.1);
      }
    }
  }

  .info-key {
    width: 94px;
  }

  .info-value {
    color: #eb4868;
  }
  .info-img img {
    width: 100%;
  }
}
</style>