import FavoriterestoranIdb from '../../data/favorite-restoran-idb';
import FavoriteRestoSearchView from './liked-restaurants/favorite-resto-search-view';
import FavoriteRestoSearchPresenter from './liked-restaurants/favorite-resto-search-presenter';
import FavoriteRestoShowPresenter from './liked-restaurants/favorite-Resto-show-presenter';

const view = new FavoriteRestoSearchView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestoShowPresenter({ view, favoriteRestaurants: FavoriterestoranIdb });
    new FavoriteRestoSearchPresenter({ view, favoriteRestaurants: FavoriterestoranIdb });
  },
};

export default Favorite;
