import React from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import NavBarContainer from '../navbar/navbar_container';
import SideBar from '../navbar/side_bar';

class HelpPage extends React.Component {
  render(){
    return (
      <div>
        <NavBarContainer />
        <div className="dataTables">
          <SideBar currentPage="help_page" />
            <div className="DataTables">
              <label className="tableTitle">Help Center</label>
              <div className="Help-Page-Body">
                <label className="Help-Page-Subtitle">What is Chartalize?</label>
                <p className="Help-Page-Text">Chartalize is a personal project of Li Hsuan Lu  using React/Redux as the frontend framework and Ruby on Rails as the backend support. It draws inspiration from Chartio, and allows users to plot various charts from uploaded data. Chartalize aims at providing clear data visualization with a simple and intuitive interface. Recharts is currently the library behind the charts generated on Chartalize, and ReactDnD is the library behind the drag and drop interactions during chart generation. </p>
                <label className="Help-Page-Subtitle">What can Chartalize do?</label>
                <p className="Help-Page-Text">Chartalize's functions can currently be broken down into three main areas.</p>
                <p className="Help-Page-Text"><b>Uploading data:</b></p>
                <p className="Help-Page-Text">Data tables can be uploaded in three main ways, CSV, TSV and JSON. For CSV and TSV files, the first row is taken as headings, while for JSON files, the object keys are taken as headings. Uploaded tables can be viewed by the user and used to generate charts. Only files below 20 kB are accepted and headings should not be numerical. <Link to='/data_tables/new' className="Help-Page-Links">Upload one now!</Link></p>
                <p className="Help-Page-Text"><b>Generating Charts</b></p>
                <p className="Help-Page-Text">Five different charts can be generated--line charts, bar charts, scatter charts, area charts and pie charts. Charts generated can also be sorted by both x and y axis, both ascending and descending. Currently, data on the y axis must be numerical values. Missing data values will also cause the chart to not be generated. Charts generated can be saved and viewed at anytime by the user. <Link to='/charts/new' className="Help-Page-Links">Make a chart now!</Link></p>
                <p className="Help-Page-Text"><b>Interaction with Other Users</b></p>
                <p className="Help-Page-Text">Charts generated and saved can then be shared with other users. Users must be selected from the current list of users in the database, and charts cannot be shared to the same user that generated the chart. Users can also view charts shared by other users. <Link to='/charts' className="Help-Page-Links">Look at your charts now to share one!</Link></p>
                <label className="Help-Page-Subtitle">Other questions?</label>
                <p className="Help-Page-Text">Check out how Chartalize was developed <a target="_blank" href="https://github.com/travelingpiano/Chartalize"className="Help-Page-Links">here</a> and feel free to reach out through <a target="_blank" href="https://www.linkedin.com/in/li-hsuan-lu-92389a41" className="Help-Page-Links">linkedin</a> if you have any additional questions!</p>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HelpPage);
