<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Ticker } from './types/Ticker'

const topGainers = ref<Ticker[]>([]);
const topLosers = ref<Ticker[]>([]);
const mostActivelyTraded = ref<Ticker[]>([]);
const lastUpdated = ref('');

const fetchMarketData = async () => {
  try {
    const response = await fetch('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo');
    const data = await response.json();
    topGainers.value = data.top_gainers;
    topLosers.value = data.top_losers;
    mostActivelyTraded.value = data.most_actively_traded;
    lastUpdated.value = data.last_updated;
  } catch(error) {
    console.error('Error:', error);
  }
};

onMounted(() => {
  fetchMarketData();
});
</script>

<template>

</template>

<style scoped lang="scss">

</style>
