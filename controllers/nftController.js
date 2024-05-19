
exports.createCache = (req, res) => {
    const { nftId, clues } = req.body;
    res.json({ msg: 'Cache created', nftId, clues });
};

exports.findCache = (req, res) => {
    const { cacheId } = req.query;
    res.json({ msg: 'Cache found', cacheId });
};
