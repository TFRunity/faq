import {createModule, Module} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types";
import {question_addAnswerController} from "@/src/i-adapters/controllers/Question_addAnswerController";
import {question_addController} from "@/src/i-adapters/controllers/Question_addController";
import {question_addRelWithCategoriesController} from "@/src/i-adapters/controllers/Question_addRelWithCategories";
import {question_addWithAnswerController} from "@/src/i-adapters/controllers/Question_addWithAnswerController";
import {question_changeAnswerToPreviousController} from "@/src/i-adapters/controllers/Question_changeAnswerToPreviousController";
import {question_deleteController} from "@/src/i-adapters/controllers/Question_deleteController";
import {question_deleteRelWithCategoriesController} from "@/src/i-adapters/controllers/Question_deleteRelWithCategories";
import {question_getAllWithoutCategoryController} from "@/src/i-adapters/controllers/Question_getAllWithoutCategory";
import {question_getWithHistoryOfAnswersController} from "@/src/i-adapters/controllers/Question_getWithHistoryOfAnswers";
import {question_updateQuestionController} from "@/src/i-adapters/controllers/Question_updateQuestion";

export function createQuestionModule() : Module {
    const questionModule = createModule();

    questionModule.bind(DI_SYMBOLS.ICategoryGetAllController)
        .toHigherOrderFunction(question_addAnswerController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.ICategoryAddEmptyController)
        .toHigherOrderFunction(question_addController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.ICategoryDeleteController)
        .toHigherOrderFunction(question_addRelWithCategoriesController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.ICategoryChangeTitleController)
        .toHigherOrderFunction(question_addWithAnswerController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.ICategoryGetAllController)
        .toHigherOrderFunction(question_changeAnswerToPreviousController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.ICategoryGetAllController)
        .toHigherOrderFunction(question_deleteController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.ICategoryGetAllController)
        .toHigherOrderFunction(question_deleteRelWithCategoriesController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.ICategoryGetAllController)
        .toHigherOrderFunction(question_getAllWithoutCategoryController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.ICategoryGetAllController)
        .toHigherOrderFunction(question_getWithHistoryOfAnswersController, [
            DI_SYMBOLS.IQuestionRepository
        ]);
    questionModule.bind(DI_SYMBOLS.ICategoryGetAllController)
        .toHigherOrderFunction(question_updateQuestionController, [
            DI_SYMBOLS.IQuestionRepository
        ]);

    return questionModule;
}