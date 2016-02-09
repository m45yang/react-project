var Person = React.createClass({
	render: function () {
		return (
			<div className="person">
				<div className="panel panel-warning">
					<div className="panel-heading">
						<a href="#">{ this.props.name }</a>
					</div>
					<div className="panel-body">
						<p>{ this.props.desc }</p>
					</div>
				</div>
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

module.exports = People