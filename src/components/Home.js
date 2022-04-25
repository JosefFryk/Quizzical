import { Link } from "react-router-dom";



   
   
 const Home = () => {
        return (
          <div className="wrapper">
              <div className="topBlob"></div>
            <h1>Quizzical</h1>
            <p>Randomly generated questions, click below to continue</p>
            <br />
            <button className="questionBtn"><Link to="/questions" style={{textDecoration: 'inherit', color: 'inherit'}} className='text-link' >Start Quiz</Link></button>
          </div>
        );
      };
        
      export default Home;