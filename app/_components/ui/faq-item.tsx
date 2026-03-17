//Вся реализация вывода Faq


/**
 *
 * @remarks
 * Вывод основной информации о faq + рендер карандашика
 *
 * @returns
 * Компонент
 *
 * @param faq = Faq
 *
 *Примерная структура:
 *
 * <div>
 *     {faq!.question && faq!.answer &&
 *     <div>
 *       <h3>{faq!.question}</h3>
 *      <h4>{faq!.answer}
 *     </div>
 *     <div>
 *         <Pencil faq={faq} />
 *     </div>
 *     }
 * </div>
 *
 */