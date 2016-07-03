'use strict';
import {StyleSheet, View, TouchableWithoutFeedback, Image} from "react-native";
import React, {Component} from "react";

class Rating extends Component {
    constructor(props) {
        super(props);

        let iconWidth = this.props.iconWidth ? this.props.iconWidth : 36;
        let iconHeight = this.props.iconHeight ? this.props.iconHeight : 36;

        let defaultIconSelected = (
            <Image
                style={{height:iconHeight,width:iconWidth}}
                source={require('./images/icon_star_selected.png')}/>
        )
        let defaultIconUnselected = (
            <Image
                style={{height:iconHeight,width:iconWidth}}
                source={require('./images/icon_star_unselected.png')}/>
        )

        this.state = {
            rating: this.props.rating ? this.props.rating : 0,
            max: this.props.max ? this.props.max : 5,
            iconWidth: iconWidth,
            iconHeight: iconHeight,
            iconSelected: this.props.iconSelected ? this.props.iconSelected : defaultIconSelected,
            iconUnselected: this.props.iconUnselected ? this.props.iconUnselected : defaultIconUnselected,
            editable: this.props.editable != null ? this.props.editable : true
        }
    }

    _onRate(rating) {
        this.setState({rating});
        if (this.props.onRate) {
            this.props.onRate(rating)
        }
    }

    render() {
        var icons = [];
        for (let i = 1; i <= this.state.max; i++) {
            icons.push(<TouchableWithoutFeedback
                disabled={!this.state.editable}
                key={i}
                onPress={()=>this._onRate(i)}
            >
                {this.state.rating>=i ? this.state.iconSelected : this.state.iconUnselected}
            </TouchableWithoutFeedback>)
        }
        return <View style={[this.props.style,{flexDirection:'row'}]}>
            {icons}
        </View>
    }
}

export default Rating;
