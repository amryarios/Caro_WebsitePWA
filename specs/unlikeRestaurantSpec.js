import FavoriterestoranIdb from '../src/scripts/data/favorite-restoran-idb';
import * as TestFactories from './helpers/testFactories';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Unliking A Restaurant', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriterestoranIdb.putResto({ id: 1 });
  });

  afterEach(async () => {
    await FavoriterestoranIdb.deleteResto(1);
  });

  it('should display unlike widget when the restoran has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restoran"]'))
      .toBeTruthy();
  });

  it('should not display like widget when the restoran has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="like this restoran"]'))
      .toBeFalsy();
  });

  it('should be able to remove liked restoran from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    document.querySelector('[aria-label="unlike this restoran"]').dispatchEvent(new Event('click'));
    expect(await FavoriterestoranIdb.getAllResto()).toEqual([]);
  });

  it('should not throw error if the unliked restoran is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    // hapus dulu film dari daftar film yang disukai
    await FavoriterestoranIdb.deleteResto(1);

    // kemudian, simulasikan pengguna menekan widget batal menyukai film
    document.querySelector('[aria-label="unlike this restoran"]').dispatchEvent(new Event('click'));

    expect(await FavoriterestoranIdb.getAllResto()).toEqual([]);
  });
});
