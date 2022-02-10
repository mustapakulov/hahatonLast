import React from 'react';
import AddComments from './AddCommetns';
import CommentsList from './CommentsList';


const Comments = () => {

    return (
        <div style={{backgroundColor:'#fff'}}>
             <CommentsList/>
           <AddComments/>
          
        </div>
    );
};

export default Comments;
