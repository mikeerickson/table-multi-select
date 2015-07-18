var React = require('react');

var TableRow = React.createClass({
  handleChange: function(e) {
    e.stopPropagation();
    this.props.onChange(e.target.checked);
  },
  
  handleRowClick: function(e) {
    e.stopPropagation();
  },

  render: function() {
    var index = 0;
    return (
      React.createElement('tr', {
          'onMouseDown': this.handleRowClick
        },
        //React.createElement('td', null,
        //  React.createElement('input', {
        //    'type': 'checkbox',
        //    'aria-label': 'select single row',
        //    'checked': this.props.checked,
        //    'onChange': this.handleChange
        //  })
        //),
        this.props.fields.map(function(field, i) {
          return (
            React.createElement('td', {
              key: i
            }, this.props.data[field])
          );
        }, this)
      )

    );

    index++;
  }
});

var TableBody = React.createClass({
  render: function() {
    return React.createElement('tbody', null,
      this.props.data.map(function(datum, i) {
        return React.createElement(TableRow, {
          key: i,
          data: datum,
          fields: this.props.fields,
          checked: this.props.checkedRows[i],
          onChange: this.props.onChange.bind(null, i)
        });
      }, this)
    );
  }
});

module.exports = TableBody;
