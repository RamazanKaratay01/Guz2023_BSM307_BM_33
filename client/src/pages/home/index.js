import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const Home = ({username, setUsername, room, setRoom, socket}) => {
  
  const navigate = useNavigate();
  
  const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });
    }
    navigate('/chat', { replace: true });
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`Chat Odalari`}</h1>
        <input className={styles.input} placeholder='Kullanici Adi' onChange={(e) => setUsername(e.target.value)} />

        <select className={styles.input} onChange={(e) => setRoom(e.target.value)}>
          <option>Oda Sec</option>
          <option value='javascript'>Oda 1</option>
          <option value='node'>Oda 2</option>
          <option value='express'>Oda 3</option>
          <option value='react'>Oda 4</option>
        </select>

        <button className='btn btn-secondary' style={{ width: '100%' }} onClick={joinRoom}>Odaya Katil</button>
      </div>
    </div>
  );
};

export default Home;