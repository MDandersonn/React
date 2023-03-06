import React, { useEffect, useState } from 'react';
import './App.css';


function App() {
    var [funcShow,setFuncShow] = useState(true);
    var [classShow,setClassShow] = useState(true);

    return <div className="container">
        <h1>Hello World</h1>
        {/* <FuncComp initNumber={2}></FuncComp> */}
        {/* <ClassComp initNumber={2}></ClassComp> */}

        <input type="button" value="remove fuc" onClick={
            function(){
                setFuncShow(false)
            }
        }></input>
        <input type="button" value="remove class" onClick={
            function(){
                setClassShow(false)
            }
        }></input>
        {funcShow ? <FuncComp initNumber={2}></FuncComp>:null}
        {classShow ? <ClassComp initNumber={2}></ClassComp>:null}
    </div>
}

//컴포넌트 함수를 호출할때 첫번째 파라미터에 인자값으로 props값을 전달하도록
//약속되어있다.
var funcStyle ='color:yellow';
var funcId =0;
function FuncComp(props) {
    var numberState = useState(props.initNumber);//state의 초기값지정
    var number = numberState[0];//state의 값.
    var setNumber = numberState[1];//state를 바꾸는 함수
    console.log('numberState', numberState);
    console.log('number', number);
    console.log('setNumber', setNumber);

    // var dateState = useState((new Date()).toString());
    // var _date = dateState[0];
    // var setDate = dateState[1];
    var [_date,setDate] = useState((new Date()).toString());//축약형 

    //side effect (부수효과)
    useEffect(function(){//컴포넌트가 실행된 후에 추가로 필요한 작업 처리.(렌더작업이 끝난다음 호출)
        //componenetWillMount 나 componenetDidUpdate와 같다.
        console.log('%cfunc=> useEffect A(componentDidMount & componentDidUpdate)' +(++funcId), funcStyle);
        document.title=number+ ' : ' + _date;
        return function(){//render가 호출되서 useEffect가 다시실행되기전에 작업
            console.log('%cfunc=> useEffect return (componentDidMount & componentDidUpdate)' +(++funcId), funcStyle);
        }
    });
    useEffect(function(){//컴포넌트가 실행된 후에 추가로 필요한 작업 처리.(렌더작업이 끝난다음 호출)
        //componenetWillMount 나 componenetDidUpdate와 같다.
        // console.log('%cfunc=> useEffect B(componentDidMount & componentDidUpdate)' +(++funcId), funcStyle);
        console.log('%cfunc=> useEffect number (componentDidMount & componentDidUpdate)' +(++funcId), funcStyle);
        document.title=number; // + ' : ' + _date;
        return function(){
            console.log('%cfunc=> useEffect return (componentDidMount & componentDidUpdate)' +(++funcId), funcStyle);

        }
    }, [number]);//useEffect의 두번째인자로 배열을 전달
    //배열내의 요소내의 값의 상태가 바뀌었을때만 첫번째 인자인 콜백함수가 호출됨


    //cleanUp함수
    useEffect(function(){//componentDidMount에서만 실행 (DidUpdate엔 실행안함)
        console.log('%cfunc=> useEffect (cleanUp함수 @start@componentDidMount)' +(++funcId), funcStyle);
        document.title=number; 
        return function(){
            console.log('%cfunc=> 컴포넌트가 소멸될떄 호출useEffect return (@start@componentWillUnMount)' +(++funcId), funcStyle);

        }
    }, []);//빈배열로 넣어준다.

    console.log('%cfunc=> render ' +(++funcId), funcStyle);
    return (
        <div className="container">
            <h2>function style component</h2>
            <p>props Number : {props.initNumber}</p>
            <p>hook Number: {number}</p>
            <p>Date : {_date}</p>
            <input type="button" value="random" onClick={
                function () {
                    setNumber(Math.random());//함수에 매개변수로넣어주면 그게 값으로 지정됨.
                }
            }></input>
            <input type="button" value="date" onClick={
                function () {
                    setDate((new Date()).toString());//함수에 매개변수로넣어주면 그게 값으로 지정됨.
                }
            }></input>
        </div>
    )
}

var classStyle ='color:red';
class ClassComp extends React.Component {
    state = {
        number: this.props.initNumber,
        date: (new Date()).toString()
    }
    componentWillMount(){//페이지가 렌더링되기전에 해야할일
        console.log('%cclass => componentWillMount',classStyle);
    }
    componentDidMount(){//render실행후 UI가 다 그려진 다음에 추가처리
        console.log('%cclass => componentDidMount',classStyle);
    }
    shouldComponentUpdate(nextProps,nextState){
        //props나 state가 바뀔떄,
        //render메서드가 호출되기전에 render메서드를 호출할 필요가있는지없는지 결정
        console.log('%cclass => shouldComponentUpdate',classStyle);
        return true;//true면 render호출 false면 render비호출
    }
    componentWillUpdate(nextProps,nextState){
        console.log('%cclass => componentWillUpdate',classStyle);
    }
    componentDidUpdate(nextProps, nextState){
        //state가 바뀔때마다 인자로 이전 props값과 이전 state값을 전달함
        console.log('%cclass => componentDidUpdate',classStyle);
    }
    componentWillUnmont(){//컴포넌트가 소멸될떄 호출
        console.log('%cclass => componentWillUnMount',classStyle)
    }


    render() {
        console.log('%cclass => render',classStyle);
        return (
            <div className="container">
                <h2>class style component</h2>
                <p>props Number : {this.props.initNumber}</p>
                <p>state Number : {this.state.number}</p>
                <p>date: {this.state.date}</p>
                <input type="button" value="random" onClick={
                    function () {
                        this.setState({
                            number: Math.random()
                        });
                    }.bind(this)
                }></input>

                <input type="button" value="date" onClick={
                    function () {
                        this.setState({
                            date: (new Date()).toString()
                        });
                    }.bind(this)
                }></input>
            </div>
        );
    }
}


export default App;




// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



