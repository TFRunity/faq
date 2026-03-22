/**
 *
 * @remarks
 * Кнопочка добавляющая пустой faq
 *
 * @param isLoggedIn = boolean, показывает нужно ли воспринимать этот компонент
 * @param createFaqPropMethod = func, для оповещения родителя
 *
 * @returns
 * Компонент
 *
 */

'use client'
//
// import {createFaq, Faq, InsertFaq, isResponsible} from "@/app/_actions/faqActions";
// import '@/app/global-styles.css'
// import {ReactElement} from "react";
//
// interface createFaqButtonProps {
//     createFaqPropMethod: (faq : Faq) => void,
//     isLoggedIn: boolean,
// }
//
// export default function CreateFaqButton( { createFaqPropMethod, isLoggedIn } : createFaqButtonProps) : ReactElement {
//
//     const faq : InsertFaq = { question : ' ', answer : ' ' }
//
//     const createClearFaq = async () => {
//         if (isLoggedIn && await isResponsible()) {
//             try {
//                 const createdFaq : Faq = await createFaq(faq)
//                 createFaqPropMethod(createdFaq)
//
//             }catch (e) {
//                 throw new Error("Не получилось создать")
//             }
//         }
//         else{
//             alert("Отказано в доступе")
//         }
//     }
//
//     return(
//         <div onClick={createClearFaq} className='btn'>
//             <h3>Создать faq</h3>
//         </div>
//     )
//
// }