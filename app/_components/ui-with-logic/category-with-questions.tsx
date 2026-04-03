import {CategoryWithQuestionsWithAnswer, Question} from "@/app/_actions/faq-actions";
import {useContext} from "react";
import {CategoriesDispatchContext} from "@/app/providers";

export interface CategoryProps {
    category : CategoryWithQuestionsWithAnswer,
    permission : boolean,
}

export default function Category({category, permission} : CategoryProps) {

    const dispatch = useContext(CategoriesDispatchContext)



    return (
        <>
            <div>
                <h3>{category.category.title}</h3>
            </div>
            <div>
                {category.questions &&
                    category.questions.map(question => (

                    ))
                }
            </div>
        </>
    )

}