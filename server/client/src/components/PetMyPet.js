import React from 'react';

export default function PetMyPet({ petMyPet, petId, petProgress }) {
console.log("feedpet + pet"+petId);
    return(
            <button id="favourite_btn" className="btn-floating  pulse waves-effect waves-light grey lighten-3"
            style={{ margin: '5px' }}
            onClick={() =>
                petMyPet(petId)}>
                <i className="material-icons red600" id="favourite_icon"  >favorite</i>
            </button>
    );

    
}

