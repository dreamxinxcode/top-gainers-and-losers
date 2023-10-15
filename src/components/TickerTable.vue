<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';
import { Ticker } from '../types/Ticker';
import { SortSettings } from '../types/SortSettings';

const props = defineProps<{ tickers: Ticker[] }>()

const sortSettings = ref<SortSettings>({
    ticker: null,
    price: null,
    change_amount: null,
    change_percentage: null,
    volume: null,
});

const sortIcon = computed(() => (column: keyof Ticker) => {
    if (sortSettings.value[column] === 'asc') {
        return ['fas', 'sort-up'];
    } else if (sortSettings.value[column] === 'desc') {
        return ['fas', 'sort-down'];
    } else {
        return ['fas', 'sort'];
    }
});

const directionIcon = computed(() => (change: string) => {
    const numberValue = parseFloat(change);
    if (numberValue > 0) {
        return ['fas', 'chevron-up'];
    } else if (numberValue < 0) {
        return ['fas', 'chevron-down'];
    } else {
        return '';
    }
});

const sort = (column: keyof Ticker): void => {
    const sortOrder = sortSettings.value[column];
    const ascending = sortOrder === 'asc';

    // Clear sort settings for all other columns - resets the icons
    for (const key in sortSettings.value) {
        if (key !== column) {
            sortSettings.value[key as keyof SortSettings] = null;
        }
    }

    props.tickers.sort((a, b) => {
        if (isNumericString(a[column]) && isNumericString(b[column])) {
            // If both strings are numeric, convert and compare them as numbers
            const numA = parseFloat(a[column].replace('%', '')) || 0;
            const numB = parseFloat(b[column].replace('%', '')) || 0;
            return ascending ? numA - numB : numB - numA;
        } else {
            // Alphanumeric sorting for non-numeric strings
            return ascending ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
        }
    });

    // Alternate sort direction
    sortSettings.value[column] = sortOrder === 'asc' ? 'desc' : 'asc';
}

const isNumericString = (value: string): boolean => {
    return /^\s*-?\d+(\.\d+)?\s*(%|NaN)?\s*$/.test(value);
}

const getChangeClass = (value: string): string => {
    const parsedValue = parseFloat(value.replace('%', '')) || 0;

    if (parsedValue > 0) {
        return 'bullish';
    } else if (parsedValue < 0) {
        return 'bearish';
    }
    return ''; // If parsed value is NaN or 0 add no class
}
</script>

<template>
    <table>
        <th @click="sort('ticker')">
            Ticker <span><font-awesome-icon :icon="sortIcon('ticker')"/></span>
        </th>
        <th @click="sort('price')">
            Price <font-awesome-icon :icon="sortIcon('price')"/>
        </th>
        <th @click="sort('change_amount')">
            Change <font-awesome-icon :icon="sortIcon('change_amount')"/>
        </th>
        <th @click="sort('change_percentage')">
            Change % <font-awesome-icon :icon="sortIcon('change_percentage')"/>
        </th>
        <th @click="sort('volume')">
            Volume <font-awesome-icon :icon="sortIcon('volume')"/>
        </th>
        <tr v-for="ticker of tickers">
            <td>{{ ticker.ticker }} <font-awesome-icon v-if="ticker.change_amount !== '0.0'" :class="getChangeClass(ticker.change_amount)" :icon="directionIcon(ticker.change_amount)" /></td>
            <td>${{ ticker.price }}</td>
            <td :class="getChangeClass(ticker.change_amount)">{{ ticker.change_amount }}</td>
            <td :class="getChangeClass(ticker.change_amount)">{{ ticker.change_percentage }}</td>
            <td>{{ ticker.volume }}</td>
        </tr>
    </table>
</template>

<style scoped lang="scss">
table {
    border-collapse: collapse; /* Remove spacing between cells */
}

th {
    padding: 0rem 4rem;
    &:hover {
        cursor: pointer;
    }
}

td {
    padding: .5rem 0rem;
}

/* Alternate row color */
tr:nth-child(even) {
    background-color: #0f121b;
}
</style>