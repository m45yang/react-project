var Map = React.createClass({  
	loadPeopleFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({ data: data });
				var newData = this.state.data;
				var newMap = new GMaps({
					div: '#map',
					lat: this.props.lat,
					lng: this.props.lng
				});
				for (var i=0; i<newData.length; i++) {
					console.log('adding marker: ' + newData[i].lat + ' ' + newData[i].lng);
					newMap.addMarker({
						lat: newData[i].lat,
						lng: newData[i].lng,
						infoWindow: {
							content: '<p>'+ newData[i].name + '</p>'
									+'<p>'+ newData[i].desc + '</p>'
						}
					});
				}
				this.setState({ gmap: newMap });
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {
			gmap: [],
			data: []
		};
	},
	componentDidMount: function (rootNode) {
		this.loadPeopleFromServer();
	},
	render: function () {
		return (
			<div className='google-map'>
				<div id="map"></div>
			</div>
		);
	}
});