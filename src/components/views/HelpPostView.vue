<template>
  <div>
    <h1>Help Post Page</h1>

    <DataTable
      ref="dt_table"
      :data="filteredTableData"
      :columns="columns"
      :options="options"
      class="table table-striped"
    />

    <div class="table-filter">
      <div class="filter-row">
        <input v-model="filters.id" placeholder="Search by ID" @input="filterTable" />
      </div>
      <div class="filter-row">
        <input v-model="filters.name" placeholder="Search by Name" @input="filterTable" />
      </div>
      <div class="filter-row">
        <input v-model="filters.website" placeholder="Search by Website" @input="filterTable" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTableCore from 'datatables.net-bs5'

import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/FirbaseConfig.js'

const datatable = DataTable
datatable.use(DataTableCore)

const tableData = [
  { id: 1, name: 'Company A', website: 'https://example.com/' },
  { id: 2, name: 'Company B', website: 'https://example.com/' },
  { id: 3, name: 'Company C', website: 'https://example.com/' },
  { id: 4, name: 'Company D', website: 'https://example.com/' },
  { id: 5, name: 'Company E', website: 'https://example.com/' },
  { id: 6, name: 'Company F', website: 'https://example.com/' },
  { id: 7, name: 'Company G', website: 'https://example.com/' }
]

const columns = [
  { title: 'ID', data: 'id' },
  { title: 'Name', data: 'name' },
  { title: 'Website', data: 'website' }
]

const options = {
  paging: true,
  searching: true,
  ordering: true,
  info: true,
  lengthChange: true,
  pageLength: 10,
  lengthMenu: [5, 10, 25, 50, 100],
  order: [[0, 'asc']],
  autoWidth: true,
  responsive: true
}

const filters = ref({ id: '', name: '', website: '' })

const filteredTableData = computed(() => {
  return tableData.filter((item) => {
    return (
      (item.id.toString().includes(filters.value.id) || filters.value.id === '') &&
      (item.name.toLowerCase().includes(filters.value.name.toLowerCase()) ||
        filters.value.name === '') &&
      (item.website.toLowerCase().includes(filters.value.website.toLowerCase()) ||
        filters.value.website === '')
    )
  })
})

function filterTable() {
  filteredTableData.value
}
</script>

<style scoped>
.table {
  width: 100%;
  margin-top: 20px;
}

.table-filter {
  display: flex;
  justify-content: space-between;
  margin-top: 10px; /* Add space above the filters */
  margin-bottom: 20px; /* Add space below the filters */
}

.filter-row {
  flex: 1;
  margin-right: 10px;
}

.filter-row:last-child {
  margin-right: 0;
}

.filter-row input {
  width: 100%;
}

/* 添加对齐样式 */
.table-filter input {
  text-align: left; /* 输入框文本左对齐 */
  padding: 8px; /* 输入框内边距 */
  box-sizing: border-box; /* 确保边框和内边距不会影响输入框宽度 */
}
</style>
