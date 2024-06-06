export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageURL: "",
  bio: "",
};
export const INITIAL_STATE = {
  user: INITIAL_USER,
  isloading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: () => false as boolean,
};

export default function AuthContext() {
  return <div>AuthContext</div>;
}
