import React from 'react'
import IndividualPostDiv from './IndividualPostDiv'

function PostDetailPage({postList}) {
    return (
        <div className="">

        {postList.slice(0).reverse().map((item,index)=>(
            <IndividualPostDiv key={index} id={item.id} text={item.text} gif={item.gif}/>
        ))}

            
        </div>
    )
}

export default PostDetailPage
