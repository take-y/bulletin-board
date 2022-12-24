import ThreadLink from "./ThreadLink";

const Main = ({threads}) => (
  <>
    <h2 className="board-title">新着スレッド</h2>
    <ul className="thread-list">
      {threads.map((thread, idx) => <li className="thread-item" key={idx}><ThreadLink title={thread.title} idx={idx} /></li>)}
    </ul>
  </>
);

export default Main;