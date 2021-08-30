import React, { useState } from "react";
import Gif from "../gif_symbol.png";
import "./Styles.css";
import { PostList } from "../dummyData.js/data";
import PostDetailPage from "./PostDetailPage";
import PostModal from "../dummyData.js/modal";

function MainPage() {
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [caption, setCaption] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [gifList, setGifList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  console.log(gifList);
  console.log(suggestions);
  const [selectedGif, setSelectedGif] = useState(null);

  const GIF_URL =
    "https://api.giphy.com/v1/gifs/search?api_key=XtDEuGfkFr0cVd7z2zB3BmFk7VsQViO1&limit=20&offset=0&q=";
  const GIF_URL1 =
    "https://api.giphy.com/v1/tags/related/" +
    searchText +
    "?api_key=XtDEuGfkFr0cVd7z2zB3BmFk7VsQViO1";

  const onClick = (s) => {
    fetch(GIF_URL + s)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setGifList(
          res.data.map((gif) => {
            const id = gif.id;
            const url = gif.images.fixed_height.url;

            return { id, url };
          })
        );
      });
  };

  //   const onType = () => {
  //     fetch(GIF_URL1)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         setSuggestions(res.data);
  //       });
  //   };

  //   const GifModal = ({ children, closeModal }) => {
  //     return (
  //         <>
  //        <div
  //         //   className="fixed top-0 left-0 z-40 w-full h-full bg-gray-900 bg-opacity-50"
  //         className=""
  //           onClick={()=>setShowModal(false)}
  //        >
  //           <div className="container h-full mx-auto ">
  //              <div className="content_container">

  //              <input/>
  //               <button className="btn">Search</button>

  //              </div>
  //           </div>
  //        </div>

  //        <div className="modal"></div>
  //        </>
  //     );
  //  };

  const onPost = () => {
    const newPost = new PostModal(selectedGif.id, caption, selectedGif.url);
    PostList.push(newPost);
    setGifList([...gifList, newPost]);
    setSelectedGif(null);
    setSuggestions(null);
    setCaption("");
    setSearchText("");
    setGifList([]);
    setShow(!show);
    setShowModal(false);
  };

  const onCancel = () => {
    setSelectedGif(null);
    setSuggestions(null);
    setCaption("");
    setSearchText("");
    setGifList([]);
    setShow(!show);
    setShowModal(false);
  };

  return (
    <div className="mainpage_container">
      <div className="add_post_container">
        {!show ? (
          <div className="btn_container">
            <button className="btn" onClick={() => setShow(!show)}>
              Add Post
            </button>
          </div>
        ) : (
          <div className="post_form_container">
            <input
              type="text"
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
              placeholder="write something here..."
              className="input_style"
            />

            {selectedGif && (
              <img style={{ width: "100%" }} src={selectedGif?.url} />
            )}

            <div className="gif_btn_main_container">
              <div
                style={{
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              >
                <div onClick={() => setShowModal(!showModal)}   style={{
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                  }}>
                  <img src={Gif} style={{ width: "20px", height: "20px" }} />
                  Add Gif
                </div>
                {showModal && (
                  <div className="gif_search_box">
                    <input
                      type="text"
                      value={searchText}
                      onChange={(e) => {
                        setSearchText(e.target.value);
                        onClick(e.target.value);
                      }}
                      placeholder="write something here..."
                      className="gif_input"
                    />

                    {/**list of search result*/}
                    <div className="list_container customScroller">
                      {gifList.map((gif) => (
                        <img
                          key={gif.id}
                          src={gif.url}
                          style={{ width: "100%" }}
                          onClick={() => {
                            setSelectedGif(gif);
                            setShowModal(!showModal);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="btn_container">
                <button className="btn" onClick={onCancel}>
                  Cancel
                </button>
                <button className="btn" onClick={onPost}>
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/**list of post  */}
      <div className="post_list_container">
        <PostDetailPage postList={PostList} />
      </div>
    </div>
  );
}

export default MainPage;
