import FavoriteRestoSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-resto-search-view';
import FavoriteRestoShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-Resto-show-presenter';
import FavoriterestoranIdb from '../src/scripts/data/favorite-restoran-idb';

describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestoSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should render the information that no restaurants have been liked', () => {
      const favoriteRestaurants = spyOnAllFunctions(FavoriterestoranIdb);
      const presenter = new FavoriteRestoShowPresenter({
        view,
        favoriteRestaurants,
      });

      const restaurants = [];
      presenter._displayResto(restaurants);

      expect(document.querySelectorAll('.restoranItem__not__found').length)
        .toEqual(1);
    });

    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = spyOnAllFunctions(FavoriterestoranIdb);

      new FavoriteRestoShowPresenter({
        view,
        favoriteRestaurants,
      });

      expect(favoriteRestaurants.getAllResto).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurants have been liked', (done) => {
      document.getElementById('restoran-list').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restoranItem__not__found').length).toEqual(1);
        done();
      });

      const favoriteRestaurants = spyOnAllFunctions(FavoriterestoranIdb);
      favoriteRestaurants.getAllResto.and.returnValues([]);

      new FavoriteRestoShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should render the restaurants', () => {
      const favoriteRestaurants = spyOnAllFunctions(FavoriterestoranIdb);
      const presenter = new FavoriteRestoShowPresenter({
        view,
        favoriteRestaurants,
      });

      presenter._displayResto([
        {
          id: 11,
          name: 'A',
          vote_average: 3,
          overview: 'Sebuah restoran A',
        },
        {
          id: 22,
          name: 'B',
          vote_average: 4,
          overview: 'Sebuah restoran B',
        },
      ]);

      expect(document.querySelectorAll('.restoranItem').length).toEqual(2);
    });

    it('should show the restaurants', (done) => {
      document.getElementById('restoran-list').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restoranItem').length).toEqual(2);
        done();
      });

      const favoriteRestaurants = spyOnAllFunctions(FavoriterestoranIdb, false);
      favoriteRestaurants.getAllResto.and.returnValues([
        {
          id: 11,
          name: 'A',
          vote_average: 3,
          overview: 'Sebuah restoran A',
        },
        {
          id: 22,
          name: 'B',
          vote_average: 4,
          overview: 'Sebuah restoran B',
        },
      ]);

      new FavoriteRestoShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });
});
