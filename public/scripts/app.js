var App = React.createClass({
	loadPeopleFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({ data: data });
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
			data: []
		}
	},
	componentDidMount: function() {
		this.loadPeopleFromServer();
		// setInterval(this.loadPeopleFromServer, this.state.timeInterval);
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
	render: function () {
		return (
			<div className="app">
				<div className="row">
					<div className="col-lg-3">
						<People data={ this.state.data } />
						<InputForm onPersonSubmit={ this.handlePersonSubmit } />
					</div>
					<div className="col-lg-9">
						<Map data={ this.state.data } lat={ this.state.mapCoords.lat } lng={ this.state.mapCoords.lng }/>
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