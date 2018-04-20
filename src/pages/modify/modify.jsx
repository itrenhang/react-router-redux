import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import './modify.css'
class Modify extends React.Component {
  constructor(props,context) {
    super(props,context)
  }
  render() {
    return (
      <div>
        <div onClick={this.getData.bind(this)}>
          点击
        </div>
        
        <div onClick={this.outLogin.bind(this)}>退出</div>
        {
          this.props.data.map(function(item,i){
            return <div key={i}>{item}</div>
          })
        }
      </div>
    )
  }
  outLogin(){
    let { history } = this.props;
    this.props.OUTLOGIN(history);
  }
  getData(){
    this.props.getData()
  }
}

function mapStateToProps(state,a){
  return {
    isLogin:state.isLogin,
    data:state.modifyRedux
  }
}
function mapDispatchToProps(dispatch){
  return {
    OUTLOGIN:function(history){
      dispatch({type:'OUT_LOGIN'})
      history.push('/index')
    },
    getData:function(){
      dispatch({type:'MODIFY_GETDATA'})
    }
  }
}

let ModifyReactRedux = connect(mapStateToProps,mapDispatchToProps)(Modify)

//导出组件
export default withRouter(ModifyReactRedux);