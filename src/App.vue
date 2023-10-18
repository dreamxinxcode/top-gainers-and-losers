<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TickerTable from './components/TickerTable.vue'
import Footer from './components/Footer.vue'
import { Ticker } from './types/Ticker'

const topGainers = ref<Ticker[] | null>(null);
const topLosers = ref<Ticker[] | null>(null);
const mostActivelyTraded = ref<Ticker[] | null>(null);
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
  <h1>Top Gainers <font-awesome-icon class='bullish' :icon="['fas', 'arrow-trend-up']" /></h1>
  <TickerTable v-if="topGainers" :tickers="topGainers" defaultSort="change_percentage"></TickerTable>

  <h1>Top Losers <font-awesome-icon class='bearish' :icon="['fas', 'arrow-trend-down']" /></h1>
  <TickerTable v-if="topLosers" :tickers="topLosers" defaultSort="change_percentage"></TickerTable>

  <h1>Most Actively Traded</h1>
  <TickerTable v-if="mostActivelyTraded" :tickers="mostActivelyTraded" defaultSort="volume"></TickerTable>

  <Footer :lastUpdated="lastUpdated" @refreshData="fetchMarketData">
  </Footer>
</template>

<style scoped lang="scss">

</style>
