import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePet,fetchUserPet, getNoOfUserGoodies } from '../actions';
import { addPet, feedPet, petMyPet, walkPet, useGoodies } from "../actions";
import { Redirect } from 'react-router-dom';

import '../css/style.css';
import FeedPet from './FeedPet';
import PetMyPet from './PetMyPet';
import WalkPet from './WalkPet';
import Progress from './Progress';
import UseGoodies from './UseGoodies';
import ReactTooltip from 'react-tooltip'

class PetProfile extends Component {
    componentDidMount() {
        //console.log("component did mount start");
        const { petId } = this.props.match.params;
        //console.log("PetId:" + petId);
        //console.log("type:" + typeof (petId));

        this.props.fetchSinglePet(petId);
        this.props.fetchUserPet(petId);
        this.props.getNoOfUserGoodies();
        //console.log("component did mount end");

    }
   

    renderSinglePet(activeUserPet, showActions, showUseGoodies, isHappinessLevelFullfilled) {
       //console.log("isHappinessLevelFullfilled"+isHappinessLevelFullfilled)
       
        if (this.props.activepet) {
            //console.log("Active pet is");
            //console.log(this.props.activeUserPet);
            //console.log(this.props);
                return (
                    <div>
                    <div className="col m4">
                    </div>
                    <div className="col m6">
                        <div className="col" id="petCard">
                            <div className="card">
                                <div className="card-image">
                                    <img src={window.location.origin + '/images/' + this.props.activepet.profilephotoLink+".jpg"} 
                                    alt="pet profile here"/>
                                    <span className="card-title black">{this.props.activepet.name}</span>
                                    {this.props.activepet.userspet === false && !showActions &&
                                            <span>
                                            <ReactTooltip />
                                             <button onClick={() => this.props.addPet(this.props.activepet.pet_id)} 
                                                 className="btn-floating halfway-fab waves-effect waves-light ">
                                             <i className="material-icons black" data-tip="AddPet">add</i>
                                         </button>                                         
                                         </span>
                                      }
                                </div>
                                <div className="card-content">
                                    <p>{this.props.activepet.description}</p>
                                    {!this.props.activeUserPet.userspet  &&
                                    <ul>
                                        <li style={{display: 'inline'}}><i className="material-icons red600" id="favourite_icon"  >favorite</i> <span>&nbsp;</span>{this.props.activepet.noOfTimesToPet}</li>
                                        <li style={{display: 'inline'}}><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><i className="material-icons black600" id="walk_icon">directions_walk</i> <span>&nbsp;</span> {this.props.activepet.noOfTimesToWalk}</li>
                                        <li style={{display: 'inline'}}><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><i className="material-icons green600" id="local_dining">local_dining</i> <span>&nbsp;</span> {this.props.activepet.noOfTimesToFeed}</li>
                                    </ul>
                                    }
                                      {(this.props.activepet.userspet === true || showActions) &&
                                      <div>
                                            <PetMyPet petMyPet={this.props.petMyPet} petId={this.props.activepet.pet_id}
                                            petProgress={activeUserPet.petProgress}/>
                                            <Progress progress={activeUserPet.petProgress} petAction={"Pet"}/>
                                            <br/>
                                            <WalkPet walkPet={this.props.walkPet} petId={this.props.activepet.pet_id}
                                            walkProgress={activeUserPet.walkProgress}/>
                                            <Progress progress={activeUserPet.walkProgress} petAction={"Walk"}/>

                                            <br/>
                                            <FeedPet feedPet={this.props.feedPet} petId={this.props.activepet.pet_id}
                                            feedProgress={activeUserPet.feedProgress}/>
                                            <Progress progress={activeUserPet.petProgress} petAction={"Feed"}/>

                                        </div>
                                      }
                                      {(showActions && showUseGoodies) &&
                                        <UseGoodies useGoodies={this.props.useGoodies}
                                        petId={this.props.activepet.pet_id}
                                        isHappinessLevelFullfilled={isHappinessLevelFullfilled}/>
                                      }
        
                                   
                                </div>
                                {(this.props.activepet.userspet === true || showActions) &&
                                        <span>
                                        <button className="btn-floating btn-large   waves-light #90caf9 red lighten-2"  color="red lighten-2" >
                                                <i className="material-icons">mood_bad</i>
                                            </button>
                                            <input type="range" className="range-field" min="0" max={this.props.activepet.noOfTimesToFeed +this.props.activepet.noOfTimesToWalk+this.props.activepet.noOfTimesToPet}
                                                 value={activeUserPet.happinessLevel ? activeUserPet.happinessLevel :0} disabled color="blue" style={{ width: '70%' }}/>
                                            
                                            <button className="fab-button btn-floating btn-large green darken-2" >
                                                <i className="material-icons">mood</i>
                                            </button>
                                        </span>
                                }
    
                            </div>
                        </div>
                    </div>
                    </div>
                );
            
            
        }
    }
    renderContent(activeUserPet, showActions, showUseGoodies, isHappinessLevelFullfilled) {
        switch (this.props.auth) {
          case null:
            return;
          case false:
            return <Redirect to="/" />;
          default:
            return <div>
                    <div className="row" >
                        {this.renderSinglePet(activeUserPet, showActions, showUseGoodies, isHappinessLevelFullfilled)}
                    </div>
                    </div>;
        }
      }

    render() {
       const { activeUserPet, userGoodies, activepet} = this.props;
       let showActions = false;
       let showUseGoodies = false;
       let isHappinessLevelFullfilled = false;
        
       if(Object.keys(activeUserPet).length > 0){
            showActions= true;
            if(activeUserPet.noOfTimesPetted===(activepet.noOfTimesToPet))
            {
                isHappinessLevelFullfilled=true;
            }
        }
        if(Object.keys(userGoodies).length > 0){
            showUseGoodies= true;
        }

        return (
            <div>
            {this.renderContent(activeUserPet, showActions, showUseGoodies, isHappinessLevelFullfilled)}
            </div>
        );
    }

}


function mapStateToProps({ activepet,activeUserPet, userGoodies, auth }) {
    //console.log("Inside petprofile mapstatetoprops auth "+JSON.stringify(auth));
    
    return { activepet : activepet,
        activeUserPet : activeUserPet,
        userGoodies :   userGoodies,
        auth : auth     
    };
}

export default connect(mapStateToProps,{fetchSinglePet,fetchUserPet, feedPet, petMyPet, walkPet, addPet, getNoOfUserGoodies,
    useGoodies})(PetProfile);