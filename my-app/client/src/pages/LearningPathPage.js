import React from 'react';

const LearningPathPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Lộ trình học Backend và Frontend</h1>

      <div className="row">
        {/* Phần Backend */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Backend Development</h2>
              <p className="card-text">
                Học về các ngôn ngữ và công nghệ phát triển Backend như Node.js, Python, Ruby, PHP, etc.
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Express.js</li>
                <li className="list-group-item">Databases (SQL, NoSQL)</li>
                <li className="list-group-item">API Development</li>
                <li className="list-group-item">Authentication & Authorization</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Phần Frontend */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Frontend Development</h2>
              <p className="card-text">
                Học về HTML, CSS, JavaScript và các framework như React, Vue, Angular, etc.
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">HTML & CSS Basics</li>
                <li className="list-group-item">JavaScript Fundamentals</li>
                <li className="list-group-item">React.js or Angular or Vue.js</li>
                <li className="list-group-item">Responsive Web Design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPathPage;
