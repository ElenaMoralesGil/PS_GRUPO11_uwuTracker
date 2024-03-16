const { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, query, where } = require('firebase/firestore/lite');
const User = require('../../schemas/User.schema');

class FirebaseContent {
    #fss
    #collection
    constructor(fss) {
        this.#collection = new String("Users")
        this.#fss = fss
    }

    get db() { return this.#fss.db }
    get coll() { return this.#collection }

    findById = async id => {
        try {
            const user = await getDoc(doc(this.db, this.coll, String(id)));
            if (!user.exists()) {
                console.error('User not found for ID:', id);
                return null;
            }

            const userData =user.data();

            // Log contentData to inspect reviews field
            console.log('UserData:', userData);

            return User.parse({ ...userData, id: user.id });
        } catch (error) {
            console.error('Error fetching content by ID:', error);
            return null;
        }
    }

    signUp = async user => {
        try {
            const docRef = await addDoc(collection(this.db, this.coll), User.parse(user).get());
            const userId = docRef.id;
            const newUser = await this.findById(userId);
            console.log('New user:', newUser);
            return newUser ? newUser : null;
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    }

    findByEmail = async email => {
        try {
            const querySnapshot = await getDocs(query(collection(this.db, this.coll), where('email', '==', email)));
            if (querySnapshot.empty) {
                return null; // Email not found
            } else {
                const userData = querySnapshot.docs[0].data();
                return userData; // Return user data with matching email
            }
        } catch (error) {
            console.error('Error finding user by email:', error);
            return null;
        }
    }

    findByUsername = async username => {
        try {
            const querySnapshot = await getDocs(query(collection(this.db, this.coll), where('username', '==', username)));
            if (querySnapshot.empty) {
                return null; // Username not found
            } else {
                const userData = querySnapshot.docs[0].data();
                return userData; // Return user data with matching username
            }
        } catch (error) {
            console.error('Error finding user by username:', error);
            return null;
        }
    }
}

module.exports = require(process.cwd() + '/bin/Singleton')(new FirebaseContent(require('./firebase.service')));
