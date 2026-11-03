import { useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { TELEGRAM_USERNAME } from '@/config'
import { items, type Category, type Item } from '@/data/items'

const categories: Array<'Все' | Category> = ['Все', 'Техника', 'Дом', 'Стиль', 'Хобби']

const formatPrice = (price: number) => `${new Intl.NumberFormat('ru-RU').format(price)} ₽`

const telegramLink = (message: string) =>
  `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`

function ItemDialog({ item, onClose }: { item: Item; onClose: () => void }) {
  const message = `Здравствуйте! Интересует «${item.name}» за ${formatPrice(item.price)}. Вещь ещё в наличии?`

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="item-dialog max-w-[calc(100%-24px)] sm:max-w-[920px]" showCloseButton={false}>
        <DialogClose className="dialog-close" aria-label="Закрыть карточку">
          <X size={20} aria-hidden="true" />
        </DialogClose>
        <div className="dialog-media">
          <img src={item.image} alt={item.alt} />
          <span className="condition-badge">{item.condition}</span>
        </div>
        <div className="dialog-body">
          <p className="dialog-category">{item.category}</p>
          <DialogTitle className="dialog-title">{item.name}</DialogTitle>
          <DialogDescription className="dialog-description">{item.description}</DialogDescription>
          <ul className="details-list">
            {item.details.map((detail) => (
              <li key={detail}>
                <Check size={17} aria-hidden="true" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
          <div className="dialog-purchase">
            <strong>{formatPrice(item.price)}</strong>
            <a
              className="button button-primary"
              href={telegramLink(message)}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={19} aria-hidden="true" />
              Написать в Telegram
            </a>
          </div>
          <p className="dialog-note">Сообщение уже будет заполнено — останется только отправить.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<'Все' | Category>('Все')
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const visibleItems = useMemo(
    () => (activeCategory === 'Все' ? items : items.filter((item) => item.category === activeCategory)),
    [activeCategory],
  )

  return (
    <div id="top" className="site-shell">
      <a className="skip-link" href="#catalog">Перейти к каталогу</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Свои вещи — наверх">
          <span className="brand-mark" aria-hidden="true">СВ</span>
          <span>свои вещи</span>
        </a>
        <nav className="main-nav" aria-label="Основная навигация">
          <a href="#catalog">Каталог</a>
          <a href="#how">Как купить</a>
          <a href="#faq">Вопросы</a>
        </nav>
        <a
          className="header-contact"
          href={telegramLink('Здравствуйте! Хочу уточнить детали по вещам с сайта.')}
          target="_blank"
          rel="noreferrer"
        >
          Связаться
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="overline">Продажа личных вещей</p>
            <h1 id="hero-title">Хорошие вещи.<br /><em>Новые истории.</em></h1>
            <p className="hero-lead">
              Освобождаю дом от вещей, которыми больше не пользуюсь. Всё честно опишу,
              покажу по видеосвязи и передам лично или отправлю доставкой.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#catalog">
                Смотреть вещи
                <ArrowDown size={19} aria-hidden="true" />
              </a>
              <a className="text-link" href="#how">
                Как всё проходит
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
            <ul className="hero-assurances" aria-label="Преимущества">
              <li><Check size={16} aria-hidden="true" />Без посредников</li>
              <li><Check size={16} aria-hidden="true" />Можно торговаться</li>
            </ul>
          </div>

          <div className="hero-visual" aria-label="Примеры вещей из каталога">
            <div className="hero-photo-main">
              <img src="./images/camera.jpg" alt="Камера Polaroid из каталога" />
            </div>
            <div className="hero-photo-small">
              <img src="./images/chair.jpg" alt="Белое кресло из каталога" />
            </div>
            <div className="hero-label">
              <span className="status-dot" aria-hidden="true" />
              8 вещей ищут новый дом
            </div>
          </div>
        </section>

        <section className="promise-strip" aria-label="Условия продажи">
          <div><ShieldCheck size={23} aria-hidden="true" /><span>Честно о состоянии</span></div>
          <div><PackageCheck size={23} aria-hidden="true" /><span>Проверка при встрече</span></div>
          <div><Truck size={23} aria-hidden="true" /><span>Самовывоз или доставка</span></div>
        </section>

        <section id="catalog" className="catalog-section" aria-labelledby="catalog-title">
          <div className="section-heading">
            <div>
              <p className="overline">Каталог</p>
              <h2 id="catalog-title">Найдите что-то для себя</h2>
            </div>
            <p>Каждую вещь можно рассмотреть подробнее и сразу спросить о ней в Telegram.</p>
          </div>

          <div className="filter-row" role="group" aria-label="Фильтр по категориям">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? 'filter-button active' : 'filter-button'}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="results-count" aria-live="polite">
            {visibleItems.length} {visibleItems.length === 1 ? 'вещь' : 'вещей'} · демонстрационные объявления
          </p>

          <div className="product-grid">
            {visibleItems.map((item) => (
              <article className="product-card" key={item.id}>
                <button
                  type="button"
                  className="product-button"
                  onClick={() => setSelectedItem(item)}
                  aria-label={`Подробнее: ${item.name}, ${formatPrice(item.price)}`}
                >
                  <span className="product-media">
                    <img src={item.image} alt={item.alt} loading="lazy" />
                    <span className="product-category">{item.category}</span>
                    <span className="product-open" aria-hidden="true"><ArrowUpRight size={20} /></span>
                  </span>
                  <span className="product-info">
                    <span className="product-name">{item.name}</span>
                    <span className="product-description">{item.short}</span>
                    <span className="product-bottom">
                      <strong>{formatPrice(item.price)}</strong>
                      <span>{item.condition}</span>
                    </span>
                  </span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="how" className="how-section" aria-labelledby="how-title">
          <div className="how-heading">
            <p className="overline">Просто и по-человечески</p>
            <h2 id="how-title">От сообщения<br />до покупки — три шага</h2>
          </div>
          <div className="steps-grid">
            <article>
              <MessageCircle size={28} aria-hidden="true" />
              <h3>Напишите</h3>
              <p>Выберите вещь и отправьте готовое сообщение. Отвечу на вопросы и пришлю дополнительные фото.</p>
            </article>
            <article>
              <ShieldCheck size={28} aria-hidden="true" />
              <h3>Всё проверьте</h3>
              <p>Договоримся о встрече или видеопоказе. Вы сможете спокойно оценить состояние до оплаты.</p>
            </article>
            <article>
              <PackageCheck size={28} aria-hidden="true" />
              <h3>Заберите</h3>
              <p>Передам при встрече или организую доставку. Способ и стоимость заранее согласуем в переписке.</p>
            </article>
          </div>
        </section>

        <section id="faq" className="faq-section" aria-labelledby="faq-title">
          <div className="faq-heading">
            <p className="overline">Перед покупкой</p>
            <h2 id="faq-title">Частые вопросы</h2>
            <p>Не нашли ответ? Напишите — обсудим вашу ситуацию.</p>
          </div>
          <div className="faq-list">
            <details>
              <summary>Можно ли посмотреть вещь перед покупкой?<span aria-hidden="true">+</span></summary>
              <p>Да. Можно договориться о личной встрече или попросить видеопоказ. Дополнительные фотографии тоже отправлю в Telegram.</p>
            </details>
            <details>
              <summary>Как проходит оплата?<span aria-hidden="true">+</span></summary>
              <p>Способ оплаты согласуем в переписке. При личной встрече вы сначала проверяете вещь, затем оплачиваете.</p>
            </details>
            <details>
              <summary>Есть ли доставка?<span aria-hidden="true">+</span></summary>
              <p>Да, для большинства вещей возможна доставка. Сроки и стоимость зависят от размера вещи и вашего города.</p>
            </details>
            <details>
              <summary>Можно предложить свою цену?<span aria-hidden="true">+</span></summary>
              <p>Можно. Напишите, какая вещь вам понравилась, и предложите вариант — обоснованный торг уместен.</p>
            </details>
          </div>
        </section>

        <section className="contact-section" aria-labelledby="contact-title">
          <div>
            <p className="overline">Что-то приглянулось?</p>
            <h2 id="contact-title">Дайте вещам<br />вторую историю</h2>
          </div>
          <div className="contact-copy">
            <p>Напишите, что вам понравилось. Я на связи, отвечу на вопросы и помогу организовать передачу.</p>
            <a
              className="button button-light"
              href={telegramLink('Здравствуйте! Посмотрел(а) ваш каталог и хочу задать вопрос.')}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Написать в Telegram
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">СВ</span><span>свои вещи</span></a>
        <p>Личные вещи · честные описания · прямое общение</p>
        <a href="#top" className="to-top">Наверх <ArrowUpRight size={17} aria-hidden="true" /></a>
      </footer>

      {selectedItem && <ItemDialog item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  )
}
