var Map = React.createClass({  
    getDefaultProps: function () {
        return {
            initialZoom: 8,
            mapCenterLat: 43.6425569,
            mapCenterLng: -79.4073126,
        };
    },
    getInitialState: function() {
    	return {
    		map: [],
    		data: []
    	};
    },
    componentDidMount: function (rootNode) {
        map = new GMaps({
            div: '#map',
            lat: 0,
            lng: 0
        });
    },
    render: function () {
        return (
        	<div className='google-map'>
                <div id="map"></div>
            </div>
        );
    }
});