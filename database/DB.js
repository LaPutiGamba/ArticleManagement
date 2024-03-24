import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("article.db");

export function init() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ARTICLE (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          code TEXT NOT NULL,
          description TEXT NOT NULL,
          price REAL NOT NULL,
          stock REAL DEFAULT 0
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function insertArticle(article) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ARTICLE (code, description, price, stock) VALUES (?, ?, ?, ?)`,
        [article.code, article.description, article.price, article.stock],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function fetchArticles() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM ARTICLE",
        [],
        (_, result) => {
          let articles = [];

          for (const dp of result.rows._array) {
            articles.push({
              id: dp.id,
              code: dp.code,
              description: dp.description,
              price: dp.price,
              stock: dp.stock,
            });
          }

          resolve(articles);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function fetchArticleDetails(articleId) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ARTICLE WHERE id = ?`,
        [articleId],
        (_, result) => {
          const dbarticle = result.rows._array[0];

          let article = {
            id: dbarticle.id,
            code: dbarticle.code,
            description: dbarticle.description,
            price: dbarticle.price,
            stock: dbarticle.stock,
          };

          resolve(article);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function deleteArticle(articleId) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM ARTICLE WHERE id = ?",
        [articleId],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function updateArticle(article) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE ARTICLE SET description = ?, price = ?, stock = ? WHERE id = ?",
        [article.description, article.price, article.stock, article.id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}