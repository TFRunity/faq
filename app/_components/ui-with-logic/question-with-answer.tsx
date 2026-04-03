import {QuestionWithAnswer} from "@/app/_actions/faq-actions";


export interface QuestionWithAnswerProps {
    questionWithAnswer: QuestionWithAnswer;
    permission : boolean;
}

export default function Question({questionWithAnswer, permission} : QuestionWithAnswerProps) {



    return (
        <div className='flex flex-col columns-10'>
            <div className='m-1'>
                <div className='rounded-lg bg-slate-100 flex justify-between'>
                    <h3 className=' text-slate-900 text-[120%] mt-3 ml-3 mb-2'>{question}</h3>
                    <div className=' text-slate-600 text-[130%] cursor-pointer mt-3 mr-3 mb-2' onClick={toggleAnswer}>

                        <h2>+</h2>
                    </div>
                </div>
                {showModal && createPortal(
                    <ModalUpdateFaq faq={faq} changeFaq={changeFaq} />,
                    document.body
                )}
            </div>
            <div className='text-slate-600 mt-3 ml-3 mb-2' style={{ display : toggle ? 'flex' : 'none' }}>
                <h3 className='text-slate-700 text-[120%] '>{answer}</h3>
            </div>
        </div>
    )
}