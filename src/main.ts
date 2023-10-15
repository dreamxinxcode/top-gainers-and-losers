import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowTrendUp, faArrowTrendDown, faSort, faSortUp, faSortDown, faClock, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowTrendUp, faArrowTrendDown, faSort, faSortUp, faSortDown, faClock, faArrowsRotate)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
