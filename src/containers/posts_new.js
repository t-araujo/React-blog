import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostsNew extends Component {
  // field include some event handlers and are a single piece of state
  // we pass the field events to the input with that expression
  // without have to set up all the events individualy
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label> {field.label} </label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        />
        <div className='text-help'>
          { touched ? error : '' }
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  // handle submit is responsible takes a function that we define and pass
  // to handleSubmit, run the redux form thinks and call the callback witch is our function
  // and pass us the values
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label='Title'
          name='title'
          component={this.renderField}
        />
        <Field
          label='Categories'
          name='categories'
          component={this.renderField}
        />
        <Field
          label='Post Content'
          name='content'
          component={this.renderField}
        />
        <button type='submit' className='btn btn-primary'> Submit </button>
        <Link to='/' className='btn btn-danger'> Cancel </Link>
      </form>
    );
  }
}

// values is an object that will contain all the values the user submit in the form
// 
function validate(values) {
  const errors = {};

  // validate the inputs from 'values'
  if (!values.title || values.title.length < 3) {
    errors.title = 'Enter a title that is at least 3 caracteres';
  }

  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }

  if (!values.content) {
    errors.content = 'Enter some content please';
  }

  // if errors is empty, the form is fine to submit otherwise not
  return errors;
}

// Here we can pass one function with some configuration options
// form is the name of the form of this container
// validate is the validations of the form
// this is the way to combine reduxForm with connect method
export default reduxForm({
  validate,
  form: 'PostNewForm'
})(
  connect(null, { createPost })(PostsNew)
);

// Dynamic Forms, incomplete, the fieldHelper is empty

// import React, { Component, PropTypes } from 'react';
// import { Field, reduxForm } from 'redux-form';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { createPost } from '../actions/index';
// import { each, keys, map } from 'lodash';

// // const FIELDS = {'title', 'categories', 'content'};
// const FIELDS = {
//   title: {
//     type: 'input',
//     label: 'Title for Post'
//   },
//   categories: {
//     type: 'input',
//     label: 'Enter category'
//   },
//   content: {
//     type: 'textaerea',
//     label: 'Post contents'
//   }
// };

// class PostsNew extends Component {
//   constructor(props) {
//     super(props);

//     this.onSubmit = this.onSubmit.bind(this);
//     this.renderField = this.renderField.bind(this);
//   }
//   // field include some event handlers and are a single piece of state
//   // we pass the field events to the input with that expression
//   // without have to set up all the events individualy
//   renderField(fieldConfig, field) {
//     const fieldHelper = this.props.fields[field];
//     console.log('====================================');
//     console.log(this.props);
//     console.log('====================================');
//     // const className = `form-group ${fieldHelper.touched && fieldHelper.error ? 'has-danger' : ''}`;

//     return (
//       <div >
//         <label> {fieldConfig.label} </label>
//         <fieldConfig.type
//           className='form-control'
//           type='text'
//           {...fieldHelper}
//         />
//         <div className='text-help'>
//           {/* { fieldHelper.touched ? fieldHelper.error : '' } */}
//         </div>
//       </div>
//     );
//   }

//   onSubmit(values) {
//     this.props.createPost(values, () => {
//       this.props.history.push('/');
//     });
//   }

//   // handle submit is responsible takes a function that we define and pass
//   // to handleSubmit, run the redux form thinks and call the callback witch is our function
//   // and pass us the values
//   render() {
//     const { handleSubmit } = this.props;

//     return (
//       <form onSubmit={handleSubmit(this.onSubmit)}>
//         <h3> Create a New Post </h3>
//         { map(FIELDS, this.renderField) }
//         <button type='submit' className='btn btn-primary'> Submit </button>
//         <Link to='/' className='btn btn-danger'> Cancel </Link>
//       </form>
//     );
//   }
// }

// // values is an object that will contain all the values the user submit in the form
// // 
// function validate(values) {
//   const errors = {};

//   each(FIELDS, (type, field) => {
//     if (!values[field]) {
//       errors[field] = `Enter a ${field}`;
//     }
//   });

//   // // validate the inputs from 'values'
//   // if (!values.title || values.title.length < 3) {
//   //   errors.title = 'Enter a title that is at least 3 caracteres';
//   // }

//   // if (!values.categories) {
//   //   errors.categories = 'Enter some categories';
//   // }

//   // if (!values.content) {
//   //   errors.content = 'Enter some content please';
//   // }

//   // if errors is empty, the form is fine to submit otherwise not
//   return errors;
// }

// // Here we can pass one function with some configuration options
// // form is the name of the form of this container
// // validate is the validations of the form
// // this is the way to combine reduxForm with connect method
// export default reduxForm({
//   validate,
//   form: 'PostNewForm',
//   fields: keys(FIELDS)
// })(
//   connect(null, { createPost })(PostsNew)
// );
