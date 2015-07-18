var React = require('react');
var Table = require('../index');


var data = [
{
  "age": "<5",
  "population": "2704659",
  "minor": "True"
},
{
  "age": "5-13",
  "population": "4499890",
  "minor": "True"
},
{
  "age": "14-17",
  "population": "2159981",
  "minor": "True"
},
{
  "age": "18-24",
  "population": "3853788"
},
{
  "age": "25-44",
  "population": "14106543"
},
{
  "age": "45-64",
  "population": "8819342"
},
{
  "age": "≥65",
  "population": "612463"
},
{
  "age": "<5",
  "population": "2704659",
  "minor": "True"
},
{
  "age": "5-13",
  "population": "4499890",
  "minor": "True"
},
{
  "age": "14-17",
  "population": "2159981",
  "minor": "True"
},
{
  "age": "18-24",
  "population": "3853788"
},
{
  "age": "25-44",
  "population": "14106543"
},
{
  "age": "45-64",
  "population": "8819342"
},
{
  "age": "≥65",
  "population": "612463"
},
{
  "age": "<5",
  "population": "2704659",
  "minor": "True"
},
{
  "age": "5-13",
  "population": "4499890",
  "minor": "True"
},
{
  "age": "14-17",
  "population": "2159981",
  "minor": "True"
},
{
  "age": "18-24",
  "population": "3853788"
},
{
  "index": 19,
  "age": "25-44",
  "population": "14106543"
},
{
  "age": "45-64",
  "population": "8819342"
},
{
  "age": "≥65",
  "population": "612463"
}
];

var App = React.createClass({
  getInitialState: function() {
    return {
      data: data,
      selected: []
    };
  },

  unselect: function(e) {
    e.preventDefault();

    this.handleChange([]);

    this.refs.table.setState({ selectedRows: [] });
  },

  log: function(e) {
    e.preventDefault();

    var selectedRows = this.refs.table.state.selectedRows;
  },

  fill: function(e) {
    e.preventDefault();
    var rows = [];

    for (var i = 0; i < this.state.data.length; i++) {
      rows.push(i);
    }

    this.handleChange(rows);

    this.refs.table.setState({
      selectedRows: rows
    });
  },

  handleChange: function(rows) {
    this.setState({
      selected: rows
    });
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <Table
              id="table-multi-row-select"
              className="table table-stripped table-bordered table-multi-row-select"
              ref="table"
              data={this.state.data}
              columns={['population', 'age', 'minor']}
              onChange={this.handleChange} />
          </div>
        </div>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('App'));

tableMultiRowSelect.init({
  id:        'table-multi-row-select',
  className: 'table-multi-row-select',
  debug: false
});
tableMultiRowSelect.setSelectedRows([0, 2, 4, 6, 15, 20, 25]);

