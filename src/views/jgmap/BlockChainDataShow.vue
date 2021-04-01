<template>
  <div class="wrap">
    <p v-if="noData">暂无数据</p>
    <table
      v-else
      style="color:#fff;width:100%;"
    >
      <tr class="title" style="font-size:14px;background:#2F2A88;">
        <th style="width:50%">节点名称</th>
        <th style="width:25%">节点状态</th>
        <th style="width:25%">存证数量</th>
      </tr>
      <tr v-for="(item,index) in tableData" :key="index" class="row" style="font-size:12px">
        <td class="col">{{ item.name }}</td>
        <td class="col">{{ item.status }}</td>
        <td class="col">{{ item.num }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

import { blockChainDataShow } from '@/api/jgmap'
export default {
  data() {
    return {
      noData: false,
      tableData: []
    }
  },
  mounted() {
    blockChainDataShow().then(res => {
      this.tableData = res
      if (this.tableData.length <= 0) {
        this.noData = true
      }
    })
  },
  methods() {}
}
</script>
<style lang="scss">
.wrap{
  height: 250px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  table,table tr th, table tr td { border:1px solid #0094ff; }
  table { width: 200px; min-height: 25px; line-height: 25px; text-align: center; border-collapse: collapse;}
}
</style>>
