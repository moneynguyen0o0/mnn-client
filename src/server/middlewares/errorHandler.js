export const notFound = () => (req, res, next) => {
  res.status(404).send('Not Found');
};

export const handleErrors = () => (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};
