import React, { Component } from 'react';
import Estoria from './Estoria';
import EstoriaForm from './EstoriaForm';
import jQuery from 'jquery';

class Taskboard extends Component {
    constructor() {
        super();
        this.state = {
            estorias : []
        }
    }

    componentWillMount() {
        this._buscarEstorias();
    }

    _buscarEstorias() {
        jQuery.ajax({
            method: 'GET',
            url: 'http://10.54.1.13:3001/estorias',
            success: estorias => this.setState({estorias})
        });
    }

    render() {
        const estorias = this._getEstorias();
        const titulo = this._getTitulo(estorias.length);
        return (
            <div className="section no-pad-bot" id="index-banner">
                <div className="container">
                    <EstoriaForm adicionarEstoria={this._adicionarEstoria.bind(this)}/>
                    
                    <h1 className="header center orange-text">Estórias</h1>
                    <h3>{titulo}</h3>
                    {estorias}
                </div>

            </div>
        );
    }

    _adicionarEstoria(titulo, pontos, descricao) {
        const estoria = {
            titulo, 
            pontos, 
            descricao
        };
        jQuery.post('http://10.54.1.13:3001/estorias', estoria)
            .success(novaEstoria => {
                this.setState({estorias:this.state.estorias.concat([novaEstoria]) }
            ); 

        this.setState({
            estorias: this.state.estorias.concat([estoria])
        });
    }

     _getEstorias() {
        return this.state.estorias.map(estoria => 
            <Estoria 
                titulo={estoria.titulo} descricao={estoria.descricao}
                pontos={estoria.pontos} key={estoria.id}
                id={estoria.id}
                onDelete={this._excluirEstoria.bind(this)}/>);
    }

    _getTitulo(totalDeEstorias) {
        let titulo;
        if(totalDeEstorias === 0) {
            titulo = "Backlog vazio";
        }
        else if(totalDeEstorias === 1) {
            titulo = "1 estória";
        }
        else {
            titulo = `${totalDeEstorias} estórias`;
        }
        return titulo;
    }

    componentDidMount() {
        this._timer = setTimeout(() => this._buscarEstorias(), 5000);
    }

    componentWillUnmount() {
        clearTimeout(this._timer);
    }

    _excluirEstoria(idEstoria) {
        jQuery.ajax({
            method: 'DELETE',
            url: `http://10.54.1.13:3001/estorias/${idEstoria}`
        });
        const estorias = [...this.state.estorias];
        estorias.splice(idEstoria, 1);
        this.setState({estorias});
    }
}

export default Taskboard;