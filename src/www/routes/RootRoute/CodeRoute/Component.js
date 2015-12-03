import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Textarea from '../../../components/Textarea';
import updateMarkdown from '../../../actions/creators/updateMarkdown';

// This works
// import debounce from '../../../../utils/debounce';

// This doesn't work...
import debounce from '_utils/debounce';
// It resolves during the build, but then it errors when the page loads in the browser.
// GET / 500 238.910 ms - 882
  // Error: Cannot find module '_utils/debounce'
  //     at Function.Module._resolveFilename (module.js:338:15)
  //     at Function.Module._load (module.js:289:25)
  //     at Module.require (module.js:366:17)
  //     at require (module.js:385:17)
  //     at Object.<anonymous> (/.../src/www/routes/RootRoute/CodeRoute/Component.js:23:17)
  //     at Module._compile (module.js:425:26)
  //     at loader (/.../node_modules/babel-register/lib/node.js:127:5)
  //     at Object.require.extensions.(anonymous function) [as .js] (/.../node_modules/babel-register/lib/node.js:137:7)
  //     at Module.load (module.js:356:32)
  //     at Function.Module._load (module.js:313:12)

const propTypes = {
  onTextareaChange: PropTypes.func,
  textareaValue: PropTypes.string,
};

class CodeRouteComponent extends Component {
  render() {
    const { onTextareaChange, textareaValue } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <Textarea
            className="col-sm-12"
            onChange={onTextareaChange}
            value={textareaValue} />
        </div>
      </div>
    );
  }
}

CodeRouteComponent.propTypes = propTypes;

const stateToProps = ({ markdown }) => ({
  textareaValue: markdown,
});

const dispatchToProps = dispatch => ({
  onTextareaChange: debounce(function (e) {
    dispatch(updateMarkdown(e.target.value));
  }, 300),
});

export default connect(stateToProps, dispatchToProps)(CodeRouteComponent);
