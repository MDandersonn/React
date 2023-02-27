import React, {Component} from 'react';
class UpdateContent extends Component{
    constructor(props){
        super(props);
        //props는 읽기전용 state는 setState로 변경가능
        this.state={
            id:this.props.data.id,
            title:this.props.data.title ,
            desc:this.props.data.desc
        };
        this.inputFormHandler=this.inputFormHandler.bind(this);
        //inputFormHandler내에서 this를 사용하기위해 bind(this)를 사용해야한다.
        //생성자에서 이미 bind된 함수로 this.inputFormHandler 값을 교체한것이다.
    }
    inputFormHandler(e) {

        this.setState({ [e.target.name] :e.target.value});
        //대괄호를 사용하면 객체내에서 ㄴ대괄호내의 값을 프로퍼티로 사용가능하다.
    }
    
    render(){
        console.log("UpdateContent render");
        console.log("aa",this.props.data);
        return <article>
            <h2>Update</h2>
            <form action="/create_process" method="post"
                onSubmit={function(e){
                    e.preventDefault();
                    this.props.onSubmit(
                        this.state.id,
                        e.target.title.value,
                        e.target.desc.value
                    );
                }.bind(this)}>
            {/* <input type="hidden" name="id" value={this.state.id}></input> */}
            <p><input type="text" name="title" placeholder="title" value={this.state.title}
                    onChange={this.inputFormHandler}></input></p>
            <p><textarea name="desc" placeholder="description"value={this.state.desc}
                        onChange={function(e){//위에처럼 함수로 적어도되는데 남겨놓음
                        console.log(e.target.value);
                        this.setState({ desc :e.target.value});
                    }.bind(this)}></textarea> </p>
            <p><input type="submit"></input></p>

            </form>
        </article>
    }
}

export default UpdateContent;