import * as React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  redirect
} from 'react-router-dom'

import BulletinBoard from './Components/BulletinBoard';
import Main from './Components/Main';
import './App.css';
import CreateThread from './Components/thread/new/CreateThread';
import Thread from './Components/thread/Post/Thread';

function App() {
  const title = '掲示板';
  
  const [threads, setThreads] = React.useState([]);

  const getThreads = async (offset = 0) => {
    try {
      const resp = await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=${offset}`);
      const parsedResp = await resp.json();
      // if(parsedResp.some(getThread => !threads.find(thread => getThread.id === thread.id))) 
      setThreads(parsedResp);
    } catch(e) {
      console.log(e);
    }    
  };

  React.useEffect(() => (() => {
    getThreads();
  })(), []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" 
        loader={
          ({request}) => {
            // 作成したスレッドが見つかればスレッドページに遷移
            const params = new URL(request.url).searchParams;
            if(params.has('id')) {
              if(threads.some(thread => thread.id === params.get('id'))) return redirect(`thread/${threads.findIndex(thread => thread.id === params.get('id')) + 1}`);
            }
          }
        }
        element={
          <div className="app">
            <BulletinBoard title={title} />
          </div>
        }
      >
        <Route index element={<Main threads={threads} />} />
        <Route 
          path="thread/new" 
          action={
            async ({request}) => {
              const headers = {
                'Content-Type': 'application/json'
              };
              const data = await request.formData();
              try{
                const resp = await fetch('https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads', {
                  method: 'POST',
                  headers,
                  body: JSON.stringify({
                    title: data.get('title')
                  })
                });
                const respBody = await resp.json();
                console.log(respBody);
                if(!resp.ok) throw new Error(`Request Error. StatusCode: ${resp.status}`);
                // スレッド再取得
                getThreads();
                // クエリパラメータに作成したスレッドのIDをセット
                return redirect(`/?id=${respBody.id}`);
              } catch(e) {
                console.log(e);
              }
            }
          } 
          element={<CreateThread />}
        />
        <Route 
          path="thread/:threadNo" 
          /* loader={
            async ({params}) => {
              const threadNo = params.threadNo;              
              if(threads[threadNo - 1]) {
                let allPost = [];                
                let postsLen;
                do {
                  const resp = await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${threads[threadNo - 1].id}/posts?offset=${allPost.length}`);
                  const parsedResp = await resp.json();
                  const posts = parsedResp.posts ? parsedResp.posts : []
                  allPost = [...allPost, ...posts];
                  postsLen = posts.length;
                } while(postsLen === 10);
                return allPost;
              }                
            }
          } */
          action={
            async ({params, request}) => {
              const threadNo = params.threadNo;
              const headers = {
                'Content-Type': 'application/json'
              };
              const data = await request.formData();
              try{
                const resp = await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${threads[threadNo - 1].id}/posts`, {
                  method: 'POST',
                  headers,
                  body: JSON.stringify({
                    post: data.get('post')
                  })
                });
                const respBody = await resp.json();
                console.log(respBody);
                if(!resp.ok) throw new Error(`Request Error. StatusCode: ${resp.status}`);
                // 投稿完了後にテキストエリア初期化用の"return true"
                return true;             
              } catch(e) {
                console.log(e);
              }
            }
          }
          element={<Thread threads={threads}/>}
        />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
