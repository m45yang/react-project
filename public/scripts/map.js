var reference = {};

var Map = React.createClass({  
	// create instance of google maps
	loadMapOnMount: function(rootNode) {
		var gmap = new GMaps ({
			div: '#map',
			lat: this.props.lat,
			lng: this.props.lng,
			zoom: 8
		});
		
		this.setState({ gmap : gmap });
	},
	// load markers every time state of app is changed
	loadMarkers: function() {
		if (this.state.gmap != 0) {
			var gmap = this.state.gmap;

			//clear old markers
			gmap.removeMarkers();

			// grab new props
			var data = this.props.data;
			for (var i=0; i<data.length; i++) {
				console.log('adding marker: ' + data[i].lat + ' ' + data[i].lng);
				gmap.addMarker ({
					lat: data[i].lat,
					lng: data[i].lng,
					infoWindow: {
						content: '<p>'+ data[i].name+'</p>'+
								 '<p>'+ data[i].desc+'</p>'
					}
				});
			}
		}
	},
	//init map and map boundaries
	init: function() {
		gmap = this.state.gmap;
		this.setState({ bounds: {
			sw_lat : gmap.getBounds().getSouthWest().lat(),
			sw_lng : gmap.getBounds().getSouthWest().lng(),
			ne_lat : gmap.getBounds().getNorthEast().lat(),
			ne_lng : gmap.getBounds().getNorthEast().lng()
		}});
		console.log(this.bounds);
	},
	getInitialState: function() {
		return {
			gmap: 0,
			bounds: []
		};
	},
	componentDidMount: function (rootNode) {
		reference = this.state.gmap;
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