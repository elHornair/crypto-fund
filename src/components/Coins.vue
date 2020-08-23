<template>
  <div class="coins">
    <h1 class="text-3xl py-4 border-b mb-10">{{ title }}</h1>

    <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
      <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
        <thead>
          <tr class="text-left">
              <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                ID
              </th>
              <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Name
              </th>
              <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Current Price
              </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coin in coinsList" :key="coin.id">
            <td class="border-dashed border-t border-gray-200">
              <span class="text-gray-700 px-6 py-3 flex items-center">{{coin.id}}</span>
            </td>
            <td class="border-dashed border-t border-gray-200">
              <span class="text-gray-700 px-6 py-3 flex items-center">{{coin.name}}</span>
            </td>
            <td class="border-dashed border-t border-gray-200">
              <span class="text-gray-700 px-6 py-3 flex items-center">{{coin.current_price}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Coins',
  props: {
    title: String,
    coinsList: Array
  }
}
</script>
