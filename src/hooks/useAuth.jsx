const useAuth = () => {
    const user = window.sessionStorage.getItem('username');
    return "user";
};

export default useAuth;