// 简单前端认证 demo（仅用于示例）
// 默认账号：admin / admin
// 注意：前端验证不安全，仅示例用途。

(function(){
  const STORAGE_KEY = 'demo_auth_token';
  const DEFAULT_CRED = { username: 'admin', password: 'admin' };

  function _makeToken(username){
    return btoa(username + ':' + Date.now());
  }

  function login(username, password){
    if (username === DEFAULT_CRED.username && password === DEFAULT_CRED.password) {
      const token = _makeToken(username);
      localStorage.setItem(STORAGE_KEY, token);
      localStorage.setItem(STORAGE_KEY + ':user', username);
      return true;
    }
    return false;
  }

  function logout(redirectTo = 'login.html'){
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY + ':user');
    if (typeof window !== 'undefined') {
      try { window.location.href = redirectTo; } catch(e){}
    }
  }

  function isAuthenticated(){
    const t = localStorage.getItem(STORAGE_KEY);
    return !!t;
  }

  function currentUser(){
    return localStorage.getItem(STORAGE_KEY + ':user') || null;
  }

  window.auth = {
    login,
    logout,
    isAuthenticated,
    currentUser
  };
})();
