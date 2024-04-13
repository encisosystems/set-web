const useAuth = () => {
    const user = { loggedIn: true };
    return user && user.loggedIn;
};

export default useAuth;