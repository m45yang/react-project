var Person = React.createClass({
	render: function () {
		return (
			<div className="person">
				<h2>{ this.props.name }</h2>
				<p>{ this.props.desc }</p>
				<p>Latitude: { this.props.lat }</p>
				<p>Longtitude: { this.props.lng }</p>
				<hr/>
			</div>
		)
	}
});

var People = React.createClass({
	render: function() {
		console.log(this.props.data);
		var personList = this.props.data.map(function (person) {
			return (
				<Person key={ person.id } name={ person.name } desc={ person.desc } lat={ person.lat } lng={ person.lng }/>
			)
		});
		return (
			<div className="people">
				{personList}
			</div>
		)
	},
});