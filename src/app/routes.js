import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';


import App from './app';
import BuscarUsuario from './buscar';


function RutaPrincipal(){
    return(
        <BrowserRouter>
            <div>
                <Route path="/crud" Component={App} />
                <Route path="/buscar" Component={BuscarUsuario} />
            </div>        
        </BrowserRouter>
    )

}
export default RutaPrincipal;