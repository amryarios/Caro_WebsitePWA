import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
import FavoriterestoranIdb from '../../src/scripts/data/favorite-restoran-idb';

const createLikeButtonPresenterWithResto = async (restoran) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurants: FavoriterestoranIdb,
    restoran,
  });
};

export { createLikeButtonPresenterWithResto };
