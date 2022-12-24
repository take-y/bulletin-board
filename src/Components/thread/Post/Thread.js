import React, {useRef} from "react";
import { useParams, Form, useActionData } from "react-router-dom";

import Post from "./Post";

const Thread = ({threads}) => {

  const [posts, setPosts] = React.useState([]);

  const {threadNo} = useParams();
  const title = threads[threadNo - 1] ? threads[threadNo - 1].title : "";
  // const threadNo = useLoaderData();

  const textAreaRef = useRef();
  
  const isPosted = useActionData();

  const getPosts = async () => {
    const resp = await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${threads[threadNo - 1].id}/posts?offset=${posts.length}`);
    const parsedResp = await resp.json();
    if(!parsedResp.posts || parsedResp.posts.length === 0) return
    const addPosts = parsedResp.posts.filter(getPost => posts.every(post => post.id !== getPost.id));
    if(addPosts.length) setPosts([...posts, ...addPosts]);
  }

  React.useEffect(() => {
    if(isPosted) {
      textAreaRef.current.value = "";
      getPosts();
    } 
  });

  React.useEffect(() =>  {       
    if(threads.length) getPosts();    
  });
  
  return (
    <>
      <h2 className="thread-title">{title}</h2>
      <div className="thread-area">
        <ul className="comment-list">
        {posts && posts.map((post, idx) => <Post key={idx} text={post.post} />)}
        </ul>
        <div className="post-comment">
          <Form method="post">
            <p className="form-row">              
              <textarea ref={textAreaRef} aria-label="post" id="post" name="post" placeholder="投稿しよう！" required />
            </p>
            <p className="submit-row">
              <button type="submit" className="post-button">投稿</button>
            </p>
          </Form>
        </div>
      </div>      
    </>
  );
}

export default Thread;