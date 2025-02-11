console.log("Button.js is loaded!");

var id = 'ui:Button',
  Abstract = li.require( 'ui/Abstract' ),
  Button;

/**
 * Representation of a button element
 * @class Button
 * @constructor
 * @extends Abstract
 * @param {HTMLElement} element The HTML element surrounded by the control
 * @param {Object} settings Configuration properties for this instance
 */
Button = Abstract.extend( function ( $element, settings ){
/**
 * Instance of Button
 * @property Button
 * @type Object
 */
  var Button = this,
/**
 * Default configuration values
 * @property defaults
 * @type Object
 */
    defaults = {
      on: 'click'
    },
    /**
     * Custom event name
     * @property action
     * @type Object
     */
    action,
    $subscribesTo;

  settings = _.extend( defaults, settings );

  action = settings.action;

  $subscribesTo = $(settings.subscribe);

  // on click
  $element.on( settings.on, function ( event ) {
    _.log("Button " + settings.on + " with " + action);
    Button.trigger( action );
    console.log("button clicked!");
  } );

  $element.data( id, Button );

  if ($subscribesTo.length) {
    Button.subscribe( $subscribesTo );
  }
  
} );

if ( typeof module !== 'undefined' && module.exports ) {
  module.exports = Button;
}

