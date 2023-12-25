import styles from './styles.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`Chat Odalari`}</h1>
        <input className={styles.input} placeholder='Kullanici Adi' />

        <select className={styles.input}>
          <option>Oda Sec</option>
          <option value='javascript'>Oda 1</option>
          <option value='node'>Oda 2</option>
          <option value='express'>Oda 3</option>
          <option value='react'>Oda 4</option>
        </select>

        <button className='btn btn-secondary' style={{ width: '100%' }}>Odaya Katil</button>
      </div>
    </div>
  );
};

export default Home;