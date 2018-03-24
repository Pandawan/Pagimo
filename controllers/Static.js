exports.home = (req, res, next) => {
  res.render('index', { title: 'Express' });
};
