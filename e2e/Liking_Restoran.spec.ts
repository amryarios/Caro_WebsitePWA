const assert = require('assert');
const { async } = require('regenerator-runtime');

Feature('Liking Restoran');

Before(function ({ I }) {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restoran untuk ditampilkan', '.restoranItem__not__found');
});

Scenario('liking one restoran', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restoranItem__not__found');

  I.amOnPage('/');
  
  I.seeElement('.restoranNama a');

  const firstResto = locate('.restoranNama a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restoranItem');
  const likedRestoTitle = await I.grabTextFrom('.restoranNama');

  assert.strictEqual(firstRestoTitle, likedRestoTitle);
});

Scenario('Unliking one restoran', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restoranItem__not__found');

  I.amOnPage('/');
  
  I.seeElement('.restoranNama a');

  const firstResto = locate('.restoranNama a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restoranItem a');
  const firstLikedResto = locate('.restoranNama a').first();
  const firstLikedRestoTitle = await I.grabTextFrom(firstLikedResto);

  assert.strictEqual(firstRestoTitle, firstLikedRestoTitle);

  I.click(firstLikedResto);

  // I.seeElement('#likeButton');
  I.waitForVisible('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.see('Tidak ada restoran untuk ditampilkan', '.restoranItem__not__found');
})
