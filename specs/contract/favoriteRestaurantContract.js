const itActsAsFavoriteRestoModel = (favoriteResto) => {
  it('should return the restoran that has been added', async () => {
    favoriteResto.putResto({ id: 1 });
    favoriteResto.putResto({ id: 2 });

    expect(await favoriteResto.getResto(1))
      .toEqual({ id: 1 });
    expect(await favoriteResto.getResto(2))
      .toEqual({ id: 2 });
    expect(await favoriteResto.getResto(3))
      .toEqual(undefined);
  });

  it('should refuse a restoran from being added if it does not have the correct property', async () => {
    favoriteResto.putResto({ aProperty: 'property' });

    expect(await favoriteResto.getAllResto())
      .toEqual([]);
  });

  it('can return all of the restoran that have been added', async () => {
    favoriteResto.putResto({ id: 1 });
    favoriteResto.putResto({ id: 2 });

    expect(await favoriteResto.getAllResto())
      .toEqual([
        { id: 1 },
        { id: 2 },
      ]);
  });

  it('should remove favorite restoran', async () => {
    favoriteResto.putResto({ id: 1 });
    favoriteResto.putResto({ id: 2 });
    favoriteResto.putResto({ id: 3 });

    await favoriteResto.deleteResto(1);

    expect(await favoriteResto.getAllResto())
      .toEqual([
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should handle request to remove a restoran even though the Resto has not been added', async () => {
    favoriteResto.putResto({ id: 1 });
    favoriteResto.putResto({ id: 2 });
    favoriteResto.putResto({ id: 3 });

    await favoriteResto.deleteResto(4);

    expect(await favoriteResto.getAllResto())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should be able to search for restaurants', async () => {
    favoriteResto.putResto({ id: 1, title: 'restoran a' });
    favoriteResto.putResto({ id: 2, title: 'restoran b' });
    favoriteResto.putResto({ id: 3, title: 'restoran abc' });
    favoriteResto.putResto({ id: 4, title: 'Ini untuk restoran abcd' });

    expect(await favoriteResto.searchResto('restoran a')).toEqual([
      { id: 1, title: 'restoran a' },
      { id: 3, title: 'restoran abc' },
      { id: 4, title: 'Ini untuk restoran abcd' },
    ]);
  });
};

export { itActsAsFavoriteRestoModel };
