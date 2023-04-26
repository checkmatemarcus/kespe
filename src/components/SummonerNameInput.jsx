// basic react component hook skeleton
import React from 'react';
import { Label, TextInput } from 'flowbite-react';

const SummonerNameInput = () => {
    return (

    <div>
        <div className="mb-2 block">
            <Label htmlFor="username" value="Username"/>
        </div>
        <TextInput
            id="username3"
            placeholder="Bonnie Green"
            required={true}
            addon="@"
        />
    </div>
    
);
}

export default SummonerNameInput;
