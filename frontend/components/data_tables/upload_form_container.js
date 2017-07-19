import {connect} from 'react-redux';
import UploadForm from './upload_form';

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps,mapDispatchToProps)(UploadForm);
