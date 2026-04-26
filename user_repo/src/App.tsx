import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import WorkDetail from './pages/WorkDetail';
import Upload from './pages/Upload';
import About from './pages/About';

export default function App() {
  return (
    // 关键修复：改用 HashRouter。这会在网址里加上 # 符号，防止 GitHub Pages 强制寻找物理文件
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ai-dramas" element={<Gallery type="ai_drama" />} />
          <Route path="photography" element={<Gallery type="photography" />} />
          <Route path="work/:id" element={<WorkDetail />} />
          <Route path="about" element={<About />} />
          <Route path="upload" element={<Upload />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
