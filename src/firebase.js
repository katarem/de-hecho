const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get, child } = require("firebase/database");

class firedb {
  db;

  constructor() {
    const firebaseConfig = {
      // ...
      // The value of `databaseURL` depends on the location of the database
      databaseURL:
        "https://de-hecho-db-default-rtdb.europe-west1.firebasedatabase.app/",
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Realtime Database and get a reference to the service
    this.db = getDatabase(app);
  }

  async readData() {
    const dbRef = ref(this.db);
    let snapshot;
    return (snapshot = await get(child(dbRef, `data/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      }));
  }

  writeData(id, date) {
    try {
      set(ref(this.db, "data/" + id), {
        id: id,
        date: date,
      });
    } catch (error) {
      console.log(error.message);
      return false;
    }
    return true;
  }
}

module.exports = firedb;
