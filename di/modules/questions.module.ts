import {createModule, Module} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types";
import {question_addAnswerController} from "@/src/i-adapters/controllers/Question_addAnswerController";
import {question_addController} from "@/src/i-adapters/controllers/Question_addController";
import {question_addRelWithCategoriesController} from "@/src/i-adapters/controllers/Question_addRelWithCategoriesController";
import {question_addWithAnswerController} from "@/src/i-adapters/controllers/Question_addWithAnswerController";
import {question_changeAnswerToPreviousController} from "@/src/i-adapters/controllers/Question_changeAnswerToPreviousController";
import {question_deleteController} from "@/src/i-adapters/controllers/Question_deleteController";
import {question_deleteRelWithCategoriesController} from "@/src/i-adapters/controllers/Question_deleteRelWithCategoriesController";
import {question_Cached_getAllWithoutCategoryController} from "@/src/i-adapters/controllers/Question_Cached_getAllWithoutCategoryController";
import {question_getWithHistoryOfAnswersController} from "@/src/i-adapters/controllers/Question_getWithHistoryOfAnswersController";
import {question_updateQuestionController} from "@/src/i-adapters/controllers/Question_updateQuestionController";

export function createQuestionModule() : Module {
    const questionModule = createModule();

    questionModule.bind(DI_SYMBOLS.IQuestionAddAnswerController)
        .toHigherOrderFunction(question_addAnswerController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.IQuestionAddController)
        .toHigherOrderFunction(question_addController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.IQuestionAddRelWithCategoriesController)
        .toHigherOrderFunction(question_addRelWithCategoriesController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.IQuestionAddWithAnswerController)
        .toHigherOrderFunction(question_addWithAnswerController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.IQuestionChangeAnswerToPreviousController)
        .toHigherOrderFunction(question_changeAnswerToPreviousController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.IQuestionDeleteController)
        .toHigherOrderFunction(question_deleteController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.IQuestionDeleteRelWithCategoriesController)
        .toHigherOrderFunction(question_deleteRelWithCategoriesController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.IQuestionGetWithHistoryOfAnswersController)
        .toHigherOrderFunction(question_getWithHistoryOfAnswersController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.IQuestionUpdateQuestionController)
        .toHigherOrderFunction(question_updateQuestionController, [
            DI_SYMBOLS.IQuestionRepository
        ]);

    return questionModule;
}