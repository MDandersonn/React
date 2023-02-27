import React, {Component} from 'react';



//Subject라는 컴포넌트를 만들겠다는 선언
class Subject extends Component{
    render(){
        console.log("Subject render");
        return(
            <header> 
                {/* 이 태그의 속성으로 타이틀값.   */}
                <h1><a href="/" onClick={function(e){
                    e.preventDefault();
                    this.props.onChangePage();
                    

                }.bind(this)}>{this.props.title}</a></h1>
                {this.props.sub}<br></br>
                
            </header>
        );
    }
}

export default Subject;