

var InputForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var name = React.findDOMNode(this.refs.name).value.trim();
		var desc = React.findDOMNode(this.refs.desc).value.trim();

		this.props.onPersonSubmit({name: name, desc: desc});

		React.findDOMNode(this.refs.name).value = '';
		React.findDOMNode(this.refs.desc).value = '';
	},
	render: function() {
		return (
			<form className="inputForm" onSubmit={ this.handleSubmit }>
				<input type="text" placeholder="Name" ref="name" />
				<input type="text" placeholder="Description" ref="desc" />
				<input type="submit" value="Submit!" />
			</form>
		)
	}
})

var Person = React.createClass({
	render: function () {
		return (
			<div className="person">
				<h2>{ this.props.name }</h2>
				<p>{ this.props.desc }</p>
			</div>
		)
	}
});

var Hello = React.createClass({
	loadPeopleFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
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
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadPeopleFromServer();
		setInterval(this.loadPeopleFromServer, this.props.timeInterval);
	},
	render: function() {
		var people = this.state.data.map(function (person) {
			return (
				<Person key={ person.id } name={ person.name } desc={ person.desc }/>
			)
		});
		return (
			<div className="hello">
				{people}
				<InputForm onPersonSubmit={this.handlePersonSubmit}/>
		</div>
		)
	},
});

React.render(
	<Hello url="/people.json" timeInterval={2000}/>,
	document.getElementById('app')
);