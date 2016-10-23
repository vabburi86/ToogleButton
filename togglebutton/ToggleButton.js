Ext.ns('Ext.ux.form');

/**
 * @class Ext.ux.form.ToggleButton
 * @extends Ext.form.Field
 * A control that allows selection and form submission of toogle options.
 *
 * @constructor
 * Create a new ToggleButton
 * @param {Object} config Configuration options
 * @xtype togglebutton
 */
Ext.ux.form.ToggleButton = Ext.extend(Ext.form.Field,  {
  
  options : {no: "common.label.no", yes:"common.label.yes" },
  
  defaultValue : 'no',
  
  value : 'no',
  
  cls: 'ux-form-togglebutton',
  
  defaultAutoCreate : {tag: "div"},
  
  initComponent : function() {
    Ext.ux.form.ToggleButton.superclass.initComponent.call(this);
  },
  
  onRender: function(ct, position){
    Ext.ux.form.ToggleButton.superclass.onRender.call(this, ct, position);
    var items = [], property = "", option= null;
    this.tpl = new Ext.XTemplate(
        '<ul>',
        '<tpl for=".">',
          '<tpl if="checked">',
            '<li class="on"',
          '</tpl>',
          '<tpl if="!checked">',
            '<li',
          '</tpl>',
          ' name="{inputValue}"><a name="{inputValue}" href="#">{boxLabel}</a></li>',
        '</tpl>',
    '</ul>'
    );
    
    this.el.addClass('ux-togglebutton');
    
    for(var property in this.options){
      option = this.options[property];
      items.push({
        boxLabel    : _t(option),
        inputValue  : property,
        checked     : this.defaultValue === property
      });
    }
    this.tpl.append(this.el, items);
    this.addListeners();
  },
  
  afterRender : function() {
  },
  
  addListeners : function() {
    var me = this; me.buttons = {};
    var toggleButtons = this.el.query('.ux-togglebutton ul li');
    Ext.each(toggleButtons, function(btn){
      var name = btn.getAttribute('name');
      me.buttons[name] = Ext.get(btn);
      me.buttons[name].on("click", me.toggleSelection, me);
    });
    
    me.setValue(me.value);
  },
  
  toggleSelection : function(event) {
    var optionName = "";
    if(event.target){
      optionName = event.target.name || event.target.getAttribute('name');
    }
    if(optionName){
      this.setValue(optionName, true);
    }
  },
  
  setValue : function(value, fireEvent) {
    var previousValue = this.value;
    this.value = value;
    for(var property in this.buttons){
      if(value === property){
        this.buttons[property].addClass('on');
      } else {
        this.buttons[property].removeClass('on');
      }
    }
    
    if(fireEvent){
      this.fireEvent('change', this, this.getValue(), previousValue);
    }
  },
  
  getValue : function() {
    return this.value;
  }
});

Ext.reg('togglebutton', Ext.ux.form.ToggleButton);

//backwards compat
Ext.ux.ToggleButton = Ext.ux.form.ToggleButton;