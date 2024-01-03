module.exports = (err, req, res, next) => {
    console.log("Loglama", err.message);
    next(err);
}