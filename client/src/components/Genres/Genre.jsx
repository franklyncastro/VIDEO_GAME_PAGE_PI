const Genres = (genresAll) =>
{
    const {allGenres} = genresAll;

    return (
        <>

        {allGenres?.map((option,key) => (
            <option key={key} value={option.name}>{option.name}</option>
          ))}
         </>
      );
}

export default Genres;