const { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, query, where } = require('firebase/firestore/lite');
const Content = require('../../schemas/Content.schema');

class FirebaseContent {
    #fss
    #collection
    constructor(fss) {
        this.#collection = new String("Contents")
        this.#fss = fss
    }

    get db() { return this.#fss.db }
    get coll() { return this.#collection }

    findById = async id => {
        try {
            const content = await getDoc(doc(this.db, this.coll, String(id)));
            if (!content.exists()) {
                console.error('Content not found for ID:', id);
                return null;
            }

            const contentData = content.data();

            // Log contentData to inspect reviews field
            console.log('Content Data:', contentData);

            // Check if reviews field exists and log its content
            if (contentData.reviews) {
                console.log('Reviews:', contentData.reviews);
            } else {
                console.log('No reviews found for content:', id);
            }

            return Content.parse({ ...contentData, id: content.id }); // Include content ID in parsed content
        } catch (error) {
            console.error('Error fetching content by ID:', error);
            return null;
        }
    }



    create = async content => {
        if (await this.findById(content.id)) return null

        await setDoc(doc(this.db, this.coll, String(content.id)), Content.parse(content).get())

        return await this.findById(content.id) ? content : null
    }

}

module.exports = require(process.cwd() + '/bin/Singleton')(new FirebaseContent(require('./firebase.service')));
