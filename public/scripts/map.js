var Map = React.createClass({  
	loadMapOnMount: function() {
		var newMap = new GMaps({
			div: '#map',
			lat: this.props.lat,
			lng: this.props.lng,
			zoom: 8
		});
		this.setState({ gmap : newMap });
	},
	loadMarkers: function() {
		var newData = this.props.data;
		var newMap = this.state.gmap;
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
	},
	getInitialState: function() {
		return {
			gmap: []
		};
	},
	componentDidMount: function (rootNode) {
		this.loadMapOnMount();
	},
	render: function () {
		this.loadMarkers();
		return (
			<div className='google-map'>
				<div id="map"></div>
			</div>
		);
	}
});