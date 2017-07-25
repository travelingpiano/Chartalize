import React from 'react';
import Dropzone from 'react-dropzone';
import {Link, withRouter} from 'react-router-dom';
import {values} from 'lodash';
import SideBar from '../navbar/side_bar';

class UploadForm extends React.Component{
  constructor(props){
    super(props);
    this.filepreset_display = "Drag a file here!";
    this.uploaddata = this.uploaddata.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.parseFile = this.parseFile.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.errors = this.props.errors;
    if(this.errors===undefined){
      this.errors = [];
    }
    this.state = {
      title: "",
      data_type: "",
      table: [],
      errors: this.errors
    };
  }

  componentDidMount(){
    this.fileReader = new FileReader();
  }

  componentWillReceiveProps(newProps){
    if(newProps.errors != this.props.errors && newProps.errors){
      this.setState({errors: newProps.errors});
    }
  }

  parseFile(data,data_type){
    this.setState({errors: []});
    this.filepreset_display = "Thanks for uploading a file";
    let table = [];
    const allTextLines = data.split(/\r\n|\n/);
    let delim = "";
    if(data_type === "text/csv"){
      delim = ',';
    }else if(data_type ==="text/tab-separated-values"){
      delim = '';
    }

    if(data_type === "application/json"){
      table = JSON.parse(data);
    }else{
      let headings = allTextLines[0].split(delim);
      for(let i = 1; i< allTextLines.length; i++){
        let currentLine = allTextLines[i].split(delim);
        let rowData = {};
        for(let j = 0; j<currentLine.length; j++){
          rowData[headings[j]] = currentLine[j];
        }
        table.push(rowData);
      }
    }
    this.setState({table, data_type, errors: []});
  }

  onDrop(files){
    const file = files[0]; //only accept one file currently
    if(file.size > 15000){
      let errors = this.state.errors;
      errors = ["File is too big. Only accepting 10kB or smaller"];
      this.setState({errors});
    }else{
      this.fileReader.onload = e =>{
        this.parseFile(e.target.result,files[0].type);
      };
      this.fileReader.readAsText(files[0]);
    }
  }

  uploaddata(){
    const acceptedTypes = "application/json,text/tab-separated-values,text/csv";
    let filepreset = "Drag a file here";
    return(
      <Dropzone multiple={false} accept={acceptedTypes} onDrop={this.onDrop} className="dropForm">
        {this.filepreset_display}
      </Dropzone>
    );
  }

  changeTitle(event){
    this.setState({title: event.target.value, errors: []});
  }

  handleSubmit(event){
    event.preventDefault();
    if(this.state.title === "" || !this.state.table === [] || this.state.data_type === ""){
      let errors = this.state.errors;
      errors.push("Incomplete table detected");
      this.setState({errors});
      //check for missing headings
    }else if(Object.keys(this.state.table[0]).includes("")){
      let errors = this.state.errors;
      errors.push("Empty heading values detected. Check uploaded file");
      this.setState({errors});
      //check for numeric headings
    }else if(!Object.keys(this.state.table[0]).every(isNaN)){
      let errors = this.state.errors;
      errors.push("Some headings are numbers. Check uploaded file");
      this.setState({errors});
    }else{
      let data_table = {};
      data_table.data_table = {};
      data_table.data_table.title = this.state.title;
      data_table.data_table.data_type = this.state.data_type;
      data_table.data_table.table = this.state.table;
      this.props.makeDataTable(data_table).then(
        ()=> this.props.history.push('/data_tables')
      );

    }
  }

  render (){
    return (
      <div className="dataTables">
        <SideBar currentPage="data_tables_new"/>
        <form className="DataTables" onSubmit={this.handleSubmit}>
          {this.state.errors.map((error)=>
            <label key={error} className="errors">{error}</label>)}
          <input value={this.state.title} onChange={this.changeTitle} placeholder="Title" className="newDataTableTitle"></input>
          {this.uploaddata()}
          <input value="Add new data table" type="submit" className="DataTableSubmit"/>
        </form>
      </div>
    );
  }
}

export default withRouter(UploadForm);
