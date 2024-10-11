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
  { id: 1, name: 'Help Post A', website: 'https://example.com/' },
  { id: 2, name: 'Help Post B', website: 'https://example.com/' },
  { id: 3, name: 'Help Post C', website: 'https://example.com/' },
  { id: 4, name: 'Help Post D', website: 'https://example.com/' },
  { id: 5, name: 'Help Post E', website: 'https://example.com/' },
  { id: 6, name: 'Help Post F', website: 'https://example.com/' },
  { id: 7, name: 'Help Post G', website: 'https://example.com/' },
  { id: 8, name: 'Help Post H', website: 'https://example.com/' },
  { id: 9, name: 'Help Post I', website: 'https://example.com/' },
  { id: 10, name: 'Help Post J', website: 'https://example.com/' },
  { id: 11, name: 'Help Post K', website: 'https://example.com/' }
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
  margin-top: 10px;
  margin-bottom: 20px;
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

.table-filter input {
  text-align: left;
  padding: 8px;
  box-sizing: border-box;
}
</style>
