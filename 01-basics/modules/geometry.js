/**
 * Do all things geometry-related
 *
 * SUCH FUN!
 */

const boxArea = (w, h) => {
	return w * h;
}

const boxCircumference = (w, h) => w * 2 + h * 2;

// Export all the stuff!
module.exports = {
	boxArea,   // boxArea: boxArea
	boxCircumference,
}
