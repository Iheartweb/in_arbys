var id = 'ui:Abstract',
  klass = li.require( 'libraries/klass' ),
  EventProvider = li.require( 'providers/Event' ),
  Abstract;

/**
 * The base component class all other UI components inherit from.
 * @class Abstract
 * @constructor
 * @param {HTMLElement} element The HTML element surrounded by the control
 * @param {Object} settings Configuration properties for this instance
 */
Abstract = klass( function ( $element, settings ){

  /**
   * Instance of Abstract class
   * @property Abstrance
   * @type {Object}
   */
  var Abstract = this,
    /**
     * Instance of EventProvider
     * @property Event
     * @type {Object}
     */
    Event,
    /**
     * Default configuration values
     * @property defaults
     * @private
     * @type {Object}
     */
    defaults = {
      /**
       * A selector that matches nodes to subscribe to
       * @property subscribe
       * @type {String}
       */
      subscribe: '',
      /**
       * A selector that matches nodes to publish events to
       * @property publish
       * @type {String}
       */
      publish: '',
      /**
       * When false, events are prevented from bubbling up the DOM tree
       * @property publish
       * @type {Boolean}
       * @default true
       */
      bubble: true
    },
    /**
     * A jQuery collection that is notified of all events
     * @property $publishTo
     * @private
     * @type {Array}
     */
    $publishTo,
    /**
     * A jQuery collection that is subscribed to
     * @property subscribe
     * @private
     * @type {Array}
     */
    $subscribeTo,
    /**
     * The namespace that all events will be fired into. See http://docs.jquery.com/Namespaced_Events.
     * @property namespace
     * @type {String}
     */
    namespace = '';

  settings = _.extend( defaults, settings );

  if( settings.namespace ) {
    namespace = '.' + settings.namespace;
  }

  $subscribeTo = $( settings.subscribe );
  $publishTo = $( settings.publish );

  Event = new EventProvider( {
    proxy: $element
  } );

  /**
   * Trigger events for $publishTo 
   * @private
   * @method notify
   * @param {String} type The type of custom event to trigger
   * @param {Array} parameters Arguments passed through to the observer's callback function
   */
  function notify( type, parameters ) {
    _.each( $publishTo, function( subscriber, index ) {
      $(subscriber).trigger( type + namespace, parameters );
    } );
  }

  /**
   * Creates an event listener for a type
   * @method on
   * @public
   * @param {String} type The type of event
   * @param {Function} handler The callback function
   */
  Abstract.on = function( type, handler ) {
    return Event.on( type + namespace, function( event ) {
      if( settings.bubble === false ) {
        event.stopPropagation();
      }
      handler.apply( arguments );
    } );
  };

  /**
   * Unbinds event listener(s) of a type
   * @method off
   * @public
   * @param {String} type The type of event
   */
  Abstract.off = function( type ) {
    return Event.off( type + namespace );
  };

  /**
   * Fires a custom event 
   * @method trigger
   * @public
   * @param {String} type The type of event
   * @param {Aarray} parameters Extra arguments to pass through to the subscribed event handler
   */
  Abstract.trigger = function( type, parameters ) {
    notify( type + namespace, parameters );
    return Event.trigger( type + namespace, parameters );
  };

  /**
   * Subscribe to events
   * @method subscribe
   * @public
   * @param {Array} $subscriber A jQuery collection to subscibe
   */
  Abstract.subscribe = function( $subscriber ) {
    $publishTo.add( $subscriber );
  };

  /**
   * Unsubscribe from events
   * @method Name
   * @public
   * @param {Array} $subscriber A jQuery collection to unsubscribe
   */
  Abstract.unsubscribe = function( $subscriber ) {
    $publishTo = $subscriber.filter( $publishTo );
  };

  //Export a reference in jQuery's data see http://api.jquery.com/data/
  $element.data( id, Abstract );

} );

if ( typeof module !== 'undefined' && module.exports ) {
  module.exports = Abstract;
}
