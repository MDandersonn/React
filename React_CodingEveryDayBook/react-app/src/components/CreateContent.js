import React, {Component} from 'react';
class CreateContent extends Component{
    render(){
        console.log("CreateContent render");
        return <article>
            <h2>Create</h2>
            <form action="/create_process" method="post"
            //제출버튼클릭하면 onSubmit작동
                onSubmit={function(e){
                    e.preventDefault();///create_process로 페이지이동 못하게 차단.
                    this.props.onSubmit(
                        e.target.title.value,//e.target: <form>태그안의 모든것
                        e.target.desc.value
                       
                    );
                }.bind(this)}>
            <p><input type="text" name="title" placeholder="title"></input></p>
            <p><textarea name="desc" placeholder="description"></textarea> </p>
            <p><input type="submit"></input></p>

            </form>
        </article>
    }
}

export default CreateContent;