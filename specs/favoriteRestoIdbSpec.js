import { itActsAsFavoriteRestoModel } from './contract/favoriteRestaurantContract';
import FavoriterestoranIdb from '../src/scripts/data/favorite-restoran-idb';

describe('Favorite Resto Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriterestoranIdb.getAllResto()).forEach(async (restoran) => {
      await FavoriterestoranIdb.deleteResto(restoran.id);
    });
  });

  itActsAsFavoriteRestoModel(FavoriterestoranIdb);
});
