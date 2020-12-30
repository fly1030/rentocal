var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const Home = () => {
  return (
    <div>Hello World</div>
  )
}

export default Home