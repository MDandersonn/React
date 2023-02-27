import React, {Component} from 'react';
class TOC extends Component{
    shouldComponentUpdate(newProps,newState){
        //render이전에 호출되는함수이다.

        //newProps: TOC컴포넌트의 props가 바뀌었을때 바뀐값
        //newState: state가 바뀌었을때 바뀐 state값.
        console.log("==>TOC render shouldCompoenetUpdate",
            newProps.data,  //바뀐값
            this.props.data  // 현재값

            // 내생각에 변경이력이 저장되서 알수있는거같다. 그래서push쓰면안되고 concat써야한다 원본에 추가하면안됨  덮어씌워야함
            );
        //TOC로 들어오는 props값이 바뀌었을때 render가 호출되고 바뀌지않았을때 호출안되게
        if(this.props.data===newProps.data){
            return false;
        }
        return true;
        //true:렌더함수 실행 false:렌더함수 비실행 (state.contents가 변경되었으나 화면으로 확인불가)


    }
    render(){
        console.log("==>TOC render");
        let lists=[];   
        let data= this.props.data;
        let i=0;
        while(i<data.length){
            //여러개의 엘리먼트를 자동으로 생성하는경우 에러가나는데
            //각 리스트 항목은 key라는 prop를 가져야함
            //즉 여러개 항목으로 구성된 목록을 자동으로 생성할 때는 각 항목을 서로 구분하는 식별자를 지정해야함

            lists.push(<li key={data[i].id}><a href={"/content/"+data[i].id}
            data-id={data[i].id}//후에 e.target.dataset으로 접근할수있음
            onClick={function(e){
                e.preventDefault();
            // data- 라는 접두사로 시작되는 속성은 dataset이라는 특수한 객체를 통해 접근가능
                this.props.onChangePage(e.target.dataset.id);

            }.bind(this)}
            >{data[i].title}</a>:{data[i].desc}</li>);
            i=i+1;
        }
        return(
            <nav>
                <h1>TOC(목차)</h1>
                <ul>
                    {lists}
                </ul>
            </nav>
            // <nav>
            //     <h2>목차</h2>
            //     <ul>
            //         <li><a href="1.html">HTML</a></li>
            //         <li><a href="2.html">CSS</a></li>
            //         <li><a href="3.html">JavaScript</a></li>
            //     </ul>
            // </nav>
        );
    }
}

export default TOC;