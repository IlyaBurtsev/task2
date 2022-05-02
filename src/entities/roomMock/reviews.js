import { Review } from '../../models/Review';
import { getUserRepository } from '../../repository/userRepository/UserRepository';



const user1Id = getUserRepository().getUserByName('Мурад').getId();
const user2Id = getUserRepository().getUserByName('Патрисия').getId();
const user3Id = getUserRepository().getUserByName('Юлий').getId();
const dateCreated1 = '5 дней назад';
const dateCreated2 = 'неделю назад';

const content1 = 'Великолепный матрас на кровати в основной спальне! А пуфик вообще потрясающий. И стены, действительно, шумоподавляющие. Выкрикивал комплименты повару — никто не жаловался из соседей.'
const content2 = 'Обслуживание на высоте! Всё аккуратно, чисто. Завтраки в номер советую заказать, каждый день новое блюдо и десерт как комплимент';
const review1 = new Review({creator: user1Id, dateCreated: dateCreated1, likeCounter: 12, likedByUsers: [user2Id, user3Id], reviewContent: content1 })
const review2 = new Review({creator: user2Id, dateCreated: dateCreated2, likeCounter: 2, likedByUsers: [user1Id], reviewContent: content2 })


export const roomReviews888Mock = [review1, review2];
export const roomReviewsPresentationMock = [review1];