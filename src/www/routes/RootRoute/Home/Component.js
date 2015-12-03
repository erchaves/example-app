import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Textarea from '../../../components/Textarea';
import updateMarkdown from '../../../actions/creators/updateMarkdown';
import debounce from '../../../../utils/debounce';

const propTypes = {
  onTextareaChange: PropTypes.func,
  textareaValue: PropTypes.string,
};

class HomeRouteComponent extends Component {
  render() {
    const { onTextareaChange, textareaValue } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <Textarea
            className="col-sm-12"
            onChange={onTextareaChange}
            value={textareaValue}
            placeholder="Add some markdown code" />
        </div>
      </div>
    );
  }
}

HomeRouteComponent.propTypes = propTypes;

const stateToProps = ({ markdown }) => ({
  textareaValue: markdown,
});

const dispatchToProps = dispatch => ({
  onTextareaChange: debounce(function (e) {
    dispatch(updateMarkdown(e.target.value));
  }, 300),
});

export default connect(stateToProps, dispatchToProps)(HomeRouteComponent);
