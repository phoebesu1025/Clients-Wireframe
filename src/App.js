import React, { useEffect, useState } from "react";
import "./App.css";
import styles from "./posts.module.css";

export default function App() {
  const [users, setUsers] = useState("");
  const [posts, setPosts] = useState("");
  const [comments, setComments] = useState("");
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);
  const [filteredComments, setFilteredComments] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.users);
      });
  }, []);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((res) => {
        setPosts(res.posts);
      });
  }, []);

  useEffect(() => {
    fetch("https://dummyjson.com/comments")
      .then((res) => res.json())
      .then((res) => {
        setComments(res.comments);
      });
  }, []);

  const handleGetPost = (userIndex) => {
    const selectedUser = users[userIndex];
    const userId = selectedUser.id;
    const filteredPosts = posts.filter((p) => p.userId === userId);
    setSelectedUserIndex(userIndex);
    setFilteredPosts(filteredPosts);

    if (selectedUserIndex === userIndex) {
      setSelectedUserIndex(false);
    } else {
      setSelectedUserIndex(userIndex);
    }
  };

  const handleGetExpand = (userIndex, postIndex) => {
    const selectedUser = users[userIndex];
    const userId = selectedUser.id;
    const filteredPosts = posts.filter((p) => p.userId === userId);

    const selectedPost = filteredPosts[postIndex];

    const postId = selectedPost.id;
    const filteredComments = comments.filter((c) => c.postId === postId);
    setSelectedPostIndex(postIndex);
    setFilteredComments(filteredComments);

    console.log(filteredComments);
  };

  return (
    <div className="App">
      <h1>Awesome Post Page - by Phoebe Su</h1>
      <div className={styles.container}>
        {Array.from(users).map((element, userIndex) => {
          return (
            <div key={userIndex} className={styles.row}>
              <div className={styles.userCol}>
                <div>{element.firstName}</div>
                <button onClick={() => handleGetPost(userIndex)}>
                  get Post
                </button>
              </div>

              <div className={styles.postCol}>
                <div className={styles.post}>
                  {selectedUserIndex === userIndex &&
                    filteredPosts.map((post, postIndex) => {
                      return (
                        <div key={postIndex}>
                          <div className={styles.postTitle}>{post.title}</div>
                          <button
                            onClick={() =>
                              handleGetExpand(userIndex, postIndex)
                            }
                          >
                            expand
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className={styles.postDetailCol}>
                <div className={styles.postDetail}>
                  {selectedUserIndex === userIndex &&
                    (filteredComments.length === 0 ? (
                      <div>No data</div>
                    ) : (
                      filteredComments.map((comment, index) => {
                        return (
                          <div key={index}>
                            {filteredPosts.map((post, postIndex) => {
                              return (
                                <>
                                  <h3 className={styles.commentPostTitle}>
                                    {post.title}
                                  </h3>
                                  <div className={styles.commentPostBody}>
                                    {post.body}
                                  </div>
                                </>
                              );
                            })}
                            <h3>Comments</h3>
                            {`${comment.body} - 
                            ${comment.user.username}`}
                          </div>
                        );
                      })
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
