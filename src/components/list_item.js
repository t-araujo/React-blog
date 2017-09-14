import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = props => {
  const { post: {id, title} } = props;

  return (
    <Link to={`/posts/${id}`}>
      <li className='list-group-item'>
        {title}
      </li>
    </Link>
  );
};

export default ListItem;
