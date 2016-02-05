var Person = React.createClass({
	render: function () {
		return (
			<div className="person">
				<div className="panel panel-default">
					<div className="panel-heading">
						<a href="#">{ this.props.name }</a>
					</div>
				</div>
				<p>{ this.props.desc }</p>
			</div>
		)
	}
});

var People = React.createClass({
	render: function() {
		var personList = this.props.data.map(function (person) {
			return (
				<Person key={ person.name } name={ person.name } desc={ person.desc } lat={ person.lat } lng={ person.lng }/>
			)
		});
		return (
			<div className="people">
				{personList}
			</div>
		)
	},
});