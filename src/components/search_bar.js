import React, { Component } from 'react';

//define a new class call Search and give its access to all its functionality that React.Component has
class SearchBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = { term: ''};
    }
    
    render() {
        return (
            <div className="search-bar">
                <input
                    value={this.state.term}
                    onChange={(event) => this.onInputChange(event.target.value)} />
            </div>
        );
    }
    
    //call back function onSearchTermChange
    onInputChange(term){
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
    
    /*onInputChange(event) {
        console.log(event.target.value);
    }*/
    
}

export default SearchBar;

