import React, { Component } from 'react';
import TOC from './components/TOC'
import Content from './components/Content';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.updateData = { id: -1, title: '', desc: '' };//함수 밖에 변수선언
        this.max_content_id = 3;
        this.state = {
            mode: 'welcome',
            selected_content_id: -1,
            subject: { title: "WEB", sub: 'World Wide Web!' },
            welcome: { title: "Welcome", desc: "Hello, React!!" },
            contents: [
                { id: 1, title: 'HTML', desc: 'HTML is for information' },
                { id: 2, title: 'CSS', desc: 'CSS is for design' },

                //지웠는데 다시 App을 로드하면서 이게 다시생성되는구나
                { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' }
            ]
        }
    }
    // state값이 바뀌면 state를 가지고있는 컴포넌트의 render함수가 다시호출됨,
    //하위 컴포넌트들의 render함수 또한 함께 호출되어 화면이 다시 그려짐

    getReadContent() {//선택된 목차(contents)의 id를 찾는일
        var i = 0;
        while (i < this.state.contents.length) {
            var data = this.state.contents[i];
            if (data.id === this.state.selected_content_id) {
                return data;
            }
            i = i + 1;
        }
    }

    getContent() {
        var _title, _desc, _article = null;
        var _content; //이렇게선언해도 getContent가 불러올때마다 초기화되어버리지.
        if (this.state.mode === "welcome") {
            this.updateData = { id: -1, title: '', desc: '' };
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <Content title={_title} desc={_desc}></Content>

        } else if (this.state.mode === 'read') {
            console.log("@@@read@@@this.state.contents: ", this.state.contents)
            _content = this.getReadContent();
            console.log("!!!!!!!!read!!!!_content :", _content)
            //_content 여기에 저장해놔도 update눌러서 이함수를 다시불러오는순간 초기화 되어버림..
            //따라서 함수 밖에 변수를 선언해놔야한다.

            // console.log(_content, "contents data가 설정되었습니다.",_content.id)
            if (_content !== undefined) {
                _article = <Content title={_content.title} desc={_content.desc}></Content>
            } else {
                _content = { id: -1, title: '', desc: '' }
            }
            this.updateData = _content;
            console.log("@@@@@@this.state.contents: ", this.state.contents)

        } else if (this.state.mode === 'create') {
            _article = <CreateContent onSubmit={function (_title, _desc) {
                this.max_content_id = this.max_content_id + 1;
                // this.state.contents.push({id:this.max_content_id, title:_title, desc:_desc});
                //위 방법은 원본을 변경. 배열에 추가 
                //concat방법은 원본을 복사해서  새데이터를 추가하여 새 배열 만듦
                var _contents = this.state.contents.concat(

                    {
                        id: this.max_content_id,
                        title: _title,
                        desc: _desc
                    }
                );
                this.setState({//리액트가 state.contents가 변경되었다는 사실을 알게함
                    contents: _contents,
                    mode: 'read',
                    selected_content_id: this.max_content_id

                    // contents:this.state.contents
                });
                console.log("create콤포넌트의 onsubmit함수작동", _title, _desc);
            }.bind(this)}></CreateContent>
        } else if (this.state.mode === 'update') {
            console.log("elseif update  : ", _content);
            console.log("@@@@@@@@@@@@@@@@@@APP")
            _article = <UpdateContent data={this.updateData} onSubmit={function (_id, _title, _desc) {
                var _contents = Array.from(this.state.contents);
                console.log("@@@@@@@@@@@@@@@@@@onSUBMIT")
                var i = 0;
                while (i < _contents.length) {
                    if (_contents[i].id == _id) {
                        _contents[i] = { id: _id, title: _title, desc: _desc };
                        break;
                    }
                    i = i + 1;
                }

                this.setState({
                    contents: _contents,
                    mode: 'read'
                });
                console.log("Update콤포넌트의 onsubmit함수작동", _title, _desc);
            }.bind(this)}></UpdateContent>
        }//else if (this.state.mode === 'delete') {
        // 내풀이 .. setState가 적용안됨
        // var _contents = Array.from(this.state.contents);
        //     var i=0;
        //     while(i < _contents.length){
        //         if(_contents[i].id===this.state.selected_content_id){
        //             _contents.splice(i,1);
        //             this.state.selected_content_id=-1;
        //             console.log("@@@@@@@__contents: " ,_contents)
        //             break;
        //         }
        //         i=i+1;
        //     }
        //     console.log("@@222__contents: " ,_contents)
        //     this.setState({
        //         contents: _contents,
        //         mode : 'read'
        //     });
        // }
        return _article
    }

    // state나 props의 값이 바뀌면 그 state를 가지고있는 컴포넌트의 render함수가 다시호출됨
    render() {
        console.log("App render");

        return (
            <div className="App">
                {/* Subject1  props 사용*/}
                <Subject title="WEB"></Subject>
                <br></br>

                {/* Subejct2  props,state사용 */}
                <Subject title={this.state.subject.title} sub={this.state.subject.sub} onChangePage={function () {
                    alert("hihihi");
                }.bind(this)}></Subject>
                <br></br>

                {/* Subject3 콤포넌트 안 쓸때. */}
                <header>
                    <h1><a href="/" onClick={function (e) {
                        console.log(e);
                        e.preventDefault();
                        alert("hi");
                        //state값 변경은 this.setState로 해야 render가 다시호출됨
                        this.setState({
                            mode: 'welcome',
                            selected_content_id: -1
                        });//누르면 welcome모드로
                        //this를 인식하려면 bind(this)해줘야함
                    }.bind(this)}>{this.state.subject.title}</a></h1>
                    {this.state.subject.sub}
                </header>


                <TOC data={this.state.contents} onChangePage={function (id) {
                    console.log("id: " + id);
                    console.log(`id: ${id}`);
                    this.setState({
                        mode: 'read',//누르면 read모드로 바뀜
                        selected_content_id: Number(id)//인자로전달되는건 문자열이라서

                    });
                }.bind(this)}></TOC>


                {/* mode에 따른 content출력  */}
                {this.getContent()}




                {/* <Content title={_title} desc={_desc}></Content> */}

                <br></br><br></br>
                mode: {this.state.mode}






                {/* CRUD 기능 조절버튼 */}
                <Control onChangeMode={function (_mode) {
                    if (_mode === 'delete') {
                        
                        var _contents = Array.from(this.state.contents);
                        var i = 0;
                        while (i < _contents.length) {
                            if (_contents[i].id === this.state.selected_content_id) {
                                _contents.splice(i, 1);
                                // this.state.selected_content_id = -1;
                                // console.log("@@@@@@@__contents: ", _contents)
                                break;
                            }
                            i = i + 1;
                        }
                        // console.log("@@222__contents: ", _contents)
                        this.setState({
                            contents: _contents,
                            mode: 'welcome'
                        });
                        // alert('deleted!');
                    }else{
                    this.setState({
                        mode: _mode
                    });
                    }
                }.bind(this)}></Control>



            </div>
        );
    }

}
export default App;
