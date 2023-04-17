const validate = (data) => (req, res, next) => {
    const { value, error } = data.validate(req.body);
    if(error) {
        const errors = error.details?.map(detail => detail.message);
        res.status(400).json(errors)
    } else {
        Object.assign(req, value)
        return next()
    }
}

module.exports = validate;