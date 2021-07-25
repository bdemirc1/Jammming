import React from 'react'
import "./TrackList.css"
import { Track } from '../Track/Track.js'

export class TrackList extends React.Component{
    render(){
        var trackList = [];
        trackList =  this.props.tracks.map((track)=>{
            <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}></Track>
        });
        return (
            <div className="TrackList">
                {trackList}
            </div>
        );
    }
}