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

  // Genre Filter (Refinement List)
  instantsearch.widgets.refinementList({
    container: '#genre-filter',
    attribute: 'genres',
    searchable: true,
    showMore: true,
  }),

  // Language Filter (Menu)
  instantsearch.widgets.menu({
    container: '#language-filter',
    attribute: 'original_language',
  }),

  // Rating Filter (Range Slider)
  instantsearch.widgets.rangeSlider({
    container: '#rating-filter',
    attribute: 'vote_average',
    step: 0.1,
    pips: true,
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
            <h5>
              ${components.Highlight({ hit, attribute: 'genres' })} - 
              ${components.Highlight({ hit, attribute: 'popularity' })} - 
              ${components.Highlight({ hit, attribute: 'release_date' })}
            </h5>
          </div>
        </article>
      `,
    },
  }),
  instantsearch.widgets.sortBy({
    container: '#sort-by',
    items: [
      { label: 'Relevance', value: 'algolia_movie_sample_dataset' },
      { label: 'Title (A → Z)', value: 'algolia_movie_sample_dataset_title_asc' },
      { label: 'Most Popular', value: 'algolia_movie_sample_dataset_popularity_desc' },
      { label: 'Newest First', value: 'algolia_movie_sample_dataset_release_date_desc' },
    ],
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
