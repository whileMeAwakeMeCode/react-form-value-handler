import React from 'react'
import { Grid, Icon, Divider, Form } from 'semantic-ui-react'

/**
 * @title   react-form-value-handler : https://www.npmjs.com/package/react-form-value-handler
 *          08 Aug 2019 by Mat Solidity 
 * @dev FormField React Component PROPS LIST
 * 
 - title {string} : the title of the field 
 - keyName {string} *required* : the key name of the pair key/value to set
 - value {*} : the value of the pair key/value to set or that is already set
 - type {string} : the type of input ("numeric", "text", "select", "checkbox") 
 -                 (default: "text")
 - formHandler {function} : function to call each time the value changes 
   (see react-form-value-handler README.md example)
 - tag {string} : the tag to display
 - incrementation {number} *only for "numeric" types* : number to add/substract when +/- buttons 
   are clicked (default: 1)
 - negativeAllowed {boolean} *only for "numeric" types* : allow negative numbers (default: false)
 - noDivider {boolean} : indicate that field must be rendered with no dividers
 - noBottomDivider {boolean} : indicate that field must be rendered with no divider on bottom
 - noTopDivider : indicate that field must be rendered with no divider on top
 - required : mark input as required with a red asterisk
 - placeholder : input placeholder
 - customComponent : display a custom component iso defaut component called with "type" 
   (a custom component needs to handle its values changes by itself, 
   use only if you want to take advantage of initializing the same FormField components within 
   the same method instead of parsing data to determine a specific component 
   or if you want to use our field styling anyway ;)
  
 - / * styles * /
 - titleAlign : align field title either on "left", "center" or "right" (default: "left")
 - containerStyle : styling for the formField container
 - titleClassName : className of title
 - tagClassName : className of tag
 * 
 * @notice a formHandler function must be added to the parent component
 * eg.:
 *  formHandler = (obj) => {
        this.setState({...obj})
    }
 * 
 */

    
/**
 * @dev text input focus event handler : deletes any 0 value 
 */
const noZero = (e) => {
    if (e.target.value === '0')
        e.target.value = ''
}


const FormField = (props) => {
    var { _key, incrementation, containerStyle, type, keyName, title, titleAlign, titleClassName, tag, tagClassName, value, formHandler, customComponent, negativeAllowed, placeholder, required, noTopDivider, noBottomDivider, noDivider } = props
    const numericalCondition = type && type === 'numeric'
    /* NUMERICAL Methods */
    const decrement = () => {
        value = value || 0

        const newVal = (!negativeAllowed && (parseInt(value)-incrementation < 0)) ? 0 : value-incrementation
        formHandler({[keyName]: newVal})
    }
    const increment = () => {
        value = value || 0

        
        formHandler({[keyName]: parseInt(value)+incrementation})
    }

    /*  */
    const maybeDivider = (i) => {
        if (
            (!noDivider && !i) 
            || (!noTopDivider && i === 1)
            || (!noBottomDivider && i === 2)
        )
            return <Divider />
    }

    const styles = {
        silver: {color: "silver"},
        bold: {fontWeight: "bold"},
        overable: {cursor: "pointer"},
        texts: {fontSize: '1vw'},
        textm: {fontSize: '1.5vw'},
    }

    const pStyle = {...styles.silver, ...styles.bold, ...styles.texts}

    return(
        <div key={_key} style={containerStyle}>
            {maybeDivider(1)}
            <Grid textAlign='center'>
                {/* title and tag */}
                <Grid.Column width={11} textAlign={titleAlign || "left"}>
                    <p style={pStyle} className={titleClassName}><span>{title}</span>{(required && <span style={{color:'red'}}>*</span>)}</p>
                </Grid.Column>
                <Grid.Column width={3}>
                    <p style={pStyle} className={tagClassName}>{tag}</p>
                </Grid.Column>

                {  customComponent ? customComponent :
                    (!type || numericalCondition || (type!=='select' && type !=='checkbox')) 
                    ? <span className="row">
                    <Grid.Column width={3}>
                        {numericalCondition && <Icon style={{zIndex:2}} onClick={decrement} styles={styles.overable} name="minus" circular color='red' />}
                    </Grid.Column>
                    <Grid.Column width={8} textAlign="center">
                        <Form.Input onFocus={noZero} placeholder={placeholder ? placeholder : ''} control={'input'} type={numericalCondition ? 'number' : (type ? type : 'text')} min={(numericalCondition && !negativeAllowed) ? 0 : undefined} size='huge' value={value ? value : numericalCondition ? 0 : ''} onChange={(e) => {formHandler({[keyName]: e.target.value})}} />
                    </Grid.Column>
                    <Grid.Column width={3} textAlign="center">
                        {numericalCondition && <Icon style={{zIndex:2}} onClick={increment} styles={styles.overable} name="plus" circular color='green' />}

                    </Grid.Column>
                    </span>
                    : <span className="row">
                        {
                            type==='select'
                            ? (
                                <Form.Select placeholder={title} options={value} onChange={(e) => { formHandler({[keyName]: e.target.innerText})}}/> // 'value' must be an array: [ {key, value, text} ]
                            ) : (
                                type==='checkbox'
                                && <Form.Checkbox checked={!!value} onChange={(e) => { formHandler({[keyName]: e.target.checked})}}/>
                            )
                        }
                    </span>
                    
                }
            </Grid>
            {maybeDivider(2)}
        </div>
    )
}

export default FormField



