const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'JRP80R92DD',
  '825a3f887a1e21f7297bee0de5a540b7'
);

const search = instantsearch({
  indexName: 'algolia_movie_sample_dataset',
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit, { html, components }) => html`
        <article>
          <img src=${hit.poster_path} alt=${hit.title} />
          <div>
            <h1>${components.Highlight({ hit, attribute: 'title' })}</h1>
            <p>${components.Highlight({ hit, attribute: 'overview' })}</p>
          </div>
        </article>
      `,
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
