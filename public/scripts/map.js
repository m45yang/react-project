var Map = React.createClass({

	getInitialState: function() {
		return {
			gmap: null,
		};
	},

	// create instance of google maps
	loadMapOnMount: function(rootNode) {
		var gmap = new GMaps ({
			div: '#map',
			lat: this.props.lat,
			lng: this.props.lng,
			scrollWheel: false,
			zoom: 8
		});

		this.setState({ gmap : gmap });

		gmap.addListener('idle', function() {
			if (this.state.gmap !== null) {
				this.setBounds();
			}
		}.bind(this));
	},

	// load markers every time state of app is changed
	loadMarkers: function(data) {
		if (this.state.gmap) {
			var gmap = this.state.gmap;

			// clear old markers
			console.log('remove markers');
			gmap.removeMarkers();

			console.log('adding new markers');
			for (var i=0; i<data.length; i++) {
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

	// set map boundaries
	setBounds: function() {
		gmap = this.state.gmap;
		var bounds = {
			sw_lat : gmap.getBounds().getSouthWest().lat(),
			sw_lng : gmap.getBounds().getSouthWest().lng(),
			ne_lat : gmap.getBounds().getNorthEast().lat(),
			ne_lng : gmap.getBounds().getNorthEast().lng()
		};
		
		this.props.handleBoundChange(bounds);
	},

	componentDidMount: function(rootNode) {
		this.loadMapOnMount();
	},

	shouldComponentUpdate : function(nextProps, nextState) {
		// only re-render map if there are new search results
		return !nextProps.idList.equals(this.props.idList);
	},

	componentWillUpdate : function(nextProps, nextState) {
		this.loadMarkers(nextProps.data);
	},

	render: function () {
		return (
			<div id="map"></div>
		);
	}
});