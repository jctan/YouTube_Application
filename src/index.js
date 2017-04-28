//get react from installed node modules and access to this file.
import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyBGF-NaNEMQihKjf7Vl9e5_ZXrRVyiS2tA';


//Create a new component. This component should produce some HTML 
//type of component. it's a factory that create instances of component. 
//we passed class and not the instance. create instance before render to DOM.
class App extends Component {
    constructor(props){
        super(props);
        
        //component level state (localized)
        this.state = { 
            videos: [],
            selectedVideo: null
        };
        
        this.videoSearch('surfboards');
        
    }
    
    //callback
    videoSearch(term){
        YTSearch({ key: API_KEY, term: term}, (videos) => {
                //update the state with list of videos
                //when key and value is same. condense using ES6 - this.setState({ videos: videos })
                this.setState({ 
                    videos: videos, 
                    selectedVideo: videos[0]
                });
            });
    }
    
    
    render(){
        //debounce takes inner function and return new function that can be called once every 300 millsec
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)
        
        //use callbacks twice but in redux you move away from callbacks i.e onSearchTermChange.
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                    videos={this.state.videos} />
            </div>
        );  
    }
}



// Take this component's generated HTML and put it on the page (in the DOM)
// App - it's a type and it produces instances. to make a component just wrap in JSX tags and we're good to go. 
// 2nd element is an existence DOM node on the page (it's where to insert).
//find the div with class container, then render the app component into that div. 
ReactDOM.render(<App />, document.querySelector('.container'));