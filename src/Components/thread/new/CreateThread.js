import { Form } from "react-router-dom";

const CreateThread = ({getThreads}) => {
  return (
    <>
      <h2 className="board-title">スレッド作成</h2>
      <div className="post-thread">        
        <Form method="post">
          <p className="form-row">
            <label htmlFor="title" className="form-label" >タイトル</label>
            <input aria-label="thread-title" type="text" id="title" name="title" required />
          </p>
          <p className="submit-row">
            <button type="submit" className="post-button">作成</button>
          </p>
        </Form>
      </div>
    </>
  );
}

export default CreateThread;