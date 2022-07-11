const db = require('../models');
exports.getAllPlaces = async (req, res) => {
    try {
        const places = await db.Place.find();
        res.render('places/index', { places });
    } catch (err) {
        res.render('error404');
    }
};
exports.addPlace = async (req, res) => {
    try {
        if(req.body.pic === '') {req.body.pic = undefined};
        if(req.body.city === '') {req.body.city = undefined};
        if(req.body.state === '') {req.body.state = undefined};
        await db.Place.create(req.body);
            res.redirect('/places');
    } catch (err) {
        if(err && err.name == 'ValidationError') {
            let message = 'Validation Error';
            for(let el in err.errors) {
            message += `${el} was ${err.errors[el].value}`
            message += `${err.errors[el].message}`
            };
            console.log('Validation error message', message)
            res.render('places/new', { message })
        } else {
            res.render('error404');
        }
    }
};
exports.getPlace = async (req, res) => {
    try {
        const place = await db.Place.findById(req.params.id).populate('comments');
        res.render('places/show', { place });
    } catch (err) {
        res.render('error404');
    }
};
exports.updatePlace = async (req, res) => {
    try {
        await db.Place.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/places/${req.params.id}`);
    } catch(err) {
        res.render('error404');
    }
};
exports.deletePlace = async(req, res) => {
    try {
        await db.Place.findByIdAndDelete(req.params.id);
        res.redirect('/places');
    } catch (err) {
        res.render('error404');
    }
};
exports.updatePlaceView = async (req, res) => {
    try {
        const place = await db.Place.findById(req.params.id);
        res.render('places/edit', { place });
    } catch (err) {
        res.render('error404');
    }
};

exports.addComment = async (req, res) => {
    try {
        req.body.rant = req.body.rant ? true : false;
        const place = await db.Place.findById(req.params.id);
        const comment = await db.Comment.create(req.body);
        place.comments.push(comment.id);
        await place.save();
        res.redirect(`/places/${req.params.id}`);
    } catch (err) {
        res.render('error404');
    }
};
exports.deleteComment = async (req, res) => {
    try {
        await db.Comment.findByIdAndDelete(req.params.rantId);
        res.redirect('/places');

    } catch (err) {
        res.render('error404');
    }
};
