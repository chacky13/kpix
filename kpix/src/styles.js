import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  body {
    background-color: #000000;
    color: #ffffff;
    overflow-x: hidden;
  }
`;

export const AppContainer = styled.div`
  display: flex;
  background-color: #000000;
  min-height: 100vh;
  width: 100%;
`;

export const AuthContainer = styled.div`
  min-height: 100vh;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #000000;
  padding: 2rem;
`;

export const AuthTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #ffffff;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AuthInput = styled.input`
  width: 100%;
  padding: 1rem;
  background-color: #000000;
  border: 1px solid #333;
  border-radius: 4px;
  color: #ffffff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

export const AuthButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #1d9bf0;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #1a8cd8;
  }
`;

export const AuthSwitch = styled(AuthButton)`
  background-color: transparent;
  border: 1px solid #333;
  margin-top: 1rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const Sidebar = styled.div`
  width: 275px;
  padding: 1rem;
  background-color: #000000;
  position: fixed;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.div`
  margin-left: 275px;
  flex: 1;
  max-width: calc(100vw - 275px);
  border-left: 1px solid #2f3336;
  min-height: 100vh;
`;

export const Logo = styled.button`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0.5rem;
`;

export const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const UserLink = styled.button`
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  padding: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  border-radius: 4px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const CurrentUser = styled(UserLink)`
  margin-top: auto;
`;

export const LogoutButton = styled.button`
  color: #ffffff;
  background: none;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    color: #ff0000;
  }
`;
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const SinglePostContainer = styled.div`
  background-color: #000000;
  border: 1px solid #2f3336;
  border-radius: 16px;
  width: 600px;
  max-width: 90vw;
  padding: 2rem;
  transform: scale(1.05);
  transition: transform 0.2s ease;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
export const CreatePostContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #2f3336;
`;
export const PostFeed = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const PostTextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  background-color: #000000;
  border: none;
  color: #ffffff;
  font-size: 1.25rem;
  resize: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #6e767d;
  }
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

export const CharCount = styled.span`
  color: #6e767d;
`;

export const PostButton = styled.button`
  background-color: #1d9bf0;
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #1a8cd8;
  }
`;

export const PostCard = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #2f3336;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
    transform: scale(1.005);
  }
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PostAuthor = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;

export const PostUsername = styled.span`
  font-size: 1rem;
  color: #6e767d;
`;

export const PostDate = styled.span`
  font-size: 1rem;
  color: #6e767d;
  margin-left: 0.5rem;
`;

export const PostContent = styled.p`
  font-size: 1rem;
  margin: 0.75rem 0;
  line-height: 1.5;
`;

export const LikeButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.isLiked ? "#f91880" : "#6e767d")};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.isLiked ? "rgba(249, 24, 128, 0.1)" : "rgba(239, 243, 244, 0.1)"};
  }
`;

export const ErrorMessage = styled.div`
  color: #ff0000;
  background-color: rgba(255, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;
