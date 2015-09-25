import React from "react";

var data = [
	{name: "Matthew Yang", desc: "Built this project to learn ReactJS"},
	{name: "Pete Hunt", desc: "A very Pete-ish guy."},
	{name: "Jordan Walke", desc: "Jordan likes walking."}
];

var InputForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var name = React.findDOMNode(this.refs.name).value.trim();
		var desc = React.findDOMNode(this.refs.desc).value.trim();

		// TODO: send request to the server
    	React.findDOMNode(this.refs.author).value = '';
    	React.findDOMNode(this.refs.text).value = '';
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
	getInitialState: function() {
		return {data: this.props.input};
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
  				<InputForm />
			</div>
		)
  	},
});

React.render(
	<Hello input={data}/>,
	document.getElementById('app')
);