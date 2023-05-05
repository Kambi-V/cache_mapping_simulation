import PrimeVue from 'primevue/config';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.component("Dropdown", Dropdown);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("DataTable", DataTable);
  nuxtApp.vueApp.component("Column", Column);

});
