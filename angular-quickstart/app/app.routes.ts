import {provideRouter,RouterConfig} from '@angular/router';
import {CheckboxDemo} from './checkbox/checkboxdemo';
import {BarChart} from './d3/bar.component'
export const routes: RouterConfig = [
    {path: 'checkbox', component: CheckboxDemo},
    {path: 'barchart', component: BarChart}
];
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];