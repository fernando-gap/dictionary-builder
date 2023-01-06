export default function GetCollectionWords(req, res) {
  const { collection } = req.query;

  if (collection === 'Default 0') {
    res.status(200).json({
      collection: 'Default 0',
      words: ['Hello', 'world']
    });
  } else {
    res.status(200).json({
      collection: 'Default 1',
      words: ['Mentira', 'Verdade']
    });
  }
}
