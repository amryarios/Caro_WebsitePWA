import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
<div class = "restoranItem">
    <div class = "restoranHeader">
      <img class = "lazyload" alt="${restaurant.name || '-'}"
        data-src = "${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}">
      <div class = "restoranRating">
        <span class = "restoranRating2">⭐️ ${restaurant.rating}</span>
      </div>
    </div>
    <div class = "restoranInfo">
      <h3 class = "restoranNama"><a href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h3>
      <h4 class = "restoranTempat">${restaurant.city}</h4>
      <p class = "restoranDescription">${restaurant.description}</p>
    </div>
  </div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
<h2 class="contentHeading">Detail Restaurant</h2>
<div class="detail">  
    <h1 class="title" id="restoranNama">
      ${restaurant.name}
    </h1>
    <img class="lazyload" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />

    <div class="info">
      <h2>Information</h2>
      <ul>
        <li>
          <h3>Kota</h3>
          <p>${restaurant.city}</p>
        </li>
        <li>
          <h3>Alamat</h3>
          <p>${restaurant.address}</p>
        </li>
        <li>
        <p>${restaurant.rating}</p>
        <h3>Rating</h3>
        </li>
        <li>
          <h3>Foods Menu</h3>
          <span id="food">
          <p>${restaurant.menus.foods.map((food) => food.name).join(', ')}</p>
          </span>
        </li>
        <li>
          <h3>Drinks Menu</h3>
          <span id="drink">
            <p>${restaurant.menus.drinks.map((food) => food.name).join(', ')}</p>
          </span>
        </li>
      </ul>
    </div>

    <div class="overview">
      <h2>Overview</h2>
      <p>${restaurant.description}</p>
    </div>

  </div>
  
`;

const createRestaurantReviewTemplate = (reviews) => `
  <div class="review">
    <p><span class="name">${reviews.name}</span></p>
    <p><span class="date">${reviews.date}</span></p>
    <p>${reviews.review}</p>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restoran" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeButtonTemplate = () => `
  <button aria-label="unlike this restoran" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

// eslint-disable-next-line import/prefer-default-export
export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createRestaurantReviewTemplate,
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
};
