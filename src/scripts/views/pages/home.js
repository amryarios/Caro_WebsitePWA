import RestaurantDbSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
        <div class="content">
            <h2 class="contentHeading">Daftar Restoran di Indonesia</h2>
            <div id="restoran-list" class="restoran-list">
            </div>
        </div>
    `;
  },

  async afterRender() {
    const mainContent = await RestaurantDbSource.listRestaurant();
    const contentContainer = document.querySelector('#restoran-list');
    mainContent.forEach((restaurant) => {
      contentContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
