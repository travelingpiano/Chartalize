import {connect} from 'react-redux';
import SideBar from './side_bar';

const mapStateToProps = (state,ownProps) => ({
  state
});

export default connect(mapStateToProps,null)(SideBar);
