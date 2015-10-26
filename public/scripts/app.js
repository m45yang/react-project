var App = React.createClass({

	checkBounds: function(person, sw_lat, sw_lng, ne_lat, ne_lng) {
		if (person.lat <= ne_lat && person.lat > sw_lat && person.lng < ne_lng && person.lng > sw_lng) {
			return true;
		}
		return false;
	},

	loadPeopleFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				var idList = [];
				for (var i=0; i<data.length; i++) {
					idList.push(data[i].id);
				}
				this.setState({ data: data, idList : idList });
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	getInitialState: function () {
		return {
			mapCoords: {
				// I suppose Paris is a good default location
				lat: 48.856614,
				lng: 2.3522219
			},
			timeInterval: 2000,
			data: [],
			idList: []
		}
	},

	componentDidMount: function() {
		// this.loadPeopleFromServer();
	},

	handlePersonSubmit: function(person) {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: person,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	handleBoundChange: function(bounds) {
		var self = this;
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				var newData = [];
				var newIDList = [];
				for (var i=0; i<data.length; i++) {
					if (self.checkBounds(data[i], bounds.sw_lat, bounds.sw_lng, bounds.ne_lat, bounds.ne_lng)) {
						newData.push(data[i]);
						newIDList.push(data[i].id);
					}
				}
				// reset data to contain only people within bounds
				this.setState({ data : newData, idList : newIDList });
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	render: function () {
		return (
			<div className="app">
				<div className="row">
					<div className="col-lg-3">
						<People data={ this.state.data } />
						<InputForm onPersonSubmit={ this.handlePersonSubmit } />
					</div>
					<div className="col-lg-9">
						<Map idList={ this.state.idList } data={ this.state.data } lat={ this.state.mapCoords.lat } lng={ this.state.mapCoords.lng } handleBoundChange={ this.handleBoundChange } />
					</div>
				</div>
			</div>
		);
	}
});

React.render(
	<App url="/people.json" />,
	document.getElementById('main')
);