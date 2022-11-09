import * as React from 'react';

import Thread from './components/Thread';

const BulletinBoard = ({title}) => {
  const [newThreads, setNewThreads] = React.useState([]);

  const getThreads = ({offset = 0}) => {
    fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=${offset}`)
    .then(resp => resp.json())
    .then(parsedResp => setNewThreads(parsedResp))
    .catch(err => console.log(err));
  }

  React.useEffect(() => getThreads({offset: 0}), []);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className='app-title'><a href="#root">{title}</a></h1>
        <div className="create-thread"><a href="#root">スレッドを立てる</a></div>
      </header>
      <main className="app-main">
        <p className="board-title">新着スレッド</p>
        <ul className="thread-list">
          {newThreads.map(thread => <Thread key={thread.id} title={thread.title}/>)}
        </ul>
      </main>
      <footer className='app-footer'></footer>
    </div>
  )
};

export default BulletinBoard;