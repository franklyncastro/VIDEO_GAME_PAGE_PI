const Genres = (genresAll) => {
  const { allGenres } = genresAll;
  console.log(allGenres);
  return (
    <>
      {allGenres?.map((option, key) => (
        <option key={key} value={option.name}>
          {option.name}
        </option>
      ))}
    </>
  );
};

export default Genres;
