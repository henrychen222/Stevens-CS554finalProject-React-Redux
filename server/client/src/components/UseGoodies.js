import React from 'react';

export default function UseGoodies({ useGoodies, petId, isHappinessLevelFullfilled }) {
    //const FeedPet = ({ feedPet }) => {
    console.log("UseGoodies + petId" + petId);
    console.log("UseGoodies + isHappinessLevelFullfilled" + isHappinessLevelFullfilled);

    return (
        <div>
            <button
                className="btn-floating waves-effect waves-light #d1c4e9 grey lighten-3"
                style={{ margin: '5px' }}
                onClick={() => useGoodies(petId)} disabled={isHappinessLevelFullfilled}>
                <i className="material-icons #64ffda purple600"
                    data-tip="Use Goodies">card_giftcard</i>

            </button>
        </div>

    );


}

