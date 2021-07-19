import React from 'react';

function Profil_elev()
{
    <div>
        <div>
          <ul>Nume: {props.data.userData.firstName}</ul>
          <ul>Prenume: {props.data.userData.lastName}</ul>
          <ul>Email: {props.data.userData.email}</ul>
        </div>
        <div>
            <img src={props.data.userData.profilePhoto} alt='nu ai poza' heigth="300" width="300"/>
        </div>
    </div>
}