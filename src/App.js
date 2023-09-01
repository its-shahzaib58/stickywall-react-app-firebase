import './App.scss';
import Routes from './pages/Routes'
import { useNavigate } from 'react-router-dom';
import { Spin, message } from 'antd';
import { useAuthContext } from './contexts/AuthContext'; 

function App() {
  const { isAppLoading } = useAuthContext()

  if (isAppLoading)
    return (
      <div className="loader-container">
       <Spin size="large">
        </Spin>
      </div>
    )
  return (
    <Routes/>
  );
}

export default App;
