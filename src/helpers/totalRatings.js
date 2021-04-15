// totalRating
// returns rating counts
const totalRating = (ratings) => {
  if (!ratings) {
    return 0;
  }

  return (
    ratings.oneStar +
    ratings.twoStar +
    ratings.threeStar +
    ratings.fourStar +
    ratings.fiveStar
  );
};

export default totalRating;
