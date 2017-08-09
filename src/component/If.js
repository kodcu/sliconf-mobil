import React, { Component } from 'react';
import {View} from 'react-native'

export class Then extends Component{
  render (){
    return <View>{this.props.children}</View>
  }
}

export class Else extends Component{
  render (){
    return <View>{this.props.children}</View>
  }
}

export class ElseIf extends Component{
  render (){
    return <View>{this.props.children}</View>
  }
}

class If extends Component {

    render() {
        let children = React.Children.toArray(this.props.children);

        if(children.length === 1){
          return this.props.con ? <View>{children[0]}</View> : <View></View>;
        }else if(children.length === 2){
          return this.props.con ? <View>{children[0]}</View> : <View>{children[1]}</View>;
        }else{
          return <View>{children.find((child)=>child.props.con)}</View>;
        }

    }
}

If.Then = Then;
If.Else = Else;
If.ElseIf = ElseIf;

export default If;
