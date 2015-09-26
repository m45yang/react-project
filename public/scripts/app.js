var App = React.createClass({
	getInitialState: function () {
		return {
			mapCoords: {
				// I suppose Paris is a good default location
				lat: 48.856614,
				lng: 2.3522219
			},
			timeInterval: 2000
		}
	},
	render: function () {
		return (
			<div className="app">
				<div className="row">
					<div className="col-lg-3">
						<People url="/people.json" timeInterval={ this.state.timeInterval } />
					</div>
					<div className="col-lg-9">
						<Map url="/people.json" timeInterval={ this.state.timeInterval } lat={ this.state.mapCoords.lat } lng={ this.state.mapCoords.lng }/>
					</div>
				</div>
			</div>
		);
	}
});

React.render(
	<App />,
	document.getElementById('main')
);