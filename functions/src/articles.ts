import admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export interface Article {
    date: string;
    title: string;
    author: string;
    body: string;
}

function parseArticle(data: any): Article {
    return {
        date: data.date?.toMillis()?.toString() || Date.now().toString(),
        title: data.title || '',
        author: data.author || '',
        body: data.body || '',
    }
}

export async function getArticles() {
    const articles: Article[] = [];
    const articlesRef = db.collection('articles');
    const snapshot = await articlesRef.get();
    snapshot.forEach(doc => articles.push(parseArticle(doc.data())));
    return articles;
}