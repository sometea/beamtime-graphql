import admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export interface Article {
    date: string;
    title: string;
    author: string;
    body: string;
    id: string;
}

function parseArticle(data: any, id: any): Article {
    return {
        date: data.date?.toMillis()?.toString() || Date.now().toString(),
        title: data.title || '',
        author: data.author || '',
        body: data.body || '',
        id: id || '-1',
    }
}

export async function getArticles() {
    const articles: Article[] = [];
    const articlesRef = db.collection('articles');
    const snapshot = await articlesRef.limit(30).get();
    snapshot.forEach(doc => articles.push(parseArticle(doc.data(), doc.id)));
    return articles;
}

export async function addArticle(parent: any, args: { article: Article }) {
    const { article } = args;
    const result = await db.collection('articles').add(article);
    return { ...article, id: result.id };
}

export async function deleteArticle(parent: any, args: { id: string }) {
    const { id } = args;
    await db.collection('articles').doc(id).delete();
    return id;
}