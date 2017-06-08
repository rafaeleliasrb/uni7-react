import React, { Component } from 'react';
import Estoria from './Estoria';
import EstoriaForm from './EstoriaForm';

class Taskboard extends Component {
    constructor() {
        super();
        this.state = {
            estorias : [
                {id: 1, titulo: 'Contratar seguro', descricao: 'Como usuário...', pontos: 10},
                {id: 2, titulo: 'Cancelar seguro', descricao: 'Como usuário...', pontos: 20}
            ]
        }
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
            descricao,
            id: this.state.estorias.length + 1 
        };

        this.setState({
            estorias: this.state.estorias.concat([estoria])
        });
    }

     _getEstorias() {
        return this.state.estorias.map(estoria => 
            <Estoria 
                titulo={estoria.titulo} descricao={estoria.descricao}
                pontos={estoria.pontos} key={estoria.id}/>);
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
}

export default Taskboard;