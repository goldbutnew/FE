const styles = {
  playerWrapper: {
    position: 'relative',
    paddingTop: '56.25%', // 16:9 Aspect Ratio
    backgroundColor: '#f0e4d7', // 크림색 배경
    border: '5px solid #ffc0cb', // 핑크색 테두리
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // 그림자 효과
  },
  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  customControls: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    right: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 182, 193, 0.8)', // 반투명 핑크색 배경
    padding: '5px',
    borderRadius: '10px',
  },
  button: {
    border: 'none',
    backgroundColor: '#ff69b4', // 밝은 핑크색
    color: 'white',
    padding: '10px 20px',
    fontFamily: "'Courier New', Courier, monospace", // 타자기 폰트
    fontSize: '16px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#ff1493', // 진한 핑크색
  }
};

export default styles;