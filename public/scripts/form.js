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
			<div id="addPersonModal" className="modal fade" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal">&times;</button>
							<h4 className="modal-title">Add a person</h4>
						</div>
						<div className="modal-body">
							<form className="inputForm" onSubmit={ this.handleSubmit }>
								<div className="form-group">
									<label htmlFor="id">Id</label>
									<input type="text" className="form-control" id="id" ref="id" />
								</div>
								<div className="form-group">
									<label htmlFor="name">Name</label>
									<input type="text" className="form-control" id="name" ref="name" />
								</div>
								<div className="form-group">
									<label htmlFor="desc">Description</label>
									<input type="text" className="form-control" id="desc" ref="desc" />
								</div>
								<div className="form-group">
									<label htmlFor="lat">Latitude</label>
									<input type="text" className="form-control" id="lat" ref="lat" />
								</div>
								<div className="form-group">
									<label htmlFor="lng">Longitude</label>
									<input type="text" className="form-control" id="lng" ref="lng" />
								</div>
								<div className="form-group">
									<input type="submit" value="Submit!" />
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
			
		)
	}
})

module.exports = InputForm