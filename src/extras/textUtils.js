(function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

  Blotter.PropertyDefaults = {
    family       : 'sans-serif',
    size         : 12,
    leading      : 1.5,
    fill         : '#000',
    style        : 'normal',
    weight       : 500,
    padding      : 0,
    paddingTop   : 0,
    paddingRight : 0,
    paddingBottom: 0,
    paddingLeft  : 0
  };

  Blotter.TextUtils = {

    Properties : _.keys(Blotter.PropertyDefaults),

    // Recieves property values (optional) and fills in any missing values with default values

    ensurePropertyValues : function(properties) {
      properties = _.defaults(properties || {}, Blotter.PropertyDefaults);
      return properties;
    },

    filterTexts : function(texts) {
      if (texts instanceof Blotter.Text) {
        texts = [texts];
      } else {
        texts = _.toArray(texts);
      }

      return _.filter(texts, _.bind(function (text) {
        var isText = text instanceof Blotter.Text;

        if (!isText) {
          Blotter.Messaging.logWarning("Blotter.TextUtils", "filterTexts", "object must be instance of Blotter.Text");
        }

        return isText;
      }, this));
    },

    // Format padding values from style properties for passing to document

    stringifiedPadding : function(properties) {
      var _properties = properties || this.ensurePropertyValues(),
          pTop = properties.paddingTop || _properties.padding,
          pRight = _properties.paddingRight || _properties.padding,
          pBottom = _properties.paddingBottom || _properties.padding,
          pLeft = _properties.paddingLeft || _properties.padding;

      return pTop + "px " + pRight + "px " + pBottom + "px " + pLeft + "px";
    },

    // Determines size of text within the document given certain style properties

    sizeForText : function(textValue, properties) {
      var el = document.createElement('p'),
          size;

      properties = this.ensurePropertyValues(properties);

      el.innerHTML = textValue;
      el.style.fontFamily = properties.family;
      el.style.fontSize = properties.size + "px";
      el.style.fontWeight = properties.weight;
      el.style.fontStyle = properties.style;
      el.style.padding = this.stringifiedPadding(properties);
      el.style.lineHeight = properties.leading;
      el.style.visibility = "hidden";
      el.style.display = "inline-block";

      document.body.appendChild(el);

      size = {
        w: el.offsetWidth,
        h: el.offsetHeight
      };

      document.body.removeChild(el);

      return size;
    }
  };

})(
  this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
);
