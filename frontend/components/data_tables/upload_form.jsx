import React from 'react';
import Dropzone from 'react-dropzone';
import {Link, withRouter} from 'react-router-dom';
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
    this.state = {
      title: "",
      data_type: "",
      table: [],
      errors: ""
    };
    this.errors = "";
  }

  componentDidMount(){
    this.fileReader = new FileReader();
  }

  parseFile(data,data_type){
    this.setState({errors: ""});
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
    this.setState({table, data_type});
  }

  onDrop(files){
    const file = files[0]; //only accept one file currently
    this.fileReader.onload = e =>{
      this.parseFile(e.target.result,files[0].type);
    };
    this.fileReader.readAsText(files[0]);
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
    this.setState({title: event.target.value, errors: ""});
  }



  handleSubmit(event){
    event.preventDefault();
    if(this.state.title === "" || !this.state.table === [] || this.state.data_type === ""){
      this.setState({errors: "Incomplete table detected"});
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
          <label className="errors">{this.state.errors}</label>
          <input value={this.state.title} onChange={this.changeTitle} placeholder="Title" className="newDataTableTitle"></input>
          {this.uploaddata()}
          <input value="Add new data table" type="submit" className="DataTableSubmit"/>
        </form>
      </div>
    );
  }
}

export default withRouter(UploadForm);
