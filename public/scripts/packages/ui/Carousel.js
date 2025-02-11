var id = 'ui/Carousel',
	List = li.require( 'ui/List' ),
	Carousel;

/**
 * Description
 * @class Carousel
 * @constructor
 * @param {HTMLElement} element The DOM node representing the Carousel's container
 * @param {Object} settings Configuration properties
 */
Carousel = List.extend( function ( element, settings ){
	var Carousel = this,
		defaults = {};

	settings = _.extend( defaults, settings );

Carousel
	element.data( id, this );

} );

if ( typeof module !== 'undefined' && module.exports ) {
	module.exports = Carousel;
}