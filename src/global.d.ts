import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js/dist/instantsearch.production.min';
import { Analytics } from "@vercel/analytics/next"

declare global {
  interface Window {
    algoliasearch: typeof algoliasearch;
    instantsearch: typeof instantsearch;
  }
}
