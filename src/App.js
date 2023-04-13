import React, { useEffect, useState } from "react";
import "./App.css";
import styles from "./posts.module.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);
  const [filteredComments, setFilteredComments] = useState([]);
  const [expandedPostIndex, setExpandedPostIndex] = useState(null);

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

    setSelectedUserIndex((prevIndex) =>
      prevIndex === userIndex ? null : userIndex
    );
    setFilteredPosts(filteredPosts);
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
    setExpandedPostIndex((prevIndex) =>
      prevIndex === postIndex ? null : postIndex
    );

    console.log([postId]);
    console.log(filteredComments);
    console.log(filteredPosts);
  };
  console.log(filteredPosts);

  return (
    <div className="App">
      <h1>Awesome Post Page - by Phoebe Su</h1>
      <div className={styles.container}>
        {users.map((user, userIndex) => {
          return (
            <div className={styles.row} key={user.id}>
              <div className={styles.userCol}>
                <div>{user.firstName}</div>
                <button onClick={() => handleGetPost(userIndex)}>
                  get Post
                </button>
              </div>

              <div className={styles.postCol}>
                <div className={styles.post}>
                  {selectedUserIndex === userIndex &&
                    (filteredPosts.length === 0 ? (
                      <div>no post</div>
                    ) : (
                      filteredPosts.map((post, postIndex) => {
                        return filteredPosts.length === 0 ? (
                          <div>no post</div>
                        ) : (
                          <div key={post.id}>
                            <div className={styles.postTitle}>{post.title}</div>
                            <button
                              onClick={() =>
                                handleGetExpand(userIndex, postIndex)
                              }
                            >
                              expand
                            </button>
                            {expandedPostIndex === postIndex && (
                              <div className={styles.postDetailCol}>
                                {/* //Third Post detail and Comment Area */}
                                <div className={styles.postDetail}>
                                  {selectedUserIndex === userIndex &&
                                    (filteredComments.length === 0 ? (
                                      <div>No data</div>
                                    ) : (
                                      filteredComments.map((comment, index) => {
                                        return (
                                          <div key={index}>
                                            {filteredPosts.map(
                                              (post, postIndex) => {
                                                if (
                                                  postIndex ===
                                                  selectedPostIndex
                                                ) {
                                                  return (
                                                    <>
                                                      <h3
                                                        className={
                                                          styles.commentPostTitle
                                                        }
                                                      >
                                                        {post.title}
                                                      </h3>
                                                      <div
                                                        className={
                                                          styles.postBody
                                                        }
                                                      >
                                                        {post.body}
                                                      </div>
                                                    </>
                                                  );
                                                }
                                                return null;
                                              }
                                            )}

                                            <h3>Comments</h3>
                                            {`${comment.body} - ${comment.user.username}`}
                                          </div>
                                        );
                                      })
                                    ))}
                                </div>
                              </div>
                            )}
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
