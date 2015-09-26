var App = React.createClass({
	render: function () {
		return (
			<div className="app">
				<div className="row">
					<div className="col-lg-3">
						<People url="/people.json" timeInterval={20000} />
					</div>
					<div className="col-lg-9">
						<Map />
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