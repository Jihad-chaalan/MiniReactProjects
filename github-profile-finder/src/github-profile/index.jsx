import User from "./user";
import { useEffect, useState } from "react";
import "./style.css";

export default function GitHubProfileFinder() {
  const [userName, setUserName] = useState("Jihad-chaalan");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchUserData() {
    setLoading(true);
    const res = await fetch(`https://api.github.com/users/${userName}`);
    const data = await res.json();
    if (data) {
      setUserData(data);
      setLoading(false);
      setUserName("");
    }
  }
  function handleSubmit() {
    fetchUserData();
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <h1>Loading data ! Please Wait...</h1>;
  }
  return (
    <div className="github-profile-container">
      <div className="input-wrapper">
        <input
          type="text"
          name="search-by-username"
          placeholder="Search Github UserName..."
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>
      {userData !== null ? <User user={userData} /> : null}
    </div>
  );
}
// export default function GithubProfileFinder() {
//   const [userName, setUserName] = useState("Jihad-chaalan");
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   async function fetchGithubUserData() {
//     setLoading(true);
//     const res = await fetch(`https://api.github.com/users/${userName}`);
//     const data = await res.json();
//     if (data) {
//       setUserData(data);
//       setLoading(false);
//       setUserName("");
//     }
//   }

//   function handleSubmit() {
//     fetchGithubUserData();
//   }

//   useEffect(() => {
//     fetchGithubUserData();
//   }, []);

//   if (loading) {
//     return <h1>Loading data ! Please Wait...</h1>;
//   }

//   return (
//     <div className="github-profile-container">
//       <div className="input-wrapper">
//         <input
//           type="text"
//           name="search-by-username"
//           placeholder="Search Github Username..."
//           value={userName}
//           onChange={(event) => setUserName(event.target.value)}
//         />
//         <button onClick={handleSubmit}>Search</button>
//       </div>
//       {userData !== null ? <User user={userData} /> : null}
//     </div>
//   );
// }
