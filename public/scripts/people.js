var InputForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var name = React.findDOMNode(this.refs.name).value.trim();
		var desc = React.findDOMNode(this.refs.desc).value.trim();
		var lat = React.findDOMNode(this.refs.lat).value.trim();
		var lon = React.findDOMNode(this.refs.lon).value.trim();

		this.props.onPersonSubmit({name: name, desc: desc, lat: lat, lon: lon});

		React.findDOMNode(this.refs.name).value = '';
		React.findDOMNode(this.refs.desc).value = '';
		React.findDOMNode(this.refs.lat).value = '';
		React.findDOMNode(this.refs.lon).value = '';
	},
	render: function() {
		return (
			<form className="inputForm" onSubmit={ this.handleSubmit }>
				<input type="text" placeholder="Name" ref="name" />
				<input type="text" placeholder="Description" ref="desc" />
				<input type="text" placeholder="Latitude" ref="lat" />
				<input type="text" placeholder="Longtitude" ref="lon" />
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
				<p>Latitude: { this.props.lat }</p>
				<p>Longtitude: { this.props.lon }</p>
				<hr/>
			</div>
		)
	}
});

var People = React.createClass({
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
		var personList = this.state.data.map(function (person) {
			return (
				<Person key={ person.id } name={ person.name } desc={ person.desc } lat={ person.lat } lon={ person.lon }/>
			)
		});
		return (
			<div className="people">
				{personList}
				<InputForm onPersonSubmit={this.handlePersonSubmit}/>
			</div>
		)
	},
});