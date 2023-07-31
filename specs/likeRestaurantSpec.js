import FavoriterestoranIdb from '../src/scripts/data/favorite-restoran-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restoran has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="like this restoran"]'))
      .toBeTruthy();
  });

  it('should not show the unlike button when the restoran has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restoran"]'))
      .toBeFalsy();
  });

  it('should be able to like the restoran', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restoran = await FavoriterestoranIdb.getResto(1);

    expect(restoran).toEqual({ id: 1 });

    FavoriterestoranIdb.deleteResto(1);
  });

  it('should not add a restoran again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    // Tambahkan film dengan ID 1 ke daftar film yang disukai
    await FavoriterestoranIdb.putResto({ id: 1 });

    // Simulasikan pengguna menekan tombol suka film
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // tidak ada film yang ganda
    expect(await FavoriterestoranIdb.getAllResto()).toEqual([{ id: 1 }]);

    FavoriterestoranIdb.deleteResto(1);
  });

  it('should not add a restoran when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriterestoranIdb.getAllResto()).toEqual([]);
  });
});
