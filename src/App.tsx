import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Settings, Trash2, Video, Server, Shield, LayoutDashboard, Database, RefreshCw, Plus, FileVideo, FileImage } from 'lucide-react';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
  size: string;
  uploadTime: string;
}

const MOCK_MEDIA: MediaItem[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop', type: 'image', name: 'cyberpunk-city.jpg', size: '1.2 MB', uploadTime: '2023-10-25 14:30' },
  { id: '2', url: 'https://images.unsplash.com/photo-1621570074981-ee6a0145c8b5?q=80&w=600&auto=format&fit=crop', type: 'image', name: 'alps-winter.jpg', size: '2.5 MB', uploadTime: '2023-10-26 09:15' },
  { id: '3', url: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video', name: 'demo-video.mp4', size: '15.4 MB', uploadTime: '2023-10-27 16:45' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'media' | 'settings'>('dashboard');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(MOCK_MEDIA);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fake upload handler
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate API call to Tencent Cloud COS via your Lighthouse server
    setTimeout(() => {
      const isVideo = file.type.startsWith('video/');
      const newItem: MediaItem = {
        id: Date.now().toString(),
        url: isVideo ? 'https://www.w3schools.com/html/mov_bbb.mp4' : URL.createObjectURL(file), // Mock preview
        type: isVideo ? 'video' : 'image',
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        uploadTime: new Date().toLocaleString()
      };
      setMediaItems([newItem, ...mediaItems]);
      setIsUploading(false);
    }, 1500);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个文件吗？(这通常会调用后端API从腾讯云COS中删除)')) {
      setMediaItems(mediaItems.filter(item => item.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold flex items-center gap-2 text-blue-600">
            <Database className="w-6 h-6 shrink-0" />
            Media Admin
          </h1>
          <p className="text-xs text-gray-500 mt-1">云开发 COS & 轻量级服务器</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-row md:flex-col gap-2 md:gap-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 md:w-full flex items-center justify-center md:justify-start gap-3 px-3 md:px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            <span className="hidden md:inline">系统概览</span>
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`flex-1 md:w-full flex items-center justify-center md:justify-start gap-3 px-3 md:px-4 py-3 rounded-lg transition-colors ${activeTab === 'media' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ImageIcon className="w-5 h-5 shrink-0" />
            <span className="hidden md:inline">媒体库管理</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 md:w-full flex items-center justify-center md:justify-start gap-3 px-3 md:px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span className="hidden md:inline">系统设置</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-4 md:p-8 max-w-6xl mx-auto h-full">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold">系统概览</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg shrink-0">
                    <Server className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500 font-medium truncate">后端服务器(Lighthouse)</p>
                    <p className="text-xl font-bold text-green-600">正常运行</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-lg shrink-0">
                    <Database className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500 font-medium truncate">COS 存储桶使用量</p>
                    <p className="text-xl font-bold">1.2 GB <span className="text-sm text-gray-400 font-normal">/ 50 GB</span></p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-lg shrink-0">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500 font-medium truncate">总媒体文件数</p>
                    <p className="text-xl font-bold">{mediaItems.length} 个</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-8">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                   <Shield className="w-5 h-5 text-gray-600" />
                   架构说明
                </h3>
                <div className="text-gray-600 text-sm leading-relaxed space-y-4">
                  <p>这是一个专为管理您的网站视频和图片设计的后台系统。推荐的标准部署架构如下：</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>前端界面 (当前系统)：</strong> 提供友好的界面让您上传、预览和删除媒体文件，可部署至任何静态托管环境。</li>
                    <li><strong>腾讯云轻量服务器 (Lighthouse)：</strong> 部署一个 Node.js / Python 后端服务。在这里<strong>安全保管</strong>您的 <code>SecretId</code> 和 <code>SecretKey</code>。并验证您的后台管理员密码。前端通过这台服务器获取 COS 的授权（预签名URL / 临时密钥）。</li>
                    <li><strong>腾讯云对象存储 (COS)：</strong> 图片、视频的实际存放地。前端拿到临时密钥后直接向 COS 发起直传（直连上传下载，速度最快，并且不消耗您的轻量级服务器网络带宽）。</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold">媒体库</h2>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*,video/*"
                  onChange={handleUpload}
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isUploading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                  {isUploading ? '正在上传请求API...' : '上传新文件'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mediaItems.map(item => (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col group">
                    <div className="aspect-square sm:aspect-video bg-gray-100 relative overflow-hidden">
                      {item.type === 'image' ? (
                        <img src={item.url} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                           <Video className="w-12 h-12 text-white/50" />
                           <span className="absolute bottom-2 left-2 bg-black/60 text-white font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">Video</span>
                        </div>
                      )}
                      
                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                        <button 
                          className="p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all hover:scale-110 shadow-lg"
                          title="删除文件"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button 
                          className="p-2.5 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-all hover:scale-110 shadow-lg"
                          title="复制并更新到网站"
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                            alert('媒体链接已复制！您可以将这个链接粘贴进您前端网站的代码里替换原文件。');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex items-start gap-3 bg-white">
                      <div className="mt-0.5">
                         {item.type === 'video' ? <FileVideo className="w-5 h-5 text-orange-500" /> : <FileImage className="w-5 h-5 text-blue-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate" title={item.name}>{item.name}</p>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs text-gray-400">
                          <span className="font-mono">{item.size}</span>
                          <span>•</span>
                          <span>{item.uploadTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {mediaItems.length === 0 && (
                <div className="text-center py-24 bg-white rounded-xl border-2 border-dashed border-gray-300">
                  <Database className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">您的 COS 存储桶中暂无文件</p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    点击此处选择文件上传
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold">系统设置</h2>
              
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-8">
                <div>
                  <h3 className="text-lg font-bold border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                    <Server className="w-5 h-5 text-blue-600" />
                    轻量服务器 Node.js/Python API 接口地址
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">API Base URL</label>
                      <input 
                        type="text" 
                        defaultValue="https://api.your-lighthouse.com"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-shadow"
                        placeholder="例如: https://api.yourdomain.com"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        这个地址指向您的腾讯云轻量服务器。该服务器负责处理来自此后台的登录请求并分发 COS 的签名凭证。(前端不暴露密钥)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                    <Database className="w-5 h-5 text-purple-600" />
                    腾讯云 COS 存储桶配置
                  </h3>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-5 flex gap-3 text-orange-800 text-sm">
                    <Shield className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold">安全红线要求：</p>
                      <p>
                        请不要在这个界面填写 SecretId 和 SecretKey。如果您的源码被泄露，您的腾讯云资产将受到很大威胁。
                        请在您的轻量化服务器上的后台代码（如 .env 文件中）安全保存您的密钥。
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bucket 名称</label>
                      <input 
                        type="text" 
                        defaultValue="my-media-bucket-1250000000"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">地域 (Region)</label>
                      <input 
                        type="text" 
                        defaultValue="ap-guangzhou"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-shadow"
                      />
                    </div>
                    <div className="sm:col-span-2">
                       <label className="block text-sm font-medium text-gray-700 mb-1">公网访问域名访问 (CDN 或自带地址)</label>
                      <input 
                        type="text" 
                        defaultValue="https://my-media-bucket-1250000000.cos.ap-guangzhou.myqcloud.com"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-shadow"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-transform active:scale-95">
                    保存设置并测试连接
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
