import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#e91e63' }}>🎉 React 应用正常运行！</h1>
      <p>如果你能看到这个页面，说明 React 基础架构工作正常。</p>
      <p>问题可能出在某个组件上。</p>
      <Routes>
        <Route path="/" element={<div><h2>首页路由正常</h2></div>} />
        <Route path="*" element={<div><h2>404 路由正常</h2></div>} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
