require('../css/base.css');
require('./array_prototype');

var Map = require('./map');
var InputForm = require('./form');
var People = require('./people');
var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({

	getInitialState: function () {
		return {
			mapCoords: {
				// I suppose Paris is a good default location
				lat: 48.856614,
				lng: 2.3522219
			},
			timeInterval: 2000,
			data: [],
			idList: [],
			bounds: []
		}
	},

	checkBounds: function(person, sw_lat, sw_lng, ne_lat, ne_lng) {
		if (person.lat <= ne_lat && person.lat > sw_lat && person.lng < ne_lng && person.lng > sw_lng) {
			return true;
		}
		return false;
	},

	updateDisplayData: function(bounds, data) {
		var newData = [];
		var newIDList = [];
		for (var i=0; i<data.length; i++) {
			if (this.checkBounds(data[i], bounds.sw_lat, bounds.sw_lng, bounds.ne_lat, bounds.ne_lng)) {
				newData.push(data[i]);
				newIDList.push(data[i].id);
			}
		}
		// reset data to contain only people within bounds
		this.setState({ data : newData, idList : newIDList, bounds : bounds });
	},

	handlePersonSubmit: function(person) {
		var self = this;
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: person,
			success: function(data) {
				self.updateDisplayData(this.state.bounds, data);
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	loadPeopleFromServer: function(bounds) {
		var self = this;
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			success: function(data) {
				self.updateDisplayData(bounds, data);
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	render: function () {
		return (
			<div className="row">
				<Map idList={ this.state.idList } data={ this.state.data } lat={ this.state.mapCoords.lat } lng={ this.state.mapCoords.lng } handleBoundChange={ this.loadPeopleFromServer } />
				<div className="col-xs-8" id="left">
					<h2>Dynamic map search using ReactJS</h2>
					<People data={ this.state.data } />
					<InputForm onPersonSubmit={ this.handlePersonSubmit } />
				</div>
				<div className="col-xs-4">
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<App url="/people.json" />,
	document.getElementById('main')
);