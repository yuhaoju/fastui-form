'use strict'

var React = require('react-native')

var {TextInput, StyleSheet,} = React

var Input = React.createClass({
    getInitialState() {
        return {
            value: this.props.value,
        };
    },
    render() {
        return (
            <TextInput value={String(this.state.value)}
                style={[styles.input, this.props.editable ? null : styles.disabled]}
                onChangeText={(value) => this.setState({value: value})}
                editable={this.props.editable}
                secureTextEntry={this.props.type === "password"}
                placeholder={this.props.placeholder}
                />
        );
    },
    getValue: function(){
        return this.props.type === "string" ? this.state.value : Number(this.state.value)
    }
})

var styles = StyleSheet.create({
    input: {
        height: 32,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 7,
        paddingRight: 7,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#ccc',
        color: '#333',
        fontSize: 17,
    },
    disabled: {
        color: '#aaa'
    },
})

module.exports = Input
