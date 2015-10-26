var InputForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var id = React.findDOMNode(this.refs.id).value.trim();
		var name = React.findDOMNode(this.refs.name).value.trim();
		var desc = React.findDOMNode(this.refs.desc).value.trim();
		var lat = React.findDOMNode(this.refs.lat).value.trim();
		var lng = React.findDOMNode(this.refs.lng).value.trim();

		this.props.onPersonSubmit({id: id, name: name, desc: desc, lat: lat, lng: lng});

		React.findDOMNode(this.refs.id).value = '';
		React.findDOMNode(this.refs.name).value = '';
		React.findDOMNode(this.refs.desc).value = '';
		React.findDOMNode(this.refs.lat).value = '';
		React.findDOMNode(this.refs.lng).value = '';
	},
	render: function() {
		return (
			<form className="inputForm" onSubmit={ this.handleSubmit }>
				<input type="text" placeholder="id" ref="id" />
				<input type="text" placeholder="Name" ref="name" />
				<input type="text" placeholder="Description" ref="desc" />
				<input type="text" placeholder="Latitude" ref="lat" />
				<input type="text" placeholder="Longtitude" ref="lng" />
				<input type="submit" value="Submit!" />
			</form>
		)
	}
})