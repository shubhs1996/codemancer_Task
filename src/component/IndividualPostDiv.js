import React from "react";
import { Avatar } from "@material-ui/core";

function IndividualPostDiv({ id, text, gif }) {
  return (
    <div className="individual_post_div_container">
      <div className="detail_section">
      <div className="avatar_container">
        <Avatar
          alt="avatar"
          style={{width:"100%",height:"100%"}}
          src={`https://avatars.dicebear.com/api/human/${id}.svg`}
        />
        </div>
        <div className="text_detail_container">
          <p style={{fontWeight:"600",fontSize:"16px"}}>itz_shuboy</p>
          <p>1 hour ago</p>
        </div>
      </div>

      <div className="">
        <p className="">{text}</p>
      </div>

      <div className="gif_container">
        <img src={gif} style={{width:"100%"}} />
      </div>
    </div>
  );
}

export default IndividualPostDiv;
