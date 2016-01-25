var	mongoose = require( 'mongoose' )

var restaurantSchema = new mongoose.Schema( {
	zomato_id : Number,
	overall_rating : Number,
	greasy_rating: Number,
	tex_mex_rating: Number,
	artisal_rating: Number
} )

module.exports = mongoose.models( "Restaurant", restaurantSchema )
