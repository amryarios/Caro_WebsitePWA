import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate, createRestaurantReviewTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriterestoranIdb from '../../data/favorite-restoran-idb';

const Detail = {
  async render() {
    return `
        <div id="restoran" class="restoran"></div>
        <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restoran = await RestaurantDbSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restoran');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restoran);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriterestoranIdb,
      restoran: {
        id: restoran.id,
        name: restoran.name,
        city: restoran.city,
        description: restoran.description,
        pictureId: restoran.pictureId,
        rating: restoran.rating,
      },
    });

    restaurantContainer.innerHTML += `
      <restoran-review>
        <h2>Reviews</h2>
      </restoran-review>
    `;

    const restoranReview = document.querySelector('restoran-review');
    restoran.customerReviews.forEach((review) => {
      restoranReview.innerHTML += createRestaurantReviewTemplate(review);
    });
  },
};

export default Detail;
