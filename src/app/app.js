import React, { Component } from 'react';
import { render } from 'react-dom';


class App extends Component{

    constructor(){
        super();
        this.state = {
            nombre: '',
            documento: '',
            pass: '',
            fecha: '',
            id: '',
            usuarios: [],
            hobbies: []

        };
        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
        //this.addHobbie = this.addHobbie.bind(this);
    }
    addUser(e) {
        //console.log(this.state);
        if(this.state.id){
            fetch(`/api/peticiones/${this.state.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                } 
            })
            .then(res => res.json() )
            .then(data => {
                console.log(data)
                 M.toast({html: 'Usuario actualizado con éxito.'});
                 this.setState({nombre: '', documento: '', pass: '', fecha: '', id: ''});
                 this.fetchUsuarios();
            });
        } else {
        fetch('/api/peticiones', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } 
         })
             .then(res => res.json())
             .then(data => {
                 console.log(data)
                 M.toast({html: 'Usuario agregado con éxito.'});
                 this.setState({nombre: '', documento: '', pass: '', fecha: ''});
                 this.fetchUsuarios();
             })
             .catch(err => console.log(err))
        }
        e.preventDefault();
    }
    componentDidMount(){
        this.fetchUsuarios();
        this.fetchHobbies();
    }
    fetchUsuarios(){
        fetch('/api/peticiones')
        .then(res => res.json())
        .then(data => {
            this.setState({
                usuarios: data
            });
            console.log(this.state.usuarios);
        });
    }
    fetchHobbies(){
        fetch(`/api/buscar`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                hobbies: data
            });
            console.log(this.state.hobbies);
        });
    }
    deleteUser(id){
        if(confirm('Estas seguro de querer eliminar el usuario?')) {
            //console.log('Borrando: ', id);   
            //fetch('/api/peticiones' + id)
            fetch(`/api/peticiones/${id}`, {
                method: 'DELETE', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Usuario eliminad con éxito.'});
                this.setState({nombre: '', documento: '', pass: '', fecha: ''});
                this.fetchUsuarios();
            })
        }
    }
    editarUser(id){
        fetch(`/api/peticiones/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    nombre: data.nombre,
                    documento: data.documento,
                    pass: data.pass,
                    fecha: data.fecha,
                    id: data.id
                })
            })
    }
    handleChange(e){
        console.log(e.target.name);
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        //e.preventDefault();
    }
    
    render(){
        return(
            <div>
                <nav className="light-blue darken-4"> 
                    <div className="container">
                        <a className="brand-logo" href="/">Mern stack</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addUser}>
                                        <div className="row">
                                            <label>Agregar un usuario</label>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="nombre" onChange={this.handleChange}
                                                type="text" placeholder="Agrega un nombre de usuario" 
                                                value={this.state.nombre}  />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                            <input name="documento" onChange={this.handleChange}
                                            type="text" placeholder="Agrega un # de documento de usuario" 
                                            value={this.state.documento} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                            <input name="pass" onChange={this.handleChange}
                                            type="password" placeholder="Agrega un password de usuario"
                                            value={this.state.pass} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                            <input name="fecha" onChange={this.handleChange}
                                            type="date" placeholder="Agrega una fecha de usuario"
                                            value={this.state.fecha} />
                                            </div>
                                        </div>
                                        <div>
                                            <button type="submit" className="btn light-blue darken-4"> Enviar </button>
                                        </div>
                                    </form>
                                </div>
                            </div>                    
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre:</th>
                                        <th>Documento:</th>
                                        <th>Contraseña:</th>
                                        <th>Fecha:</th>
                                        <th>Id:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.usuarios.map(usuario =>{
                                            return (
                                                <tr key={usuario.id}>
                                                    <td>{usuario.nombre}</td>
                                                    <td>{usuario.documento}</td>
                                                    <td>{usuario.pass}</td>
                                                    <td>{usuario.fecha}</td>
                                                    <td>{usuario.id}</td>                                                
                                                    <td style={{display: 'flex'}}>
                                                        <button className="btn light-blue darken-4"
                                                        onClick={() => this.deleteUser(usuario.id)}
                                                        style={{margin:'4px'}}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4"
                                                        onClick={() => this.editarUser(usuario.id)}
                                                        style={{margin:'4px'}}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <h2>Hobbies existentes</h2>
                            <table>
                            <thead>
                                    <tr>
                                        <th>Nombre hobbie:</th>
                                        <th>Descripcion:</th>
                                        <th>Id:</th>                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.hobbies.map(hobbie =>{
                                            return (
                                                <tr key={hobbie.id}>
                                                    <td>{hobbie.nombre}</td>
                                                    <td>{hobbie.descripcion}</td>                                                    
                                                    <td>{hobbie.id}</td>                                                                                                    
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </div>
                
        )
    }
}
export default App;