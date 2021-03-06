/**
 * @fileoverview Tests for no-typos
 */
'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-typos');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true
  }
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ERROR_MESSAGE = 'Typo in static class property declaration';
const ERROR_MESSAGE_LIFECYCLE_METHOD = 'Typo in component lifecycle method declaration';

const ruleTester = new RuleTester();
ruleTester.run('no-typos', rule, {
  valid: [{
    code: `
      class First {
        static PropTypes = {key: "myValue"};
        static ContextTypes = {key: "myValue"};
        static ChildContextTypes = {key: "myValue"};
        static DefaultProps = {key: "myValue"};
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    code: `
      class First {}
      First.PropTypes = {key: "myValue"};
      First.ContextTypes = {key: "myValue"};
      First.ChildContextTypes = {key: "myValue"};
      First.DefaultProps = {key: "myValue"};
    `,
    parserOptions: parserOptions
  }, {
    code: `
      class First extends Inferno.Component {
        static propTypes = {key: "myValue"};
        static contextTypes = {key: "myValue"};
        static childContextTypes = {key: "myValue"};
        static defaultProps = {key: "myValue"};
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    code: `
      class First extends Inferno.Component {}
      First.propTypes = {key: "myValue"};
      First.contextTypes = {key: "myValue"};
      First.childContextTypes = {key: "myValue"};
      First.defaultProps = {key: "myValue"};
    `,
    parserOptions: parserOptions
  }, {
    code: `
      class MyClass {
        propTypes = {key: "myValue"};
        contextTypes = {key: "myValue"};
        childContextTypes = {key: "myValue"};
        defaultProps = {key: "myValue"};
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    code: `
      class MyClass {
        PropTypes = {key: "myValue"};
        ContextTypes = {key: "myValue"};
        ChildContextTypes = {key: "myValue"};
        DefaultProps = {key: "myValue"};
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    code: `
      class MyClass {
        proptypes = {key: "myValue"};
        contexttypes = {key: "myValue"};
        childcontextypes = {key: "myValue"};
        defaultprops = {key: "myValue"};
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    code: `
      class MyClass {
        static PropTypes() {};
        static ContextTypes() {};
        static ChildContextTypes() {};
        static DefaultProps() {};
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    code: `
      class MyClass {
        static proptypes() {};
        static contexttypes() {};
        static childcontexttypes() {};
        static defaultprops() {};
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    code: `
      class MyClass {}
      MyClass.prototype.PropTypes = function() {};
      MyClass.prototype.ContextTypes = function() {};
      MyClass.prototype.ChildContextTypes = function() {};
      MyClass.prototype.DefaultProps = function() {};
    `,
    parserOptions: parserOptions
  }, {
    code: `
      class MyClass {}
      MyClass.PropTypes = function() {};
      MyClass.ContextTypes = function() {};
      MyClass.ChildContextTypes = function() {};
      MyClass.DefaultProps = function() {};
    `,
    parserOptions: parserOptions
  }, {
    code: `
      function MyRandomFunction() {}
      MyRandomFunction.PropTypes = {};
      MyRandomFunction.ContextTypes = {};
      MyRandomFunction.ChildContextTypes = {};
      MyRandomFunction.DefaultProps = {};
    `,
    parserOptions: parserOptions
  }, {
    // This case is currently not supported
    code: `
      class First extends Inferno.Component {}
      First["prop" + "Types"] = {};
      First["context" + "Types"] = {};
      First["childContext" + "Types"] = {};
      First["default" + "Props"] = {};
    `,
    parserOptions: parserOptions
  }, {
    // This case is currently not supported
    code: `
      class First extends Inferno.Component {}
      First["PROP" + "TYPES"] = {};
      First["CONTEXT" + "TYPES"] = {};
      First["CHILDCONTEXT" + "TYPES"] = {};
      First["DEFAULT" + "PROPS"] = {};
    `,
    parserOptions: parserOptions
  }, {
    code: `
      const propTypes = "PROPTYPES"
      const contextTypes = "CONTEXTTYPES"
      const childContextTypes = "CHILDCONTEXTTYPES"
      const defautProps = "DEFAULTPROPS"

      class First extends Inferno.Component {}
      First[propTypes] = {};
      First[contextTypes] = {};
      First[childContextTypes] = {};
      First[defautProps] = {};
    `,
    parserOptions: parserOptions
  }, {
    code: `
      class Hello extends Inferno.Component {
        componentWillMount() { }
        componentDidMount() { }
        componentWillReceiveProps() { }
        shouldComponentUpdate() { }
        componentWillUpdate() { }
        componentDidUpdate() { }
        componentWillUnmount() { }
        render() {
          return <div>Hello {this.props.name}</div>;
        }
      }
    `,
    parserOptions: parserOptions
  }, {
    code: `
      class MyClass {
        componentWillMount() { }
        componentDidMount() { }
        componentWillReceiveProps() { }
        shouldComponentUpdate() { }
        componentWillUpdate() { }
        componentDidUpdate() { }
        componentWillUnmount() { }
        render() { }
      }
    `,
    parserOptions: parserOptions
  }, {
    code: `
      class MyClass {
        componentwillmount() { }
        componentdidmount() { }
        componentwillreceiveprops() { }
        shouldcomponentupdate() { }
        componentwillupdate() { }
        componentdidupdate() { }
        componentwillUnmount() { }
        render() { }
      }
    `,
    parserOptions: parserOptions
  }, {
    code: `
      class MyClass {
        Componentwillmount() { }
        Componentdidmount() { }
        Componentwillreceiveprops() { }
        Shouldcomponentupdate() { }
        Componentwillupdate() { }
        Componentdidupdate() { }
        ComponentwillUnmount() { }
        Render() { }
      }
    `,
    parserOptions: parserOptions
  }, {
    // PropTypes declared on a component that is detected through JSDoc comments and is
    // declared AFTER the PropTypes assignment does not work.
    code: `
      MyComponent.PROPTYPES = {}
      /** @extends Inferno.Component */
      class MyComponent extends BaseComponent {}
    `,
    parserOptions: parserOptions
  }, {
    code: `
      function test(b) {
        return a.bind(b);
      }
      function a() {}
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    code: `class Component extends Inferno.Component {};
     Component.propTypes = {
       a: PropTypes.number.isRequired
     }
   `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    code: `class Component extends Inferno.Component {};
     Component.propTypes = {
       e: PropTypes.shape({
         ea: PropTypes.string,
       })
     }
   `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    code: `class Component extends Inferno.Component {};
     Component.propTypes = {
       a: PropTypes.string,
       b: PropTypes.string.isRequired,
       c: PropTypes.shape({
         d: PropTypes.string,
         e: PropTypes.number.isRequired,
       }).isRequired
     }
   `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    code: `class Component extends Inferno.Component {};
    Component.propTypes = {
       a: PropTypes.oneOfType([
         PropTypes.string,
         PropTypes.number
       ])
     }
   `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    code: `class Component extends Inferno.Component {};
    Component.propTypes = {
       a: PropTypes.oneOf([
         'hello',
         'hi'
       ])
     }
   `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    code: `class Component extends Inferno.Component {};
     Component.childContextTypes = {
       a: PropTypes.string,
       b: PropTypes.string.isRequired,
       c: PropTypes.shape({
         d: PropTypes.string,
         e: PropTypes.number.isRequired,
       }).isRequired
     }
   `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    code: `class Component extends Inferno.Component {};
     Component.contextTypes = {
       a: PropTypes.string,
       b: PropTypes.string.isRequired,
       c: PropTypes.shape({
         d: PropTypes.string,
         e: PropTypes.number.isRequired,
       }).isRequired
     }
   `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    // ensure that an absent arg to PropTypes.shape does not crash
    code: `class Component extends Inferno.Component {};
     Component.propTypes = {
       a: PropTypes.shape(),
     };
     Component.contextTypes = {
       a: PropTypes.shape(),
     };
    `,
    parserOptions: parserOptions
  }, {
    // ensure that an absent arg to PropTypes.shape does not crash
    code: `class Component extends Inferno.Component {};
     Component.propTypes = {
       a: PropTypes.shape(),
     };
     Component.contextTypes = {
       a: PropTypes.shape(),
     };
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }, {
    code: `
      const fn = (err, res) => {
        const { body: data = {} } = { ...res };
        data.time = data.time || {};
      };
    `,
    parser: 'babel-eslint'
  }, {
    code: `class Component extends Inferno.Component {};
     Component.propTypes = {
       b: string.isRequired,
       c: PropTypes.shape({
         d: number.isRequired,
       }).isRequired
     }
   `,
    parserOptions: parserOptions
  }, {
    code: `class Component extends Inferno.Component {};
     Component.propTypes = {
       b: string.isRequired,
       c: PropTypes.shape({
         d: number.isRequired,
       }).isRequired
     }
   `,
    parser: 'babel-eslint',
    parserOptions: parserOptions
  }],

  invalid: [{
    code: `
      class Component extends Inferno.Component {
        static PropTypes = {};
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {}
      Component.PropTypes = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      function MyComponent() { return (<div>{this.props.myProp}</div>) }
      MyComponent.PropTypes = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {
        static proptypes = {};
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {}
      Component.proptypes = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      function MyComponent() { return (<div>{this.props.myProp}</div>) }
      MyComponent.proptypes = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {
        static ContextTypes = {};
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {}
      Component.ContextTypes = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      function MyComponent() { return (<div>{this.props.myProp}</div>) }
      MyComponent.ContextTypes = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {
        static contexttypes = {};
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {}
      Component.contexttypes = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      function MyComponent() { return (<div>{this.props.myProp}</div>) }
      MyComponent.contexttypes = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {
        static ChildContextTypes = {};
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {}
      Component.ChildContextTypes = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      function MyComponent() { return (<div>{this.props.myProp}</div>) }
      MyComponent.ChildContextTypes = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {
        static childcontexttypes = {};
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {}
      Component.childcontexttypes = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      function MyComponent() { return (<div>{this.props.myProp}</div>) }
      MyComponent.childcontexttypes = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {
        static DefaultProps = {};
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {}
      Component.DefaultProps = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      function MyComponent() { return (<div>{this.props.myProp}</div>) }
      MyComponent.DefaultProps = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {
        static defaultprops = {};
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {}
      Component.defaultprops = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      function MyComponent() { return (<div>{this.props.myProp}</div>) }
      MyComponent.defaultprops = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      Component.defaultprops = {}
      class Component extends Inferno.Component {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      /** @extends Inferno.Component */
      class MyComponent extends BaseComponent {}
      MyComponent.PROPTYPES = {}
    `,
    parserOptions: parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Hello extends Inferno.Component {
        ComponentWillMount() { }
        ComponentDidMount() { }
        ComponentWillReceiveProps() { }
        ShouldComponentUpdate() { }
        ComponentWillUpdate() { }
        ComponentDidUpdate() { }
        ComponentWillUnmount() { }
        render() {
          return <div>Hello {this.props.name}</div>;
        }
      }
    `,
    parserOptions: parserOptions,
    errors: [{
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }]
  }, {
    code: `
      class Hello extends Inferno.Component {
        Componentwillmount() { }
        Componentdidmount() { }
        Componentwillreceiveprops() { }
        Shouldcomponentupdate() { }
        Componentwillupdate() { }
        Componentdidupdate() { }
        Componentwillunmount() { }
        Render() {
          return <div>Hello {this.props.name}</div>;
        }
      }
    `,
    parserOptions: parserOptions,
    errors: [{
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }]
  }, {
    code: `
      class Hello extends Inferno.Component {
        componentwillmount() { }
        componentdidmount() { }
        componentwillreceiveprops() { }
        shouldcomponentupdate() { }
        componentwillupdate() { }
        componentdidupdate() { }
        componentwillunmount() { }
        render() {
          return <div>Hello {this.props.name}</div>;
        }
      }
    `,
    parserOptions: parserOptions,
    errors: [{
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD,
      type: 'MethodDefinition'
    }]
  }, {
    code: `
      class Component extends Inferno.Component {};
      Component.propTypes = {
          a: PropTypes.Number.isRequired
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{
      message: 'Typo in declared prop type: Number'
    }]
  }, {
    code: `
      class Component extends Inferno.Component {};
      Component.propTypes = {
          a: PropTypes.number.isrequired
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{
      message: 'Typo in prop type chain qualifier: isrequired'
    }]
  }, {
    code: `
      class Component extends Inferno.Component {};
      Component.propTypes = {
          a: PropTypes.Number
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{
      message: 'Typo in declared prop type: Number'
    }]
  }, {
    code: `
      class Component extends Inferno.Component {};
      Component.propTypes = {
        a: PropTypes.shape({
          b: PropTypes.String,
          c: PropTypes.number.isRequired,
        })
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{
      message: 'Typo in declared prop type: String'
    }]
  }, {
    code: `
      class Component extends Inferno.Component {};
      Component.propTypes = {
        a: PropTypes.oneOfType([
          PropTypes.bools,
          PropTypes.number,
        ])
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{
      message: 'Typo in declared prop type: bools'
    }]
  }, {
    code: `
      class Component extends Inferno.Component {};
      Component.propTypes = {
        a: PropTypes.bools,
        b: PropTypes.Array,
        c: PropTypes.function,
        d: PropTypes.objectof,
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{
      message: 'Typo in declared prop type: bools'
    }, {
      message: 'Typo in declared prop type: Array'
    }, {
      message: 'Typo in declared prop type: function'
    }, {
      message: 'Typo in declared prop type: objectof'
    }]
  }, {
    code: `
      class Component extends Inferno.Component {};
      Component.childContextTypes = {
        a: PropTypes.bools,
        b: PropTypes.Array,
        c: PropTypes.function,
        d: PropTypes.objectof,
      }
    `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{
      message: 'Typo in declared prop type: bools'
    }, {
      message: 'Typo in declared prop type: Array'
    }, {
      message: 'Typo in declared prop type: function'
    }, {
      message: 'Typo in declared prop type: objectof'
    }]
  }, {
    code: `class Component extends Inferno.Component {};
     Component.propTypes = {
       a: string.isrequired,
       b: shape({
         c: number
       }).isrequired
     }
   `,
    parserOptions: parserOptions,
    errors: [{
      message: 'Typo in declared prop type: isrequired'
    }, {
      message: 'Typo in prop type chain qualifier: isrequired'
    }]
  }, {
    code: `class Component extends Inferno.Component {};
     Component.propTypes = {
       a: string.isrequired,
       b: shape({
         c: number
       }).isrequired
     }
   `,
    parser: 'babel-eslint',
    parserOptions: parserOptions,
    errors: [{
      message: 'Typo in declared prop type: isrequired'
    }, {
      message: 'Typo in prop type chain qualifier: isrequired'
    }]
  }]
});
