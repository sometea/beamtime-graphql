import admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export interface Article {
    date: number;
    title: string;
    author: string;
    body: string;
}

export async function getArticles() {
    const articles: Article[] = [];
    const articlesRef = db.collection('articles');
    const snapshot = await articlesRef.get();
    snapshot.forEach(doc => articles.push(doc.data() as Article));
    console.log(articles[0]);
    return articles;
}