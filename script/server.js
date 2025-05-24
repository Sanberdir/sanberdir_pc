const GITHUB_OWNER = 'Sanberdir';
const GITHUB_REPO = 'sanberdir_pc';
const GITHUB_TOKEN = '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'; // На практике используйте переменные окружения

async function updateReviews(newReview) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/data/reviews.json`;
  
  // 1. Получаем текущее содержимое файла
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  
  const data = await response.json();
  const content = JSON.parse(atob(data.content));
  
  // 2. Добавляем новый отзыв
  content.push({
    id: Date.now(),
    ...newReview,
    date: new Date().toISOString()
  });
  
  // 3. Обновляем файл
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Add new review',
      content: btoa(JSON.stringify(content, null, 2)),
      sha: data.sha
    })
  });
}