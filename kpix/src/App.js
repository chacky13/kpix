import React, { useState, useEffect } from "react";
import { FiHeart, FiSend, FiLogOut } from "react-icons/fi";
import * as S from "./styles";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });
};

const KpiXApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    full_name: "",
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const baseUrl = "http://localhost:8000/api";

  const getAuthHeader = () => ({
    Authorization: `Basic ${btoa(
      `${credentials.username}:${credentials.password}`
    )}`,
  });

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(`${baseUrl}/me`, {
        headers: getAuthHeader(),
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
        setError("");
      }
    } catch (err) {
      setError("Failed to fetch user data");
    }
  };

  const fetchUsers = async () => {
    try {
      const allUsers = [];
      for (let i = 1; i <= 3; i++) {
        const response = await fetch(`${baseUrl}/users/user_${i}`);
        if (response.ok) {
          const user = await response.json();
          allUsers.push(user);
        }
      }
      setUsers(allUsers);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  const fetchPosts = async () => {
    try {
      const allPosts = [];
      for (const user of users) {
        const response = await fetch(
          `${baseUrl}/users/${user.username}/posts`,
          {
            headers: currentUser ? getAuthHeader() : {},
          }
        );
        if (response.ok) {
          const userPosts = await response.json();
          allPosts.push(...userPosts);
        }
      }
      setPosts(
        allPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
    } catch (err) {
      setError("Failed to fetch posts");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        await fetchCurrentUser();
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        setIsRegistering(false);
        setCredentials({
          username: registrationData.username,
          password: registrationData.password,
        });
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      setError("Registration failed");
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    try {
      const response = await fetch(
        `${baseUrl}/users/${currentUser.username}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
          body: JSON.stringify({ content: newPostContent }),
        }
      );

      if (response.ok) {
        const newPost = await response.json();
        setNewPostContent("");
        setPosts((prevPosts) => [newPost, ...prevPosts]);
      }
    } catch (err) {
      setError("Failed to create post");
    }
  };

  const handleLikePost = async (username, postId, isLiked) => {
    try {
      const response = await fetch(
        `${baseUrl}/users/${username}/posts/${postId}/like`,
        {
          method: isLiked ? "DELETE" : "PUT",
          headers: getAuthHeader(),
        }
      );

      if (response.ok) {
        // Update posts state locally
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                is_liked: !isLiked,
                likes: isLiked ? post.likes - 1 : post.likes + 1,
              };
            }
            return post;
          })
        );

        // Update selected post if we're viewing it
        if (selectedPost?.id === postId) {
          setSelectedPost((prev) => ({
            ...prev,
            is_liked: !isLiked,
            likes: isLiked ? prev.likes - 1 : prev.likes + 1,
          }));
        }
      }
    } catch (err) {
      setError("Failed to update like");
    }
  };
  const handleLogout = () => {
    setCurrentUser(null);
    setCredentials({ username: "", password: "" });
    setSelectedUser(null);
  };

  const handleLogoClick = () => {
    setSelectedUser(null);
  };

  const handleProfileClick = () => {
    setSelectedUser(currentUser?.username);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      fetchPosts();
    }
  }, [users, currentUser]);
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClosePost = (e) => {
    e.stopPropagation();
    setSelectedPost(null);
  };
  const filteredPosts = selectedUser
    ? posts.filter((post) => post.author.username === selectedUser)
    : posts;

  if (!currentUser && !isRegistering) {
    return (
      <>
        <S.GlobalStyle />
        <S.AuthContainer>
          <S.AuthCard>
            <S.AuthTitle>Login to KpiX</S.AuthTitle>
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            <S.AuthForm onSubmit={handleLogin}>
              <S.AuthInput
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
              <S.AuthInput
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <S.AuthButton type="submit">Login</S.AuthButton>
            </S.AuthForm>
            <S.AuthSwitch onClick={() => setIsRegistering(true)}>
              Register
            </S.AuthSwitch>
          </S.AuthCard>
        </S.AuthContainer>
      </>
    );
  }
  if (isRegistering) {
    return (
      <>
        <S.GlobalStyle />
        <S.AuthContainer>
          <S.AuthCard>
            <S.AuthTitle>Register for KpiX</S.AuthTitle>
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            <S.AuthForm onSubmit={handleRegister}>
              <S.AuthInput
                type="text"
                placeholder="Username"
                value={registrationData.username}
                onChange={(e) =>
                  setRegistrationData({
                    ...registrationData,
                    username: e.target.value,
                  })
                }
              />
              <S.AuthInput
                type="password"
                placeholder="Password"
                value={registrationData.password}
                onChange={(e) =>
                  setRegistrationData({
                    ...registrationData,
                    password: e.target.value,
                  })
                }
              />
              <S.AuthButton type="submit">Register</S.AuthButton>
            </S.AuthForm>
            <S.AuthSwitch onClick={() => setIsRegistering(false)}>
              Back to Login
            </S.AuthSwitch>
          </S.AuthCard>
        </S.AuthContainer>
      </>
    );
  }

  return (
    <>
      <S.GlobalStyle />
      <S.AppContainer>
        <S.Sidebar>
          <S.Logo onClick={handleLogoClick}>KpiX</S.Logo>
          <S.UsersList>
            {users.map((user) => (
              <S.UserLink
                key={user.username}
                onClick={() => setSelectedUser(user.username)}
              >
                {user.username}
              </S.UserLink>
            ))}
          </S.UsersList>
          <S.CurrentUser onClick={handleProfileClick}>
            {currentUser?.username}
          </S.CurrentUser>
          <S.LogoutButton onClick={handleLogout}>
            <FiLogOut /> Logout
          </S.LogoutButton>
        </S.Sidebar>

        <S.MainContent>
          {(!selectedUser || selectedUser === currentUser?.username) && (
            <S.CreatePostContainer>
              <S.PostTextArea
                placeholder="What's happening?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                maxLength={140}
              />
              <S.PostFooter>
                <S.CharCount>{newPostContent.length}/140</S.CharCount>
                <S.PostButton
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                >
                  <FiSend /> Post
                </S.PostButton>
              </S.PostFooter>
            </S.CreatePostContainer>
          )}

          <S.PostFeed>
            {filteredPosts.map((post) => (
              <S.PostCard key={post.id} onClick={() => handlePostClick(post)}>
                <S.PostHeader>
                  <S.PostAuthor>{post.author.username}</S.PostAuthor>
                  <S.PostUsername>@{post.author.username}</S.PostUsername>
                  <S.PostDate>{formatDate(post.created_at)}</S.PostDate>
                </S.PostHeader>
                <S.PostContent>{post.content}</S.PostContent>
                <S.LikeButton
                  isLiked={post.is_liked}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent post click when liking
                    handleLikePost(
                      post.author.username,
                      post.id,
                      post.is_liked
                    );
                  }}
                >
                  <FiHeart /> {post.likes}
                </S.LikeButton>
              </S.PostCard>
            ))}
          </S.PostFeed>
        </S.MainContent>
        {selectedPost && (
          <S.Overlay onClick={handleClosePost}>
            <S.SinglePostContainer onClick={(e) => e.stopPropagation()}>
              <S.CloseButton onClick={handleClosePost}>×</S.CloseButton>
              <S.PostHeader>
                <S.PostAuthor>{selectedPost.author.username}</S.PostAuthor>
                <S.PostUsername>@{selectedPost.author.username}</S.PostUsername>
                <S.PostDate>{formatDate(selectedPost.created_at)}</S.PostDate>
              </S.PostHeader>
              <S.PostContent>{selectedPost.content}</S.PostContent>
              <S.LikeButton
                isLiked={selectedPost.is_liked}
                onClick={() =>
                  handleLikePost(
                    selectedPost.author.username,
                    selectedPost.id,
                    selectedPost.is_liked
                  )
                }
              >
                <FiHeart /> {selectedPost.likes}
              </S.LikeButton>
            </S.SinglePostContainer>
          </S.Overlay>
        )}
      </S.AppContainer>
    </>
  );
};

export default KpiXApp;
