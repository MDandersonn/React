import React, {Component} from 'react';
class Content extends Component{
    render(){
        console.log("Content render");
        return(
            <article>
                <h2>{this.props.title}(본문영역)</h2>
                {this.props.desc}<br></br>

            </article>
        );
    }
}

export default Content;