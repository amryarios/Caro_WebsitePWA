import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-resto-search-presenter';
import FavoriterestoranIdb from '../src/scripts/data/favorite-restoran-idb';
import FavoriteRestoSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-resto-search-view';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchResto = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestoSearchContainer = () => {
    view = new FavoriteRestoSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriterestoranIdb);
    presenter = new FavoriteRestoSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestoSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchResto('restoran a');

      expect(presenter.latestQuery)
        .toEqual('restoran a');
    });

    it('should ask the model to search for liked restaurants', () => {
      searchResto('restoran a');

      expect(favoriteRestaurants.searchResto)
        .toHaveBeenCalledWith('restoran a');
    });

    it('should show the found restaurants', () => {
      presenter._showFoundResto([{ id: 1 }]);
      expect(document.querySelectorAll('.restoranItem').length).toEqual(1);

      presenter._showFoundResto([{ id: 1, name: 'Satu' }, { id: 2, name: 'Dua' }]);
      expect(document.querySelectorAll('.restoranItem').length).toEqual(2);
    });

    it('should show the title of the found restaurants', () => {
      presenter._showFoundResto([{ id: 1, name: 'Satu' }]);
      expect(document.querySelectorAll('.restoranNama').item(0).textContent)
        .toEqual('Satu');
    });

    it('should show - when the restoran returned does not contain a title', (done) => {
      document.getElementById('restoran-list').addEventListener('restaurants:updated', () => {
        const restoTitles = document.querySelectorAll('.restoranNama');
        expect(restoTitles.item(0).textContent).toEqual('-');

        done();
      });

      favoriteRestaurants.searchResto.withArgs('restoran a').and.returnValues([
        { id: 444 },
      ]);

      searchResto('restoran a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchResto(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchResto('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchResto('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchResto('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchResto('    ');
      expect(favoriteRestaurants.getAllResto).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restoran-list')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restoranItem__not__found').length).toEqual(1);
          done();
        });

      favoriteRestaurants.searchResto.withArgs('restoran a').and.returnValues([]);

      searchResto('restoran a');
    });

    it('should not show any restoran', (done) => {
      document.getElementById('restoran-list').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restoran').length).toEqual(0);
        done();
      });
      favoriteRestaurants.searchResto.withArgs('restoran a').and.returnValues([]);
      searchResto('restoran a');
    });
  });
});
