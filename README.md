# React Form Value Handler

An easy to use form handler to distribute input components and handle settings and returns of your form inputs values within a react environment. 

Build on top of [react-semantic-ui](https://www.npmjs.com/package/semantic-ui-react)

## Installation

Use the package manager npm to install react-form-value-handler.

```bash
npm install react-form-value-handler
```

## Usage

```react
import React, { Component } from 'react';
import FormField from 'react-form-value-handler'

export default class MyForm extends Component {
  constructor(props) {
      super(props);
      // will be filled with FormField keyName/value pairs
      this.state = {  } 
      // will handle setting this component's state 
      this.formHandler = this.formHandler.bind(this)
  }

  formHandler = (stateProperty) => {
      this.setState({...stateProperty}) 
  }

  render() {
      const { currentYear, validateForm } = this.props
      const { carUser, location, yearIncome } = this.state

      return(
          <form id="myForm">

            <FormField 
              _key="field_1"
              keyName="yearIncome"
              tag="€"
              title={`Declared income in ${currentYear - 1} year`}
              value={yearIncome}   
              type='numeric'
              incrementation={500}
              formHandler={this.formHandler}        
            />

            <FormField 
              _key="field_2"
              keyName="location"   
              value={location}
              title="Your declared living address"
              type="text"
              tag="PC, City"
              placeholder="75009, Paris"
              formHandler={this.formHandler} 
            />

            <FormField
              _key="field_3"
              keyName="carUser"
              value={carUser}
              title="I use my car for my business trips"
              type="checkbox"
              formHandler={this.formHandler}
            />

            { 
              carUser &&
              <FormField 
                _key="field_1"
                keyName="usedFuel"
                title="What type of fuel do you use ?"
                type="select"
                value={[
                  {key:'fuel_1', value:'1', text:'Diesel'},
                  {key:'fuel_2', value:'2', text:'SP95'},
                  {key:'fuel_4', value:'3', text:'SP95-E10'},
                  {key:'fuel_5', value:'4', text:'SP98'}
                ]}
                formHandler={this.formHandler} 
              />
            }

            <button onClick={this.props.validateForm}>Confirm</button>

          </form>
        )
    }
}
/*  */


```

## Input Types

 - **text** (default)
 ![Alt text](./examples/textInput.jpg?raw=true "Title")
 
 - **select** and **numeric** 
 ![Alt text](./examples/selectAndNumericInputs.jpg?raw=true "Title")
 
 - **checkbox** 
 ![Alt text](./examples/checkbox.jpg?raw=true "Title")

 

## Props

 - **title** {string} : the title of the field 
 - **keyName** {string} *required* : the key name of the pair key/value to set
 - **value** {*} : the value of the pair key/value to set or that is already set or selection data in case of a "select" type
 - **formHandler** {function} : function to call each time the value changes 
   (see react-form-value-handler README.md example)
 - **type** {string} : the type of input ("numeric", "text", "select", "checkbox") 
 (default: "text")
 - **tag** {string} : the tag to display next to the title
 - **incrementation** {number} *only for "numeric" types* : number to add/substract when +/- buttons 
   are clicked (default: 1)
 - **negativeAllowed** {boolean} *only for "numeric" types* : allow negative numbers (default: false)
 - **noDivider** {boolean} : indicate that field must be rendered with no dividers
 - **noBottomDivider** {boolean} : indicate that field must be rendered with no divider on bottom
 - **noTopDivider** : indicate that field must be rendered with no divider on top
 - **required** : mark input as required with a red asterisk
 - **placeholder** : input placeholder
 - **customComponent** : display a custom component iso defaut component called with "type" 
   (a custom component needs to handle its values changes by itself, 
   use only if you want to take advantage of initializing the same FormField components within 
   the same method instead of parsing data to determine a specific component 
   or if you want to use our field styling anyway ;)
  
   ***styling props***
 - **titleAlign** : align field title either on "left", "center" or "right" (default: "left")
 - **containerStyle** : styling for the formField container
 - **titleClassName** : className of title
 - **tagClassName** : className of tag

## Important
A formHandler method MUST be passed to each FormField component in order for the value update to occur
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
