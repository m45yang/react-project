var Map = React.createClass({  
	// create instance of google maps
	loadMapOnMount: function() {
		var mapOptions = {
		    center: new google.maps.LatLng( this.props.lat , this.props.lng ),
		    zoom: 8,
		    streetViewControl: false
		};
		var gmap = new google.maps.Map( document.getElementById('map'), mapOptions );
		var newBounds;

		// get the current bounds of the map after tiles loaded
		google.maps.event.addListenerOnce(gmap, 'tilesloaded', function(evt) {
			console.log('here');
			var bounds = {
				sw_lat : gmap.getBounds().getSouthWest().lat(),
				sw_lng : gmap.getBounds().getSouthWest().lng(),
				ne_lat : gmap.getBounds().getNorthEast().lat(),
				ne_lng : gmap.getBounds().getNorthEast().lng()
			};
			console.log(bounds);
		});

		console.log(newBounds);

		this.setState({ gmap : gmap });
	},
	// load markers every time state of app is changed
	loadMarkers: function() {
		// clear old markers
		for (var i=0; i<this.state.markers.length; i++) {
			this.state.markers[i].setMap(null);
		}
		markers = [];

		// grab new props passed from app
		var newData = this.props.data;

		// create new markers with new props
		for (var i=0; i<newData.length; i++) {
			console.log('adding marker: ' + newData[i].lat + ' ' + newData[i].lng);
			this.state.markers[i] = new google.maps.Marker({
				map: this.state.gmap,
			    position: new google.maps.LatLng(newData[i].lat, newData[i].lng),
			    title: newData[i].name
			});
		}
	},
	// set current bounds of map
	set_bounds: function() {
		var map = this.state.gmap;
		this.setState({ bounds: {
			sw_lat : map.getBounds().getSouthWest().lat(),
			sw_lng : map.getBounds().getSouthWest().lng(),
			ne_lat : map.getBounds().getNorthEast().lat(),
			ne_lng : map.getBounds().getNorthEast().lng()
		}});
		console.log(this.bounds);
	},
	getInitialState: function() {
		return {
			gmap: [],
			markers: [],
			bounds: []
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