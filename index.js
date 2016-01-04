'use strict'

var React = require('react-native')
var extend = require('extend')

// common components
var Switch = require('./components/switch');
var Input = require('./components/input');

// custom components
var Spinner = require('react-native-spinner');

var {StyleSheet, Text, View, TouchableOpacity, TextInput, SwitchIOS,} = React

var fieldType = {
    String: "string",
    Number: "number",
    Boolean: "boolean",
    Spinner: "spinner",
    Password: "password",
}, rowId = 0

var inited = false
var Form = React.createClass({
    getInitialState: function () {
        return {}
    },
    getDefaultProps: function () {
        return {}
    },
    componentDidMount: function(){
        inited = true
    },
    render: function () {
        var model = this.props.model,
            values = this.props.value,
            rows = [],
            defaultRowModel = {
                style: {},
                disabled: false,
            }

        for (var i in model) {
            var rowModel = extend(true, {}, defaultRowModel, model[i]),
                rowContent = null

            switch (rowModel.type) {
                case "number":
                case "string":
                case "password":
                    rowContent = <Input
                                    ref={rowId}
                                    name={i}
                                    type={rowModel.type}
                                    value={rowModel.value}
                                    editable={!rowModel.disabled}
                                    placeholder={rowModel.placeholder}
                                />
                    break;
                case "boolean":
                    rowContent = <Switch
                                    ref={rowId}
                                    name={i}
                                    value={rowModel.value}
                                    disabled={rowModel.disabled}
                                />
                    break;
                case "spinner":
                    rowContent = <Spinner
                                    ref={rowId}
                                    name={i}
                                    value={rowModel.value}
                                    disabled={rowModel.disabled}
                                />
                    break;
                default:
            }

            rows.push(
                <View key={rowId++} style={styles.formRow}>
                    <Text style={[styles.label]}>{rowModel.label}</Text>
                    {rowContent}
                </View>
            )
        }

        return (
            <View style={styles.container}>
                {rows}
            </View>
        )
    },
    getValue: function(){
        var values = {}
        for(var i in this.refs){
            var row = this.refs[i]
            if(row.getValue){
                values[row.props.name] = row.getValue()
            }
        }
        console.log(values);
        return values
    }
})

var styles = StyleSheet.create({
    container: {
        paddingTop: 2,
        paddingBottom: 12,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#fff',
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 15,
    },
    formRow: {
        marginTop: 10,
    },
})

module.exports = {
    Form: Form,
    fieldType: fieldType
}
