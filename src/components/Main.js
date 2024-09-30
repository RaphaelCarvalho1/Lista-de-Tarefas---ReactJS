import React, {Component} from "react";
import "./Main.css"

import Form from "./Form";
import Tarefas from "./Tarefas";

export default class Main extends Component{

  state = {
    novaTarefa:"",
    tarefas: [],
    index: -1
  };

  componentDidMount(){
    const tarefas = JSON.parse(localStorage.getItem("tarefas"));

    if (!tarefas) return;

    this.setState({tarefas});
  }

  componentDidUpdate(prevProps, prevState){
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  handleChange = (e) => {
    this.setState({novaTarefa:e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {tarefas, index} = this.state;
    let {novaTarefa} = this.state;
    novaTarefa = novaTarefa.trim();

    if(tarefas.includes(novaTarefa)) return;

    const novasTarefas = [...tarefas];

    if(index !== -1){
      novasTarefas[index] = novaTarefa;
      this.setState({novaTarefa:'', tarefas: novasTarefas, index: -1});
      return;
    }

    this.setState({novaTarefa:'', tarefas: [...tarefas, novaTarefa]});
  }

  handleEdit = (e, index) => {
    const {tarefas} = this.state;

    this.setState({index, novaTarefa: tarefas[index]});
  }


  handleDelete = (e, index) => {
    const {tarefas} = this.state;

    tarefas.splice(index, 1);

    this.setState({tarefas:[...tarefas]});
  }

  render(){
    const {novaTarefa, tarefas} = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>

        <Form handleSubmit = {this.handleSubmit}
              handleChange = {this.handleChange}
              novaTarefa = {novaTarefa}
        />

        <Tarefas handleEdit = {this.handleEdit}
                 handleDelete = {this.handleDelete}
                 tarefas = {tarefas}
        />
      </div>);
  }
}
