import React from 'react';
import Dropzone from 'react-dropzone';

class UploadForm extends React.Component{
  constructor(props){
    super(props);
    this.uploaddata = this.uploaddata.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.parseFile = this.parseFile.bind(this);
    this.state = {
      title: "",
      type: "",
      table: []
    };
  }

  componentDidMount(){
    this.fileReader = new FileReader();
  }

  parseFile(data,type){
    let table = [];
    const allTextLines = data.split(/\r\n|\n/);
    let delim = "";
    if(type === "text/csv"){
      delim = ',';
    }else if(type ==="text/tab-separated-values"){
      delim = '';
    }

    if(type === "application/json"){
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
    this.setState({table, type});
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
    return(
      <Dropzone multiple={false} accept={acceptedTypes} onDrop={this.onDrop}>
        <p>Drag a file in!</p>
      </Dropzone>
    );
  }

  render (){
    return (
    <div>

      <input></input>
      {this.uploaddata()}
    </div>);
  }
}

export default UploadForm;
