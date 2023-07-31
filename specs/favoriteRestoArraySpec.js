import { itActsAsFavoriteRestoModel } from './contract/favoriteRestaurantContract';

let favoriteRestaurants = [];

const FavoriteRestoArray = {
  getResto(id) {
    if (!id) {
      return;
    }

    return favoriteRestaurants.find((restoran) => restoran.id === id);
  },

  getAllResto() {
    return favoriteRestaurants;
  },

  putResto(restoran) {
    if (!restoran.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteRestaurants
    if (this.getResto(restoran.id)) {
      return;
    }

    favoriteRestaurants.push(restoran);
  },

  deleteResto(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteRestaurants = favoriteRestaurants.filter((restoran) => restoran.id !== id);
  },

  searchResto(query) {
    return this.getAllResto()
      .filter((restoran) => {
        const loweredCaseRestoTitle = (restoran.title || '-').toLowerCase();
        const jammedRestoTitle = loweredCaseRestoTitle.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedRestoTitle.indexOf(jammedQuery) !== -1;
      });
  },
};

describe('Favorite Resto Array Contract Test Implementation', () => {
  afterEach(() => favoriteRestaurants = []);

  itActsAsFavoriteRestoModel(FavoriteRestoArray);
});
