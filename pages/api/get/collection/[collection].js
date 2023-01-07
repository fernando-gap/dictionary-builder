export default function GetCollectionWords(req, res) {
  const { collection } = req.query;

  if (collection === 'default') {
    res.status(200).json({
      collection: 'Default 0',
      words: [Math.random(), Math.random()]
    });
  } else {
    res.status(200).json({
      collection: 'Default 1',
      words: ['Mentira', 'Verdade']
    });
  }
}
