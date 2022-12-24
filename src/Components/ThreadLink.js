import { Link } from 'react-router-dom';

const ThreadLink = ({title, idx}) => <Link to={`/thread/${idx + 1}`}>{title}</Link>

export default ThreadLink;